import { generateService } from '@umijs/openapi';

// https://github.com/chenshuai2144/openapi2typescript
generateService({
  requestLibPath: "import { request } from 'helpers/request'",
  schemaPath: 'http://127.0.0.1:7001/swagger-doc',
  serversPath: '.',
  projectName: 'server',
  namespace: 'Server',
});
