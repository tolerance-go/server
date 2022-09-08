import { Executor } from '@@/plugin-executor';
import React from 'react';
{{#executors}}
import {{{id}}} from '{{{fileWithoutExt}}}';
{{/executors}}

export default React.memo(() => {
  return <Executor executors={[{{#executors}}{
    id: '{{{id}}}',
    hook: {{{id}}},
    namespace: '{{{namespace}}}',
  }, {{/executors}}]} />;
});
