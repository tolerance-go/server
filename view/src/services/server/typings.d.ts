declare namespace API {
  type App = {
    id: string;
    title: string;
    desc?: string;
    appData?: string;
    historyData?: string;
    stageSizeData?: string;
    labels?: string[];
  };

  type AppControllerDestroyParams = {
    /** id  */
    id: string;
  };

  type AppControllerIndexIncludeUserParams = {
    /** limit  */
    limit?: number;
    /** offset  */
    offset?: number;
    /** title  */
    title?: string;
    /** labels  */
    labels?: string;
  };

  type AppControllerIndexParams = {
    /** limit  */
    limit?: number;
    /** offset  */
    offset?: number;
    /** title  */
    title?: string;
    /** labels  */
    labels?: string;
  };

  type AppControllerShowParams = {
    /** id  */
    id: string;
  };

  type AppControllerUpdateHistoryParams = {
    /** id  */
    id: string;
  };

  type AppControllerUpdateParams = {
    /** id  */
    id: string;
  };

  type AppControllerUpdateStageSizeParams = {
    /** id  */
    id: string;
  };

  type AppIncludeUserListResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: ShownAppIncludeUser[];
  };

  type AppListResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: ShownApp[];
  };

  type AppShowResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: ShownApp;
  };

  type BaseResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
  };

  type BaseRsp = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
  };

  type ComIheritRelation = {
    id: string;
    appId: string;
    componentId: string;
    fromId: string;
    toId: string;
  };

  type ComIheritRelationControllerDestroyParams = {
    /** id  */
    id: number;
  };

  type ComIheritRelationControllerIndexParams = {
    appId?: number;
    limit?: number;
    offset?: number;
  };

  type ComIheritRelationControllerShowParams = {
    /** id  */
    id: string;
  };

  type ComIheritRelationControllerUpdateParams = {
    /** id  */
    id: number;
  };

  type ComIheritRelationListResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: ShownComIheritRelation[];
  };

  type ComIheritRelationShowResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: ShownComIheritRelation;
  };

  type Comment = {
    id: string;
    content?: string;
    replyTo?: string;
    likeNum?: number;
    dislikeNum?: number;
    discussId: string;
  };

  type CommentControllerDestroyParams = {
    /** id  */
    id: number;
  };

  type CommentControllerIndexParams = {
    /** discussId  */
    discussId?: number;
    /** limit  */
    limit?: number;
    /** offset  */
    offset?: number;
  };

  type CommentControllerShowParams = {
    /** id  */
    id: string;
  };

  type CommentControllerUpdateParams = {
    /** id  */
    id: number;
  };

  type CommentListResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: ShownComment[];
  };

  type CommentShowResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: ShownComment;
  };

  type Component = {
    id: string;
    name: string;
    desc?: string;
    app_id: string;
    stage_data?: string;
    comIheritRelationId?: number;
    usedInPageIds?: number[];
  };

  type ComponentControllerDestroyParams = {
    /** id  */
    id: string;
  };

  type ComponentControllerIndexParams = {
    /** appId  */
    appId?: number;
    /** limit  */
    limit?: number;
    /** offset  */
    offset?: number;
  };

  type ComponentControllerShowParams = {
    /** id  */
    id: string;
  };

  type ComponentControllerUpdateParams = {
    /** id  */
    id: string;
  };

  type ComponentListResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: ShownComponent[];
  };

  type ComponentShowResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: ShownComponent;
  };

  type Conditions = {
    like?: string;
    notLike?: string;
    or?: Wheres[];
    and?: Wheres[];
    ne?: string;
    neNum?: number;
    is?: string;
    isNum?: number;
    eq?: string;
    eqNum?: number;
    not?: string;
    notNum?: number;
    in?: string;
    inNum?: number;
    notIn?: string;
    notInNum?: number;
    gt?: number;
    gte?: number;
    lt?: number;
    lte?: number;
    between?: number[];
    notBetween?: number[];
  };

  type Counter = {
    id: string;
    count: number;
  };

  type CounterResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: Counter[];
  };

  type CountReqData = {
    wheres?: Wheres;
    includes?: Include[];
  };

  type CountResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: number;
  };

  type CreationApp = {
    title: string;
    desc?: string;
    appData?: string;
    historyData?: string;
    stageSizeData?: string;
    labels?: string[];
  };

  type CreationComIheritRelation = {
    appId: string;
    componentId: string;
    fromId: string;
    toId: string;
  };

  type CreationComment = {
    content?: string;
    replyTo?: string;
    likeNum?: number;
    dislikeNum?: number;
    discussId: string;
  };

  type CreationComponent = {
    name: string;
    desc?: string;
    app_id: string;
    stage_data?: string;
    comIheritRelationId?: number;
    usedInPageIds?: number[];
  };

  type CreationDatabase = {
    name: string;
    desc?: string;
    data?: string;
    app_id: string;
    logic_created_at?: string;
    logic_updated_at?: string;
  };

  type CreationDiscuss = {
    title?: string;
    desc?: string;
    belongsToComStatId: string;
    belongsToComId: string;
    left: number;
    top: number;
    containerWidth: number;
    containerHeight: number;
    containerLeft: number;
    containerTop: number;
    pageId: string;
    resolved?: boolean;
  };

  type CreationReview = {
    content: string;
    rateNum: string;
    userId?: string;
    reviewId?: string;
    widgetId?: string;
    widgetGroupId?: string;
    widgetLibId?: string;
  };

  type CreationUser = {
    nickname?: string;
    password: string;
    username: string;
    email?: string;
    avatar?: string;
  };

  type CreationVersion = {
    name: string;
    app_id: string;
    pageIds?: string[];
  };

  type CreationWithRelationComponent = {
    fromComId: string;
    appId: string;
    name: string;
    desc?: string;
  };

  type CreationWithRelationComponentResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: CreationWithRelationComponentResponseData;
  };

  type CreationWithRelationComponentResponseData = {
    component: ShownComponent;
    comIheritRelation: ShownComIheritRelation;
  };

  type Database = {
    id: string;
    name: string;
    desc?: string;
    data?: string;
    app_id: string;
    logic_created_at?: string;
    logic_updated_at?: string;
  };

  type DatabaseControllerDestroyParams = {
    /** id  */
    id: string;
  };

  type DatabaseControllerIndexParams = {
    /** appId  */
    appId?: number;
    /** limit  */
    limit?: number;
    /** offset  */
    offset?: number;
  };

  type DatabaseControllerShowParams = {
    /** id  */
    id: string;
  };

  type DatabaseControllerUpdateParams = {
    /** id  */
    id: string;
  };

  type DatabaseListResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: ShownDatabase[];
  };

  type DatabaseShowResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: ShownDatabase;
  };

  type Discuss = {
    id: string;
    title?: string;
    desc?: string;
    belongsToComStatId: string;
    belongsToComId: string;
    left: number;
    top: number;
    containerWidth: number;
    containerHeight: number;
    containerLeft: number;
    containerTop: number;
    pageId: string;
    resolved?: boolean;
  };

  type DiscussControllerCountCommentsParams = {
    /** pageId  */
    pageId?: number;
  };

  type DiscussControllerDestroyParams = {
    /** id  */
    id: number;
  };

  type DiscussControllerIndexParams = {
    /** pageId  */
    pageId?: number;
    /** limit  */
    limit?: number;
    /** offset  */
    offset?: number;
  };

  type DiscussControllerShowParams = {
    /** id  */
    id: string;
  };

  type DiscussControllerUpdateParams = {
    /** id  */
    id: number;
  };

  type DiscussListResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: ShownDiscuss[];
  };

  type DiscussShowResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: ShownDiscuss;
  };

  type Identities = {
    id: string[];
  };

  type Identity = {
    id: string;
  };

  type Include = {
    model:
      | 'App'
      | 'AppUser'
      | 'Authorization'
      | 'ComIheritRelation'
      | 'Comment'
      | 'Component'
      | 'Database'
      | 'Discuss'
      | 'License'
      | 'Page'
      | 'User'
      | 'Version'
      | 'Widget'
      | 'WidgetGroup'
      | 'WidgetLib';
    include?: Include[];
    wheres?: Wheres;
  };

  type Includes = {
    include?: Include[];
  };

  type License = {
    createdAt: string;
    updatedAt: string;
    id: string;
    userId: string;
    expiration?: string;
    widgetId?: string;
    widgetLibId?: string;
    widgetGroupId?: string;
  };

  type LicenseControllerDestroyParams = {
    /** id  */
    id: string;
  };

  type LicenseControllerIndexParams = {
    /** limit  */
    limit?: number;
    /** offset  */
    offset?: number;
  };

  type LicenseControllerShowParams = {
    /** id  */
    id: string;
  };

  type LicenseControllerUpdateParams = {
    /** id  */
    id: string;
  };

  type LicenseCreateReqData = {
    expiration?: string;
    widgetId?: string;
    widgetLibId?: string;
    widgetGroupId?: string;
  };

  type LicenseListAndCountRsp = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: LicenseListAndCountRspData;
  };

  type LicenseListAndCountRspData = {
    count: number;
    rows: License[];
  };

  type LicenseListRsp = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: License[];
  };

  type LicenseRsp = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: License;
  };

  type LicenseUpdateReqData = {
    createdAt?: string;
    updatedAt?: string;
    userId?: string;
    expiration?: string;
    widgetId?: string;
    widgetLibId?: string;
    widgetGroupId?: string;
  };

  type LoginAuth = {
    password: string;
    username: string;
  };

  type OrderItem = {
    fieldName: string;
    orderType: 'ASC' | 'DESC';
  };

  type Page = {
    path: string;
    appId: string;
    versionId?: string;
    stage_data?: string;
    nodesStructures?: string;
    nodesStyles?: string;
    nodesSettings?: string;
    nodesEvents?: string;
    nodesActions?: string;
    nodesStatus?: string;
    nodesStatusRelations?: string;
    nodesDefaultsStatus?: string;
    stageRootNodeIds?: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  };

  type PageControllerDestroyParams = {
    /** id  */
    id: string;
  };

  type PageControllerIndexParams = {
    limit?: number;
    offset?: number;
  };

  type PageControllerShowParams = {
    /** id  */
    id: string;
  };

  type PageControllerUpdateParams = {
    /** id  */
    id: string;
  };

  type PageCreateReqData = {
    path: string;
    appId: string;
    versionId?: string;
    stage_data?: string;
    nodesStructures?: string;
    nodesStyles?: string;
    nodesSettings?: string;
    nodesEvents?: string;
    nodesActions?: string;
    nodesStatus?: string;
    nodesStatusRelations?: string;
    nodesDefaultsStatus?: string;
    stageRootNodeIds?: string;
  };

  type PageListAndCountRsp = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: PageListAndCountRspData;
  };

  type PageListAndCountRspData = {
    count: number;
    rows: Page[];
  };

  type PageListRsp = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: Page[];
  };

  type PageRsp = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: Page;
  };

  type PageUpdateReqData = {
    path?: string;
    appId?: string;
    versionId?: string;
    stage_data?: string;
    nodesStructures?: string;
    nodesStyles?: string;
    nodesSettings?: string;
    nodesEvents?: string;
    nodesActions?: string;
    nodesStatus?: string;
    nodesStatusRelations?: string;
    nodesDefaultsStatus?: string;
    stageRootNodeIds?: string;
    createdAt?: string;
    updatedAt?: string;
  };

  type PlainObject = {};

  type ResultResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: boolean;
  };

  type Review = {
    id: string;
    content: string;
    rateNum: string;
    userId?: string;
    reviewId?: string;
    widgetId?: string;
    widgetGroupId?: string;
    widgetLibId?: string;
  };

  type ReviewControllerDestroyParams = {
    /** id  */
    id: string;
  };

  type ReviewControllerIndexParams = {
    /** limit  */
    limit?: number;
    /** offset  */
    offset?: number;
  };

  type ReviewControllerShowParams = {
    /** id  */
    id: string;
  };

  type ReviewControllerUpdateParams = {
    /** id  */
    id: string;
  };

  type ReviewListAndCountData = {
    count: number;
    rows: ShownReview[];
  };

  type ReviewListAndCountResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: ReviewListAndCountData;
  };

  type ReviewListResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: ShownReview[];
  };

  type ReviewShowResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: ShownReview;
  };

  type SearchReqData = {
    order?: OrderItem[];
    limit?: number;
    offset?: number;
    wheres?: Wheres;
    includes?: Include[];
  };

  type ShareAppRequest = {
    userIds: string[];
    appId: string;
  };

  type ShownApp = {
    userId: string;
    createdAt: string;
    updatedAt: string;
    id: string;
    title: string;
    desc?: string;
    appData?: string;
    historyData?: string;
    stageSizeData?: string;
    labels?: string[];
  };

  type ShownAppIncludeUser = {
    userId: string;
    createdAt: string;
    updatedAt: string;
    id: string;
    title: string;
    desc?: string;
    appData?: string;
    historyData?: string;
    stageSizeData?: string;
    labels?: string[];
    users: ShownUser[];
  };

  type ShownComIheritRelation = {
    createdAt: string;
    updatedAt: string;
    id: string;
    appId: string;
    componentId: string;
    fromId: string;
    toId: string;
  };

  type ShownComment = {
    id: string;
    createdAt: string;
    updatedAt: string;
    content?: string;
    replyTo?: string;
    likeNum?: number;
    dislikeNum?: number;
    discussId: string;
  };

  type ShownComponent = {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    desc?: string;
    app_id: string;
    stage_data?: string;
    comIheritRelationId?: number;
    usedInPageIds?: number[];
  };

  type ShownDatabase = {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    desc?: string;
    data?: string;
    app_id: string;
    logic_created_at?: string;
    logic_updated_at?: string;
  };

  type ShownDiscuss = {
    id: string;
    createdAt: string;
    updatedAt: string;
    title?: string;
    desc?: string;
    belongsToComStatId: string;
    belongsToComId: string;
    left: number;
    top: number;
    containerWidth: number;
    containerHeight: number;
    containerLeft: number;
    containerTop: number;
    pageId: string;
    resolved?: boolean;
  };

  type ShownReview = {
    createdAt: string;
    updatedAt: string;
    id: string;
    content: string;
    rateNum: string;
    userId?: string;
    reviewId?: string;
    widgetId?: string;
    widgetGroupId?: string;
    widgetLibId?: string;
  };

  type ShownUser = {
    createdAt: string;
    updatedAt: string;
    id: string;
    nickname?: string;
    password: string;
    username: string;
    email?: string;
    avatar?: string;
  };

  type StringArrayResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: string[];
  };

  type UpdationApp = {
    title?: string;
    desc?: string;
    appData?: string;
    historyData?: string;
    stageSizeData?: string;
    labels?: string[];
  };

  type UpdationComIheritRelation = {
    appId?: string;
    componentId?: string;
    fromId?: string;
    toId?: string;
  };

  type UpdationComment = {
    content?: string;
    replyTo?: string;
    likeNum?: number;
    dislikeNum?: number;
    discussId?: string;
  };

  type UpdationDiscuss = {
    title?: string;
    desc?: string;
    belongsToComStatId?: string;
    belongsToComId?: string;
    left?: number;
    top?: number;
    containerWidth?: number;
    containerHeight?: number;
    containerLeft?: number;
    containerTop?: number;
    pageId?: string;
    resolved?: boolean;
  };

  type UpdationReview = {
    content?: string;
    rateNum?: string;
    userId?: string;
    reviewId?: string;
    widgetId?: string;
    widgetGroupId?: string;
    widgetLibId?: string;
  };

  type UpdationUser = {
    nickname?: string;
    password?: string;
    username?: string;
    email?: string;
    avatar?: string;
  };

  type User = {
    id: string;
    nickname?: string;
    password: string;
    username: string;
    email?: string;
    avatar?: string;
  };

  type UserControllerDestroyParams = {
    /** id  */
    id: string;
  };

  type UserControllerIndexParams = {
    /** limit  */
    limit?: number;
    /** offset  */
    offset?: number;
    /** title  */
    title?: string;
    /** labels  */
    labels?: string;
  };

  type UserControllerShowParams = {
    /** id  */
    id: string;
  };

  type UserControllerUpdateParams = {
    /** id  */
    id: string;
  };

  type UserListResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: ShownUser[];
  };

  type UserShowResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: ShownUser;
  };

  type Version = {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    app_id: string;
  };

  type VersionControllerDestroyParams = {
    /** id  */
    id: string;
  };

  type VersionControllerIndexParams = {
    /** appId  */
    appId?: number;
    /** limit  */
    limit?: number;
    /** offset  */
    offset?: number;
  };

  type VersionControllerShowParams = {
    /** id  */
    id: string;
  };

  type VersionControllerUpdateParams = {
    /** id  */
    id: string;
  };

  type VersionListResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: Version[];
  };

  type VersionShowResponse = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: Version;
  };

  type WhereItem = {
    fieldName: string;
    conditions?: Conditions;
  };

  type Wheres = {
    where: WhereItem[];
    or?: Wheres[];
    and?: Wheres[];
  };

  type Widget = {
    name: string;
    display: 'block' | 'inline-block';
    elementType: string;
    type: string;
    desc?: string;
    detail?: string;
    labels?: string[];
    id: string;
    createdAt: string;
    updatedAt: string;
  };

  type WidgetControllerDestroyParams = {
    /** id  */
    id: string;
  };

  type WidgetControllerIndexParams = {
    /** limit  */
    limit?: number;
    /** offset  */
    offset?: number;
  };

  type WidgetControllerShowParams = {
    /** id  */
    id: string;
  };

  type WidgetControllerUpdateParams = {
    /** id  */
    id: string;
  };

  type WidgetCreateReqData = {
    name: string;
    display: 'block' | 'inline-block';
    elementType: string;
    type: string;
    desc?: string;
    detail?: string;
    labels?: string[];
  };

  type WidgetGroup = {
    name: string;
    widgetLibId?: string;
    type: string;
    desc?: string;
    labels?: string[];
    id: string;
    createdAt: string;
    updatedAt: string;
  };

  type WidgetGroupControllerDestroyParams = {
    /** id  */
    id: string;
  };

  type WidgetGroupControllerIndexParams = {
    /** limit  */
    limit?: number;
    /** offset  */
    offset?: number;
  };

  type WidgetGroupControllerShowParams = {
    /** id  */
    id: string;
  };

  type WidgetGroupControllerUpdateParams = {
    /** id  */
    id: string;
  };

  type WidgetGroupCreateReqData = {
    name: string;
    widgetLibId?: string;
    type: string;
    desc?: string;
    labels?: string[];
  };

  type WidgetGroupListAndCountRsp = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: WidgetGroupListAndCountRspData;
  };

  type WidgetGroupListAndCountRspData = {
    count: number;
    rows: WidgetGroup[];
  };

  type WidgetGroupListRsp = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: WidgetGroup[];
  };

  type WidgetGroupRsp = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: WidgetGroup;
  };

  type WidgetGroupUpdateReqData = {
    name?: string;
    widgetLibId?: string;
    type?: string;
    desc?: string;
    labels?: string[];
    createdAt?: string;
    updatedAt?: string;
  };

  type WidgetLib = {
    name: string;
    widgetLibId?: string;
    userId?: string;
    type: string;
    desc?: string;
    labels?: string[];
    id: string;
    createdAt: string;
    updatedAt: string;
  };

  type WidgetLibControllerDestroyParams = {
    /** id  */
    id: string;
  };

  type WidgetLibControllerIndexParams = {
    /** limit  */
    limit?: number;
    /** offset  */
    offset?: number;
  };

  type WidgetLibControllerShowParams = {
    /** id  */
    id: string;
  };

  type WidgetLibControllerUpdateParams = {
    /** id  */
    id: string;
  };

  type WidgetLibCreateReqData = {
    name: string;
    widgetLibId?: string;
    type: string;
    desc?: string;
    labels?: string[];
  };

  type WidgetLibListAndCountRsp = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: WidgetLibListAndCountRspData;
  };

  type WidgetLibListAndCountRspData = {
    count: number;
    rows: WidgetLib[];
  };

  type WidgetLibListRsp = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: WidgetLib[];
  };

  type WidgetLibRsp = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: WidgetLib;
  };

  type WidgetLibUpdateReqData = {
    name?: string;
    widgetLibId?: string;
    userId?: string;
    type?: string;
    desc?: string;
    labels?: string[];
    createdAt?: string;
    updatedAt?: string;
  };

  type WidgetListAndCountRsp = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: WidgetListAndCountRspData;
  };

  type WidgetListAndCountRspData = {
    count: number;
    rows: Widget[];
  };

  type WidgetListRsp = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: Widget[];
  };

  type WidgetRsp = {
    success: boolean;
    errorCode?: number;
    errorMessage?: string;
    showType?: number;
    data: Widget;
  };

  type WidgetUpdateReqData = {
    name?: string;
    display?: 'block' | 'inline-block';
    elementType?: string;
    type?: string;
    desc?: string;
    detail?: string;
    labels?: string[];
    createdAt?: string;
    updatedAt?: string;
  };
}
