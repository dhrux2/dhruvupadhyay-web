const { WebflowClient } = require('C:/Users/dhruv/AppData/Local/npm-cache/_npx/e593c9e34d50cf88/node_modules/webflow-api');
const fs = require('fs');
const crypto = require('crypto');
const FormData = require('C:/Users/dhruv/AppData/Local/npm-cache/_npx/e593c9e34d50cf88/node_modules/form-data');

async function uploadAsset(siteId, filePath, mimeType) {
  const client = new WebflowClient({ accessToken: 'f0b98c2b82e34168437f6dee05ae8f70e74bd2e29baa4b34d516dc81a020d47e' });
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');
  const fileName = require('path').basename(filePath);

  console.log(`Initiating asset upload for ${fileName}...`);
  const initRes = await client.assets.create(siteId, {
    fileName,
    fileHash: hash
  });

  const details = initRes.uploadDetails;
  const form = new FormData();
  
  // S3 exact field mapping
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
      console.log('S3 Upload Status:', res.statusCode);
      let body = '';
      res.on('data', d => body += d.toString());
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('S3 Upload Success!');
          resolve();
        } else {
          console.error('S3 Response Body:', body);
          reject(new Error(`S3 upload failed with ${res.statusCode}`));
        }
      });
    });
  });

  console.log('Hosted URL:', initRes.hostedUrl);
  return initRes;
}

uploadAsset('6ac02b3759e1cfde54af7250', 'c:/Dev/dhruvu-web/logo/logo.png', 'image/png')
  .then(res => console.log('Successfully uploaded asset ID:', res.id))
  .catch(err => console.error('Upload error:', err.message));
