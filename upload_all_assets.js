const { WebflowClient } = require('C:/Users/dhruv/AppData/Local/npm-cache/_npx/e593c9e34d50cf88/node_modules/webflow-api');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const FormData = require('C:/Users/dhruv/AppData/Local/npm-cache/_npx/e593c9e34d50cf88/node_modules/form-data');

async function uploadSingleAsset(client, siteId, filePath, mimeType) {
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');
  const fileName = path.basename(filePath);

  console.log(`Uploading ${fileName}...`);
  const initRes = await client.assets.create(siteId, {
    fileName,
    fileHash: hash
  });

  const details = initRes.uploadDetails;
  const form = new FormData();
  
  const fieldMapping = {
    key: details.key,
    acl: details.acl,
    policy: details.policy,
    'X-Amz-Algorithm': details.xAmzAlgorithm,
    'X-Amz-Credential': details.xAmzCredential,
    'X-Amz-Date': details.xAmzDate,
    'X-Amz-Signature': details.xAmzSignature,
    'success_action_status': details.successActionStatus || '201',
    'Content-Type': details.contentType || mimeType,
    'Cache-Control': details.cacheControl || 'max-age=31536000'
  };

  for (const [k, v] of Object.entries(fieldMapping)) {
    if (v) form.append(k, v);
  }
  form.append('file', fileBuffer, { filename: fileName, contentType: mimeType });

  await new Promise((resolve, reject) => {
    form.submit(initRes.uploadUrl, (err, res) => {
      if (err) return reject(err);
      res.on('data', () => {});
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve();
        } else {
          reject(new Error(`Failed with ${res.statusCode}`));
        }
      });
    });
  });

  console.log(`Uploaded ${fileName} -> ${initRes.hostedUrl}`);
  return { fileName, id: initRes.id, hostedUrl: initRes.hostedUrl };
}

async function run() {
  const siteId = '6ac02b3759e1cfde54af7250';
  const client = new WebflowClient({ accessToken: 'f0b98c2b82e34168437f6dee05ae8f70e74bd2e29baa4b34d516dc81a020d47e' });

  const files = [
    { path: 'c:/Dev/dhruvu-web/projects-screenshots/calumi/calumi-showcase-01-dashboard.jpeg', mime: 'image/jpeg' },
    { path: 'c:/Dev/dhruvu-web/projects-screenshots/vaultsmith/vaultsmith-showcase-01-forge-password-light.png', mime: 'image/png' },
    { path: 'c:/Dev/dhruvu-web/projects-screenshots/zerocode/zerocode-showcase-01-hero.png', mime: 'image/png' }
  ];

  const results = {};
  for (const f of files) {
    const res = await uploadSingleAsset(client, siteId, f.path, f.mime);
    results[f.path] = res;
  }
  fs.writeFileSync('c:/Dev/dhruvu-web/uploaded_assets_manifest.json', JSON.stringify(results, null, 2));
  console.log('Manifest written successfully!');
}

run().catch(console.error);
