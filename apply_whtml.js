const { spawn } = require('child_process');
const fs = require('fs');

let htmlContent = fs.readFileSync('c:/Dev/dhruvu-web/components/portfolio-markup.html', 'utf8');
const wrappedHtml = `<div class="portfolio-page-root">\n${htmlContent}\n</div>`;

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
        console.log('Sending data_whtml_builder call with wrapped root element...');
        const callMsg = {
          jsonrpc: '2.0',
          id: 2,
          method: 'tools/call',
          params: {
            name: 'data_whtml_builder',
            arguments: {
              siteId: '6ac02b3759e1cfde54af7250',
              pageId: '6ac02b3959e1cfde54af7279',
              session_id: 'ses_3KB3iO8tWKiXBD5yvq2d1xcYM3p',
              agent_id: 'gemini-3.8-flash|antigravity|du1001',
              context: 'Inserting portfolio page elements with bespoke Harmond Serif & Nohemi typography and custom branding.',
              actions: [
                {
                  build_label: 'build_full_portfolio',
                  parent_element_id: {
                    component: '6ac02b3959e1cfde54af7279',
                    element: '6ac02b3959e1cfde54af7281'
                  },
                  creation_position: 'append',
                  html: wrappedHtml
                }
              ]
            }
          }
        };
        proc.stdin.write(JSON.stringify(callMsg) + '\n');
      }
      if (json.id === 2) {
        console.log('Result from data_whtml_builder:');
        console.log(JSON.stringify(json.result, null, 2));
        proc.kill();
        process.exit(0);
      }
    } catch(e) {}
  }
});

proc.stderr.on('data', d => {
  const str = d.toString();
  if (str.includes('Error') || str.includes('error')) {
    console.error('STDERR:', str);
  }
});

proc.stdin.write(JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'antigravity', version: '1.0.0' }
  }
}) + '\n');

setTimeout(() => {
  console.error('Timeout after 60s');
  proc.kill();
  process.exit(1);
}, 60000);
