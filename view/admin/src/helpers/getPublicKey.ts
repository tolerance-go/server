import NodeRSA from 'node-rsa';

export const getPublicKey = () => {
  const key = new NodeRSA({
    b: 512,
  });

  key.setOptions({
    environment: 'browser',
  });

  key.importKey(`-----BEGIN PUBLIC KEY-----
  MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOOdM78vitjwV4KzgxyNb4JaRLiNJ+XQ
  3TZ9GH0jwPwcJAyY/6pSu/xaCpcZgwC52OitHRH8tPSsjT9ClAhlhhMCAwEAAQ==
  -----END PUBLIC KEY-----
  `);
  return key;
};
