export type StageData = {
  comsTree: {
    rootNodeIds: string[];
    stageComponentsModel: Record<string, object>;
  };
  comsModel: {
    settings: Record<string, object>;
  };
};
