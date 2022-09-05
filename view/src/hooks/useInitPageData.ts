import { useMemoizedFn } from 'ahooks';
import { useModel } from '@/.umi/plugin-model';
import { pickModel } from '@/utils/pickModel';
import { parseJSON } from '@/utils/parseJSON';

export default () => {
  const { initData: initNodesStructuresAndRootIds } = useModel(
    'Design.page.nodesStructuresAndRootIds',
    pickModel(['initData']),
  );

  const { initData: initNodesSettings } = useModel(
    'Design.page.nodesSettings',
    pickModel(['initData']),
  );

  const { initData: initNodesDefaultsStatus } = useModel(
    'Design.page.nodesDefaultsStatus',
    pickModel(['initData']),
  );

  const { initData: initNodesStyles } = useModel(
    'Design.page.nodesStyles',
    pickModel(['initData']),
  );

  const { initData: initNodesEvents } = useModel(
    'Design.page.nodesEvents',
    pickModel(['initData']),
  );

  const { initData: initNodesActions } = useModel(
    'Design.page.nodesActions',
    pickModel(['initData']),
  );

  const { initData: initNodesStatus } = useModel(
    'Design.page.nodesStatus',
    pickModel(['initData']),
  );

  const { initNodesStatusRelations } = useModel(
    'Design.page.nodesStatusRelations',
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
