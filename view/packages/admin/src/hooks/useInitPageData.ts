import { useMemoizedFn } from 'ahooks';
import { useModel } from '@/.umi/plugin-model';
import { pickModel } from '@/utils/pickModel';
import { parseJSON } from '@/utils/parseJSON';

export default () => {
  const { initData: initNodesStructuresAndRootIds } = useModel(
    'design.page.nodesStructuresAndRootIds',
    pickModel(['initData']),
  );

  const { initData: initNodesSettings } = useModel(
    'design.page.nodesSettings',
    pickModel(['initData']),
  );

  const { initData: initNodesDefaultsStatus } = useModel(
    'design.page.nodesDefaultsStatus',
    pickModel(['initData']),
  );

  const { initData: initNodesStyles } = useModel(
    'design.page.nodesStyles',
    pickModel(['initData']),
  );

  const { initData: initNodesEvents } = useModel(
    'design.page.nodesEvents',
    pickModel(['initData']),
  );

  const { initData: initNodesActions } = useModel(
    'design.page.nodesActions',
    pickModel(['initData']),
  );

  const { initData: initNodesStatus } = useModel(
    'design.page.nodesStatus',
    pickModel(['initData']),
  );

  const { initNodesStatusRelations } = useModel(
    'design.page.nodesStatusRelations',
    (model) => ({ initNodesStatusRelations: model.initData }),
  );

  const initPageData = useMemoizedFn((data: API.Page) => {
    initNodesStructuresAndRootIds({
      rootNodeIds: parseJSON(data.rootNodeIds),
      nodesStructures: parseJSON(data.nodesStructures),
    });

    initNodesSettings({
      nodesSettings: parseJSON(data.nodesSettings),
    });

    initNodesDefaultsStatus({
      nodesDefaultsStatus: parseJSON(data.nodesDefaultsStatus),
    });

    initNodesStyles({
      nodesStyles: parseJSON(data.nodesStyles),
    });

    initNodesEvents({
      nodesEvents: parseJSON(data.nodesEvents),
    });

    initNodesActions({
      nodesActions: parseJSON(data.nodesActions),
    });

    initNodesStatus({
      nodesStatus: parseJSON(data.nodesStatus),
    });

    initNodesStatusRelations({
      nodesStatusRelations: parseJSON(data.nodesStatusRelations),
    });
  });

  return initPageData;
};
