import { Controller } from 'egg';
// import utl from 'lodash';

/**
 * @controller PageController
 */
export default class AdminController extends Controller {
  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/admin/gen-widgets 路径
   * @response 200 ResultResponse
   */
  async index() {
    const ctx = this.ctx;

    await ctx.model.WidgetLib.bulkCreate(
      [
        {
          name: '基础',
          type: 'antd',
          widgetGroups: [
            {
              name: '通用',
              type: 'general',
              widgets: [
                {
                  type: 'button',
                  elementType: 'Button',
                  name: '按钮',
                },
                {
                  type: 'icon',
                  elementType: 'Icon',
                  name: '图标',
                },
                {
                  type: 'typography',
                  elementType: 'Typography',
                  name: '排版',
                },
              ],
            },
            {
              name: '布局',
              type: 'layout',
              widgets: [
                { type: 'divider', elementType: 'Divider', name: '分割线' },
                { type: 'grid', elementType: 'Grid', name: '栅格' },
                { type: 'layout', elementType: 'Layout', name: '布局' },
                { type: 'space', elementType: 'Space', name: '间距' },
              ],
            },
            {
              name: '导航',
              type: 'navigation',
              widgets: [
                { type: 'affix', elementType: 'Affix', name: '固钉' },
                {
                  type: 'breadcrumb',
                  elementType: 'Breadcrumb',
                  name: '面包屑',
                },
                { type: 'dropdown', elementType: 'Dropdown', name: '下拉菜单' },
                { type: 'menu', elementType: 'Menu', name: '导航菜单' },
                { type: 'pageHeader', elementType: 'PageHeader', name: '页头' },
                { type: 'pagination', elementType: 'Pagination', name: '分页' },
                { type: 'steps', elementType: 'Steps', name: '步骤条' },
              ],
            },
            {
              name: '数据录入',
              type: 'dataEntry',
              widgets: [
                {
                  type: 'autoComplete',
                  elementType: 'AutoComplete',
                  name: '自动完成',
                },
                { type: 'cascader', elementType: 'Cascader', name: '级联选择' },
                { type: 'checkbox', elementType: 'Checkbox', name: '多选框' },
                {
                  type: 'datePicker',
                  elementType: 'DatePicker',
                  name: '日期选择框',
                },
                { type: 'form', elementType: 'Form', name: '表单' },
                { type: 'input', elementType: 'Input', name: '输入框' },
                {
                  type: 'inputNumber',
                  elementType: 'InputNumber',
                  name: '数字输入框',
                },
                { type: 'mentions', elementType: 'Mentions', name: '提及' },
                { type: 'radio', elementType: 'Radio', name: '单选框' },
                { type: 'rate', elementType: 'Rate', name: '评分' },
                { type: 'select', elementType: 'Select', name: '选择器' },
                { type: 'slider', elementType: 'Slider', name: '滑动输入条' },
                { type: 'switch', elementType: 'Switch', name: '开关' },
                {
                  type: 'timePicker',
                  elementType: 'TimePicker',
                  name: '时间选择框',
                },
                { type: 'transfer', elementType: 'Transfer', name: '穿梭框' },
                {
                  type: 'treeSelect',
                  elementType: 'TreeSelect',
                  name: '树选择',
                },
                { type: 'upload', elementType: 'Upload', name: '上传' },
              ],
            },
            {
              name: '数据展示',
              type: 'dataDisplay',
              widgets: [
                { type: 'avatar', elementType: 'Avatar', name: '头像' },
                { type: 'badge', elementType: 'Badge', name: '徽标数' },
                { type: 'calendar', elementType: 'Calendar', name: '日历' },
                { type: 'card', elementType: 'Card', name: '卡片' },
                { type: 'carousel', elementType: 'Carousel', name: '走马灯' },
                { type: 'collapse', elementType: 'Collapse', name: '折叠面板' },
                { type: 'comment', elementType: 'Comment', name: '评论' },
                {
                  type: 'descriptions',
                  elementType: 'Descriptions',
                  name: '描述列表',
                },
                { type: 'empty', elementType: 'Empty', name: '空状态' },
                { type: 'image', elementType: 'Image', name: '图片' },
                { type: 'list', elementType: 'List', name: '列表' },
                { type: 'popover', elementType: 'Popover', name: '气泡卡片' },
                {
                  type: 'segmented',
                  elementType: 'Segmented',
                  name: '分段控制器',
                },
                {
                  type: 'statistic',
                  elementType: 'Statistic',
                  name: '统计数值',
                },
                { type: 'table', elementType: 'Table', name: '表格' },
                { type: 'tabs', elementType: 'Tabs', name: '标签页' },
                { type: 'tag', elementType: 'Tag', name: '标签' },
                { type: 'timeline', elementType: 'Timeline', name: '时间轴' },
                { type: 'tooltip', elementType: 'Tooltip', name: '文字提示' },
                { type: 'tree', elementType: 'Tree', name: '树形控件' },
              ],
            },
            {
              name: '反馈',
              type: 'feedback',
              widgets: [
                { type: 'alert', elementType: 'Alert', name: '警告提示' },
                { type: 'drawer', elementType: 'Drawer', name: '抽屉' },
                { type: 'message', elementType: 'Message', name: '全局提示' },
                { type: 'modal', elementType: 'Modal', name: '对话框' },
                {
                  type: 'notification',
                  elementType: 'Notification',
                  name: '通知提醒框',
                },
                {
                  type: 'popconfirm',
                  elementType: 'Popconfirm',
                  name: '气泡确认框',
                },
                { type: 'progress', elementType: 'Progress', name: '进度条' },
                { type: 'result', elementType: 'Result', name: '结果' },
                { type: 'skeleton', elementType: 'Skeleton', name: '骨架屏' },
                { type: 'spin', elementType: 'Spin', name: '加载中' },
              ],
            },
            {
              name: '其他',
              type: 'other',
              widgets: [
                { type: 'anchor', elementType: 'Anchor', name: '锚点' },
                { type: 'backTop', elementType: 'BackTop', name: '回到顶部' },
                {
                  type: 'configProvider',
                  elementType: 'ConfigProvider',
                  name: '全局化配置',
                },
              ],
            },
          ],
        },
        {
          name: '图表',
          type: 'antdCharts',
          widgetGroups: [
            {
              name: '折线图',
              type: 'line',
              widgets: [
                {
                  type: 'basicLine',
                  name: '基础折线图',
                  elementType: 'BasicLine',
                },
                {
                  type: 'stepLine',
                  name: '阶梯折线图',
                  elementType: 'StepLine',
                },
                {
                  type: 'multiLine',
                  name: '多折线图',
                  elementType: 'MultiLine',
                },
              ],
            },
            {
              name: '区域地图',
              type: 'line',
              widgets: [
                {
                  type: 'basicLine',
                  name: '基础折线图',
                  elementType: 'BasicLine',
                },
                {
                  type: 'stepLine',
                  name: '阶梯折线图',
                  elementType: 'StepLine',
                },
                {
                  type: 'multiLine',
                  name: '多折线图',
                  elementType: 'MultiLine',
                },
              ],
            },

            {
              name: '区域地图',
              type: 'areaMap',
              widgets: [
                {
                  name: '区域填充',
                  type: 'divisionFill',
                  elementType: 'DivisionFill',
                },
                {
                  name: '区域交互',
                  type: 'mapInteraction',
                  elementType: 'MapInteraction',
                },
              ],
            },

            {
              name: '行政区域地图',
              type: 'choroplethMap',
              widgets: [
                {
                  name: '行政区域',
                  type: 'administrativeDivision',
                  elementType: 'AdministrativeDivision',
                },
                {
                  name: '区域钻取',
                  type: 'drilldown',
                  elementType: 'Drilldown',
                },
              ],
            },

            {
              name: '散点地图',
              type: 'dotMap',
              widgets: [
                {
                  name: '地图散点图',
                  type: 'scatterMap',
                  elementType: 'ScatterMap',
                },
                {
                  name: '地图气泡图',
                  type: 'bubbleMap',
                  elementType: 'BubbleMap',
                },
                {
                  name: '地图气泡图',
                  type: 'bubbleMapMap',
                  elementType: 'BubbleMapMap',
                },
                { name: '图标图', type: 'iconMap', elementType: 'IconMap' },
                {
                  name: '点密度图',
                  type: 'dotDensity',
                  elementType: 'DotDensity',
                },
              ],
            },

            {
              name: '热力地图',
              type: 'heatMap',

              widgets: [
                { name: '点热力图', type: 'heatmap', elementType: 'Heatmap' },
                { name: '网格聚合图', type: 'grid', elementType: 'Grid' },
                { name: '蜂窝聚合图', type: 'hexbin', elementType: 'Hexbin' },
              ],
            },

            {
              name: '面积图',
              type: 'area',
              widgets: [
                {
                  name: '基础面积图',
                  type: 'basicArea',
                  elementType: 'BasicArea',
                },
                {
                  name: '堆积面积图',
                  type: 'stackedArea',
                  elementType: 'StackedArea',
                },
                {
                  name: '百分比面积图',
                  type: 'percentedArea',
                  elementType: 'PercentedArea',
                },
              ],
            },

            {
              name: '柱形图',
              type: 'column',
              widgets: [
                {
                  name: '基础柱状图',
                  type: 'basicColumn',
                  elementType: 'BasicColumn',
                },
                {
                  name: '堆叠柱状图',
                  type: 'stackedColumn',
                  elementType: 'StackedColumn',
                },
                {
                  name: '分组柱状图',
                  type: 'groupedColumn',
                  elementType: 'GroupedColumn',
                },
                {
                  name: '百分比柱状图',
                  type: 'percentColumn',
                  elementType: 'PercentColumn',
                },
                {
                  name: '区间柱状图',
                  type: 'rangeColumn',
                  elementType: 'RangeColumn',
                },
              ],
            },

            {
              name: '条形图',
              type: 'bar',
              widgets: [
                {
                  name: '基础条形图',
                  type: 'basicBar',
                  elementType: 'BasicBar',
                },
                {
                  name: '堆叠条形图',
                  type: 'stackedBar',
                  elementType: 'StackedBar',
                },
                {
                  name: '分组条形图',
                  type: 'groupedBar',
                  elementType: 'GroupedBar',
                },
                {
                  name: '百分比条形图',
                  type: 'percentBar',
                  elementType: 'PercentBar',
                },
                {
                  name: '区间条形图',
                  type: 'rangeBar',
                  elementType: 'RangeBar',
                },
              ],
            },

            {
              name: '饼图',
              type: 'pie',
              widgets: [
                { name: '饼图', type: 'pie', elementType: 'Pie' },
                { name: '环图', type: 'donut', elementType: 'Donut' },
              ],
            },

            {
              name: '双轴图',
              type: 'dualAxes',
              widgets: [
                { name: '双折线图', type: 'dualLine', elementType: 'DualLine' },
                {
                  name: '柱线混合图',
                  type: 'columnLine',
                  elementType: 'ColumnLine',
                },
                {
                  name: '堆叠柱+折线混合图表',
                  type: 'stackedColumnLine',
                  elementType: 'StackedColumnLine',
                },
                {
                  name: '分组柱+折线混合图表',
                  type: 'groupedColumnLine',
                  elementType: 'GroupedColumnLine',
                },
                {
                  name: '堆叠分组柱+折线混合图表',
                  type: 'stackedAndGroupedColumnLine',
                  elementType: 'StackedAndGroupedColumnLine',
                },
              ],
            },

            {
              name: '进度图',
              type: 'progressPlots',
              widgets: [
                { name: '仪表盘', type: 'gauge', elementType: 'Gauge' },
                { name: '水波图', type: 'liquid', elementType: 'Liquid' },
                { name: '子弹图', type: 'bullet', elementType: 'Bullet' },
              ],
            },

            {
              name: '散点气泡图',
              type: 'scatterandBubble',
              widgets: [
                { name: '散点图', type: 'scatter', elementType: 'Scatter' },
                { name: '气泡图', type: 'bubble', elementType: 'Bubble' },
              ],
            },

            {
              name: '玫瑰图',
              type: 'rose',
              widgets: [
                {
                  name: '基础玫瑰图',
                  type: 'basicRose',
                  elementType: 'BasicRose',
                },
                {
                  name: '分组玫瑰图',
                  type: 'groupedRose',
                  elementType: 'GroupedRose',
                },
                {
                  name: '堆叠玫瑰图',
                  type: 'stackedRose',
                  elementType: 'StackedRose',
                },
              ],
            },

            {
              name: '关系图',
              type: 'relationPlots',
              widgets: [
                { name: '桑基图', type: 'sankey', elementType: 'Sankey' },
                { name: '弦图', type: 'chord', elementType: 'Chord' },
              ],
            },

            {
              name: '热力图',
              type: 'heatmap',
              widgets: [
                { name: '热力图', type: 'heatmap', elementType: 'Heatmap' },
                {
                  name: '密度热力图',
                  type: 'densityHeatmap',
                  elementType: 'DensityHeatmap',
                },
              ],
            },

            {
              name: '迷你图',
              type: 'tinyPlots',
              widgets: [
                {
                  name: '迷你折线图',
                  type: 'tinyLine',
                  elementType: 'TinyLine',
                },
                {
                  name: '迷你面积图',
                  type: 'tinyArea',
                  elementType: 'TinyArea',
                },
                {
                  name: '迷你柱形图',
                  type: 'tinyColumn',
                  elementType: 'TinyColumn',
                },
                {
                  name: '进度条图',
                  type: 'progress',
                  elementType: 'Progress',
                },
                {
                  name: '进度环图',
                  type: 'ringProgress',
                  elementType: 'RingProgress',
                },
              ],
            },

            {
              name: '更多图表',
              type: 'morePlots',
              widgets: [
                {
                  name: '矩形树图',
                  type: 'treemap',
                  elementType: 'Treemap',
                },
                { name: '雷达图', type: 'radar', elementType: 'Radar' },
                { name: '漏斗图', type: 'funnel', elementType: 'Funnel' },
                {
                  name: '瀑布图',
                  type: 'waterfall',
                  elementType: 'Waterfall',
                },
                {
                  name: '词云图',
                  type: 'wordCloud',
                  elementType: 'WordCloud',
                },
                {
                  name: '直方图',
                  type: 'histogram',
                  elementType: 'Histogram',
                },
                {
                  name: '旭日图',
                  type: 'sunburst',
                  elementType: 'Sunburst',
                },
                {
                  name: '对称条形图',
                  type: 'bidirectionalBar',
                  elementType: 'BidirectionalBar',
                },
                {
                  name: '玉珏图',
                  type: 'radialBar',
                  elementType: 'RadialBar',
                },
                { name: '小提琴图', type: 'violin', elementType: 'Violin' },
                { name: '箱型图', type: 'box', elementType: 'Box' },
                { name: '韦恩图', type: 'venn', elementType: 'Venn' },
                { name: '股票图', type: 'stock', elementType: 'Stock' },
                {
                  name: 'CirclePacking',
                  type: 'circlePacking',
                  elementType: 'CirclePackin',
                },
              ],
            },

            {
              name: '关系图',
              type: 'relationGraph',
              widgets: [
                {
                  name: '指标拆解图',
                  type: 'decompositionTreeGraph',
                  elementType: 'DecompositionTreeGraph',
                },
                {
                  name: '来源去向图',
                  type: 'flowAnalysisGraph',
                  elementType: 'FlowAnalysisGraph',
                },
                {
                  name: '资金流向图',
                  type: 'fundFlowGraph',
                  elementType: 'FundFlowGraph',
                },
                {
                  name: '组织架构图',
                  type: 'organizationGraph',
                  elementType: 'OrganizationGraph',
                },
                {
                  name: '辐射图',
                  type: 'radialGraph',
                  elementType: 'RadialGraph',
                },
                {
                  name: '辐射树图',
                  type: 'radialTreeGraph',
                  elementType: 'RadialTreeGraph',
                },
              ],
            },

            {
              name: '高级图表',
              type: 'advancedPlots',
              widgets: [
                {
                  name: '多图层图表',
                  type: 'multiViewPlot',
                  elementType: 'MultiViewPlot',
                },
                {
                  name: '分面图',
                  type: 'facetPlot',
                  elementType: 'FacetPlot',
                },
              ],
            },
          ],
        },
        {
          name: '框架',
          type: 'antdAdmins',
          widgetGroups: [
            {
              name: '管理后台',
              type: 'admin',
              widgets: [
                {
                  type: 'antdPro',
                  elementType: 'AntdPro',
                  name: '基础管理后台',
                },
              ],
            },
          ],
        },
      ],
      {
        include: [
          {
            association: ctx.model.WidgetLib.associations.widgetGroups,
            include: [ctx.model.Widget],
          },
        ],
      },
    );

    ctx.body = true;
  }
}
