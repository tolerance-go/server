import NodeRSA from 'node-rsa';

export const getPrivateKey = () => {
  const key = new NodeRSA({
    b: 512,
  });

  key.setOptions({
    environment: 'node',
  });

  key.importKey(`-----BEGIN PRIVATE KEY-----
      MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEA450zvy+K2PBXgrOD
      HI1vglpEuI0n5dDdNn0YfSPA/BwkDJj/qlK7/FoKlxmDALnY6K0dEfy09KyNP0KU
      CGWGEwIDAQABAkAoJENKBnJwTALC9DG9SVxPGuhfu9U7fJhm0a0N9M5GJ8MVzITW
      9ZSJSXAPSdNYBDXulsk9Lvmk2lnOES8HD3cxAiEA/xeXp62Z5UaXKvgoRnChu2X9
      lhEtBXotPxCGGfhiA28CIQDkbJM/i8valswaH3RNIkndCembNDFM9n0IF+aUjCvF
      nQIhALZVKrVTxPi46DxyfHc88p18XTHyvPd5SPYW3YOaopRJAiBSuuA5y6/xY1xY
      ubutlBWccNKi26xfa4atP7rLYlkYIQIgZzScnbU9/N6PYUaTHapxIvy2D+Hvyqnb
      TpLCvBN/Kzc=
      -----END PRIVATE KEY-----
      `);
  return key;
};
