const { spawn } = require('child_process');
const fs = require('fs');
const crypto = require('crypto');
const FormData = require('C:/Users/dhruv/AppData/Local/npm-cache/_npx/e593c9e34d50cf88/node_modules/form-data');

async function callMcp(toolName, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn('cmd.exe', ['/c', 'npx', '-y', 'mcp-remote', 'https://mcp.webflow.com/mcp'], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let buffer = '';
    proc.stdout.on('data', data => {
      buffer += data.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop();
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const json = JSON.parse(line.trim());
          if (json.id === 1) {
            proc.stdin.write(JSON.stringify({
              jsonrpc: '2.0',
              id: 2,
              method: 'tools/call',
              params: { name: toolName, arguments: args }
            }) + '\n');
          }
          if (json.id === 2) {
            proc.kill();
            resolve(json.result);
          }
        } catch(e) {}
      }
    });

    proc.stderr.on('data', () => {});
    proc.stdin.write(JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'antigravity', version: '1.0.0' } }
    }) + '\n');

    setTimeout(() => { proc.kill(); reject(new Error('Timeout')); }, 45000);
  });
}

async function uploadFontFile(uploadInfo, fileBuffer, fileName, mimeType) {
  const form = new FormData();
  for (const [k, v] of Object.entries(uploadInfo.fields)) {
    form.append(k, v);
  }
  form.append('file', fileBuffer, { filename: fileName, contentType: mimeType });

  return new Promise((resolve, reject) => {
    form.submit(uploadInfo.url, (err, res) => {
      if (err) return reject(err);
      res.on('data', () => {});
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`Uploaded font bytes for ${fileName} (HTTP ${res.statusCode})`);
          resolve();
        } else {
          reject(new Error(`Font S3 upload failed with ${res.statusCode}`));
        }
      });
    });
  });
}

async function registerAndUploadFont(fontDef) {
  const fileBuffer = fs.readFileSync(fontDef.path);
  const fileHash = crypto.createHash('md5').update(fileBuffer).digest('hex');
  const fileName = require('path').basename(fontDef.path);

  console.log(`Registering font ${fontDef.family} ${fontDef.weight} (${fileName})...`);
  const res = await callMcp('data_fonts_tool', {
    session_id: 'ses_3KB3iO8tWKiXBD5yvq2d1xcYM3p',
    agent_id: 'gemini-3.8-flash|antigravity|du1001',
    context: `Registering ${fontDef.family} font for site typography.`,
    actions: [
      {
        label: `reg_${fontDef.family}_${fontDef.weight}`,
        create_font: {
          site_id: '6ac02b3759e1cfde54af7250',
          font_family: fontDef.family,
          weight: fontDef.weight,
          italic: fontDef.italic,
          font_display: 'swap',
          file_name: fileName,
          file_hash: fileHash
        }
      }
    ]
  });

  const parsed = JSON.parse(res.content[0].text);
  if (parsed.result && parsed.result.upload) {
    await uploadFontFile(parsed.result.upload, fileBuffer, fileName, fontDef.mime);
    console.log(`Successfully registered and uploaded ${fontDef.family} ${fontDef.weight}!`);
    return parsed.result.customFont;
  } else {
    console.error('Registration failed:', parsed);
  }
}

async function main() {
  const fontsToUpload = [
    {
      family: 'Harmond',
      weight: 800,
      italic: true,
      path: 'c:/Dev/dhruvu-web/fonts/harmond-serif-font-family/harmond-extbditaexp.otf',
      mime: 'font/otf'
    },
    {
      family: 'Harmond',
      weight: 800,
      italic: false,
      path: 'c:/Dev/dhruvu-web/fonts/harmond-serif-font-family/harmond-extraboldexpanded.otf',
      mime: 'font/otf'
    },
    {
      family: 'Nohemi',
      weight: 400,
      italic: false,
      path: 'c:/Dev/dhruvu-web/fonts/Nohemi/Web-TT/Nohemi-Regular.woff2',
      mime: 'font/woff2'
    },
    {
      family: 'Nohemi',
      weight: 600,
      italic: false,
      path: 'c:/Dev/dhruvu-web/fonts/Nohemi/Web-TT/Nohemi-SemiBold.woff2',
      mime: 'font/woff2'
    },
    {
      family: 'Nohemi',
      weight: 700,
      italic: false,
      path: 'c:/Dev/dhruvu-web/fonts/Nohemi/Web-TT/Nohemi-Bold.woff2',
      mime: 'font/woff2'
    }
  ];

  for (const f of fontsToUpload) {
    try {
      await registerAndUploadFont(f);
    } catch(e) {
      console.error(`Error uploading font ${f.family}:`, e.message);
    }
  }
  console.log('All custom fonts registered and uploaded into Webflow!');
}

main().catch(console.error);
