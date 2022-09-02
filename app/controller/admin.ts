import { Controller } from 'egg';
import { getPublicKey } from '../helpers/getPublicKey';
// import utl from 'lodash';

/**
 * @controller AdminController
 */
export default class AdminController extends Controller {
  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/admin/db-init 路径
   * @response 200 ResultResponse
   */
  async init() {
    const ctx = this.ctx;

    const existAdmin = await ctx.model.User.findOne({
      where: {
        username: 'superAdmin',
      },
    });

    if (existAdmin) {
      throw new Error('existAdmin');
    }

    const userAdmin = await ctx.model.User.create({
      username: 'superAdmin',
      password: getPublicKey().encrypt('qwe123', 'base64'),
    });

    await ctx.model.WidgetLib.bulkCreate(
      [
        {
          userId: userAdmin.id,
          name: '基础',
          type: 'antd',
          widgetGroups: [
            {
              userId: userAdmin.id,
              name: '通用',
              type: 'general',
              widgets: [
                {
                  type: 'button',
                  elementType: 'Button',
                  display: 'inline-block',
                  userId: userAdmin.id,
                  name: '按钮',
                  desc: '按钮用于开始一个即时操作。',
                  detail: `# 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

在 Ant Design 中我们提供了五种按钮。

- 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
- 默认按钮：用于没有主次之分的一组行动点。
- 虚线按钮：常用于添加操作。
- 文本按钮：用于最次级的行动点。
- 链接按钮：一般用于链接，即导航至某位置。

以及四种状态属性与上面配合使用。

- 危险：删除/移动/修改权限等危险操作，一般需要二次确认。
- 幽灵：用于背景色比较复杂的地方，常用在首页/产品页等展示场景。
- 禁用：行动点不可用的时候，一般需要文案解释。
- 加载中：用于异步操作等待反馈的时候，也可以避免多次提交。

[完整设计指南](https://ant.design/docs/spec/buttons-cn)
`,
                },
                {
                  type: 'icon',
                  elementType: 'Icon',
                  display: 'inline-block',
                  userId: userAdmin.id,
                  name: '图标',
                },
                {
                  type: 'typography',
                  elementType: 'Typography',
                  display: 'inline-block',
                  userId: userAdmin.id,
                  name: '排版',
                },
              ],
            },
            {
              userId: userAdmin.id,
              name: '布局',
              type: 'layout',
              widgets: [
                {
                  type: 'divider',
                  elementType: 'Divider',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '分割线',
                },
                {
                  type: 'grid',
                  elementType: 'Grid',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '栅格',
                },
                {
                  type: 'layout',
                  elementType: 'Layout',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '布局',
                },
                {
                  type: 'space',
                  elementType: 'Space',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '间距',
                },
              ],
            },
            {
              userId: userAdmin.id,
              name: '导航',
              type: 'navigation',
              widgets: [
                {
                  type: 'affix',
                  elementType: 'Affix',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '固钉',
                },
                {
                  type: 'breadcrumb',
                  elementType: 'Breadcrumb',
                  display: 'block',

                  userId: userAdmin.id,
                  name: '面包屑',
                },
                {
                  type: 'dropdown',
                  elementType: 'Dropdown',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '下拉菜单',
                },
                {
                  type: 'menu',
                  elementType: 'Menu',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '导航菜单',
                },
                {
                  type: 'pageHeader',
                  elementType: 'PageHeader',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '页头',
                },
                {
                  type: 'pagination',
                  elementType: 'Pagination',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '分页',
                },
                {
                  type: 'steps',
                  elementType: 'Steps',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '步骤条',
                },
              ],
            },
            {
              userId: userAdmin.id,
              name: '数据录入',
              type: 'dataEntry',
              widgets: [
                {
                  type: 'autoComplete',
                  elementType: 'AutoComplete',
                  display: 'block',

                  userId: userAdmin.id,
                  name: '自动完成',
                },
                {
                  type: 'cascader',
                  elementType: 'Cascader',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '级联选择',
                },
                {
                  type: 'checkbox',
                  elementType: 'Checkbox',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '多选框',
                },
                {
                  type: 'datePicker',
                  elementType: 'DatePicker',
                  display: 'block',

                  userId: userAdmin.id,
                  name: '日期选择框',
                },
                {
                  type: 'form',
                  elementType: 'Form',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '表单',
                },
                {
                  type: 'input',
                  elementType: 'Input',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '输入框',
                },
                {
                  type: 'inputNumber',
                  elementType: 'InputNumber',
                  display: 'block',

                  userId: userAdmin.id,
                  name: '数字输入框',
                },
                {
                  type: 'mentions',
                  elementType: 'Mentions',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '提及',
                },
                {
                  type: 'radio',
                  elementType: 'Radio',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '单选框',
                },
                {
                  type: 'rate',
                  elementType: 'Rate',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '评分',
                },
                {
                  type: 'select',
                  elementType: 'Select',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '选择器',
                },
                {
                  type: 'slider',
                  elementType: 'Slider',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '滑动输入条',
                },
                {
                  type: 'switch',
                  elementType: 'Switch',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '开关',
                },
                {
                  type: 'timePicker',
                  elementType: 'TimePicker',
                  display: 'block',

                  userId: userAdmin.id,
                  name: '时间选择框',
                },
                {
                  type: 'transfer',
                  elementType: 'Transfer',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '穿梭框',
                },
                {
                  type: 'treeSelect',
                  elementType: 'TreeSelect',
                  display: 'block',

                  userId: userAdmin.id,
                  name: '树选择',
                },
                {
                  type: 'upload',
                  elementType: 'Upload',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '上传',
                },
              ],
            },
            {
              userId: userAdmin.id,
              name: '数据展示',
              type: 'dataDisplay',
              widgets: [
                {
                  type: 'avatar',
                  elementType: 'Avatar',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '头像',
                },
                {
                  type: 'badge',
                  elementType: 'Badge',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '徽标数',
                },
                {
                  type: 'calendar',
                  elementType: 'Calendar',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '日历',
                },
                {
                  type: 'card',
                  elementType: 'Card',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '卡片',
                },
                {
                  type: 'carousel',
                  elementType: 'Carousel',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '走马灯',
                },
                {
                  type: 'collapse',
                  elementType: 'Collapse',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '折叠面板',
                },
                {
                  type: 'comment',
                  elementType: 'Comment',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '评论',
                },
                {
                  type: 'descriptions',
                  elementType: 'Descriptions',
                  display: 'block',

                  userId: userAdmin.id,
                  name: '描述列表',
                },
                {
                  type: 'empty',
                  elementType: 'Empty',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '空状态',
                },
                {
                  type: 'image',
                  elementType: 'Image',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '图片',
                },
                {
                  type: 'list',
                  elementType: 'List',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '列表',
                },
                {
                  type: 'popover',
                  elementType: 'Popover',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '气泡卡片',
                },
                {
                  type: 'segmented',
                  elementType: 'Segmented',
                  display: 'block',

                  userId: userAdmin.id,
                  name: '分段控制器',
                },
                {
                  type: 'statistic',
                  elementType: 'Statistic',
                  display: 'block',

                  userId: userAdmin.id,
                  name: '统计数值',
                },
                {
                  type: 'table',
                  elementType: 'Table',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '表格',
                },
                {
                  type: 'tabs',
                  elementType: 'Tabs',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '标签页',
                },
                {
                  type: 'tag',
                  elementType: 'Tag',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '标签',
                },
                {
                  type: 'timeline',
                  elementType: 'Timeline',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '时间轴',
                },
                {
                  type: 'tooltip',
                  elementType: 'Tooltip',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '文字提示',
                },
                {
                  type: 'tree',
                  elementType: 'Tree',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '树形控件',
                },
              ],
            },
            {
              userId: userAdmin.id,
              name: '反馈',
              type: 'feedback',
              widgets: [
                {
                  type: 'alert',
                  elementType: 'Alert',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '警告提示',
                },
                {
                  type: 'drawer',
                  elementType: 'Drawer',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '抽屉',
                },
                {
                  type: 'message',
                  elementType: 'Message',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '全局提示',
                },
                {
                  type: 'modal',
                  elementType: 'Modal',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '对话框',
                },
                {
                  type: 'notification',
                  elementType: 'Notification',
                  display: 'block',

                  userId: userAdmin.id,
                  name: '通知提醒框',
                },
                {
                  type: 'popconfirm',
                  elementType: 'Popconfirm',
                  display: 'block',

                  userId: userAdmin.id,
                  name: '气泡确认框',
                },
                {
                  type: 'progress',
                  elementType: 'Progress',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '进度条',
                },
                {
                  type: 'result',
                  elementType: 'Result',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '结果',
                },
                {
                  type: 'skeleton',
                  elementType: 'Skeleton',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '骨架屏',
                },
                {
                  type: 'spin',
                  elementType: 'Spin',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '加载中',
                },
              ],
            },
            {
              userId: userAdmin.id,
              name: '其他',
              type: 'other',
              widgets: [
                {
                  type: 'anchor',
                  elementType: 'Anchor',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '锚点',
                },
                {
                  type: 'backTop',
                  elementType: 'BackTop',
                  display: 'block',
                  userId: userAdmin.id,
                  name: '回到顶部',
                },
                {
                  type: 'configProvider',
                  elementType: 'ConfigProvider',
                  display: 'block',

                  userId: userAdmin.id,
                  name: '全局化配置',
                },
              ],
            },
          ],
        },
        {
          userId: userAdmin.id,
          name: '图表',
          type: 'antdCharts',
          widgetGroups: [
            {
              userId: userAdmin.id,
              name: '折线图',
              type: 'line',
              widgets: [
                {
                  type: 'basicLine',

                  userId: userAdmin.id,
                  name: '基础折线图',
                  elementType: 'BasicLine',
                  display: 'block',
                },
                {
                  type: 'stepLine',

                  userId: userAdmin.id,
                  name: '阶梯折线图',
                  elementType: 'StepLine',
                  display: 'block',
                },
                {
                  type: 'multiLine',

                  userId: userAdmin.id,
                  name: '多折线图',
                  elementType: 'MultiLine',
                  display: 'block',
                },
              ],
            },
            {
              userId: userAdmin.id,
              name: '区域地图',
              type: 'line',
              widgets: [
                {
                  type: 'basicLine',

                  userId: userAdmin.id,
                  name: '基础折线图',
                  elementType: 'BasicLine',
                  display: 'block',
                },
                {
                  type: 'stepLine',

                  userId: userAdmin.id,
                  name: '阶梯折线图',
                  elementType: 'StepLine',
                  display: 'block',
                },
                {
                  type: 'multiLine',

                  userId: userAdmin.id,
                  name: '多折线图',
                  elementType: 'MultiLine',
                  display: 'block',
                },
              ],
            },

            {
              userId: userAdmin.id,
              name: '区域地图',
              type: 'areaMap',
              widgets: [
                {
                  userId: userAdmin.id,
                  name: '区域填充',
                  type: 'divisionFill',
                  elementType: 'DivisionFill',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '区域交互',
                  type: 'mapInteraction',
                  elementType: 'MapInteraction',
                  display: 'block',
                },
              ],
            },

            {
              userId: userAdmin.id,
              name: '行政区域地图',
              type: 'choroplethMap',
              widgets: [
                {
                  userId: userAdmin.id,
                  name: '行政区域',
                  type: 'administrativeDivision',
                  elementType: 'AdministrativeDivision',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '区域钻取',
                  type: 'drilldown',
                  elementType: 'Drilldown',
                  display: 'block',
                },
              ],
            },

            {
              userId: userAdmin.id,
              name: '散点地图',
              type: 'dotMap',
              widgets: [
                {
                  userId: userAdmin.id,
                  name: '地图散点图',
                  type: 'scatterMap',
                  elementType: 'ScatterMap',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '地图气泡图',
                  type: 'bubbleMap',
                  elementType: 'BubbleMap',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '地图气泡图',
                  type: 'bubbleMapMap',
                  elementType: 'BubbleMapMap',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '图标图',
                  type: 'iconMap',
                  elementType: 'IconMap',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '点密度图',
                  type: 'dotDensity',
                  elementType: 'DotDensity',
                  display: 'block',
                },
              ],
            },

            {
              userId: userAdmin.id,
              name: '热力地图',
              type: 'heatMap',

              widgets: [
                {
                  userId: userAdmin.id,
                  name: '点热力图',
                  type: 'heatmap',
                  elementType: 'Heatmap',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '网格聚合图',
                  type: 'grid',
                  elementType: 'Grid',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '蜂窝聚合图',
                  type: 'hexbin',
                  elementType: 'Hexbin',
                  display: 'block',
                },
              ],
            },

            {
              userId: userAdmin.id,
              name: '面积图',
              type: 'area',
              widgets: [
                {
                  userId: userAdmin.id,
                  name: '基础面积图',
                  type: 'basicArea',
                  elementType: 'BasicArea',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '堆积面积图',
                  type: 'stackedArea',
                  elementType: 'StackedArea',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '百分比面积图',
                  type: 'percentedArea',
                  elementType: 'PercentedArea',
                  display: 'block',
                },
              ],
            },

            {
              userId: userAdmin.id,
              name: '柱形图',
              type: 'column',
              widgets: [
                {
                  userId: userAdmin.id,
                  name: '基础柱状图',
                  type: 'basicColumn',
                  elementType: 'BasicColumn',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '堆叠柱状图',
                  type: 'stackedColumn',
                  elementType: 'StackedColumn',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '分组柱状图',
                  type: 'groupedColumn',
                  elementType: 'GroupedColumn',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '百分比柱状图',
                  type: 'percentColumn',
                  elementType: 'PercentColumn',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '区间柱状图',
                  type: 'rangeColumn',
                  elementType: 'RangeColumn',
                  display: 'block',
                },
              ],
            },

            {
              userId: userAdmin.id,
              name: '条形图',
              type: 'bar',
              widgets: [
                {
                  userId: userAdmin.id,
                  name: '基础条形图',
                  type: 'basicBar',
                  elementType: 'BasicBar',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '堆叠条形图',
                  type: 'stackedBar',
                  elementType: 'StackedBar',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '分组条形图',
                  type: 'groupedBar',
                  elementType: 'GroupedBar',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '百分比条形图',
                  type: 'percentBar',
                  elementType: 'PercentBar',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '区间条形图',
                  type: 'rangeBar',
                  elementType: 'RangeBar',
                  display: 'block',
                },
              ],
            },

            {
              userId: userAdmin.id,
              name: '饼图',
              type: 'pie',
              widgets: [
                {
                  userId: userAdmin.id,
                  name: '饼图',
                  type: 'pie',
                  elementType: 'Pie',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '环图',
                  type: 'donut',
                  elementType: 'Donut',
                  display: 'block',
                },
              ],
            },

            {
              userId: userAdmin.id,
              name: '双轴图',
              type: 'dualAxes',
              widgets: [
                {
                  userId: userAdmin.id,
                  name: '双折线图',
                  type: 'dualLine',
                  elementType: 'DualLine',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '柱线混合图',
                  type: 'columnLine',
                  elementType: 'ColumnLine',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '堆叠柱+折线混合图表',
                  type: 'stackedColumnLine',
                  elementType: 'StackedColumnLine',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '分组柱+折线混合图表',
                  type: 'groupedColumnLine',
                  elementType: 'GroupedColumnLine',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '堆叠分组柱+折线混合图表',
                  type: 'stackedAndGroupedColumnLine',
                  elementType: 'StackedAndGroupedColumnLine',
                  display: 'block',
                },
              ],
            },

            {
              userId: userAdmin.id,
              name: '进度图',
              type: 'progressPlots',
              widgets: [
                {
                  userId: userAdmin.id,
                  name: '仪表盘',
                  type: 'gauge',
                  elementType: 'Gauge',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '水波图',
                  type: 'liquid',
                  elementType: 'Liquid',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '子弹图',
                  type: 'bullet',
                  elementType: 'Bullet',
                  display: 'block',
                },
              ],
            },

            {
              userId: userAdmin.id,
              name: '散点气泡图',
              type: 'scatterandBubble',
              widgets: [
                {
                  userId: userAdmin.id,
                  name: '散点图',
                  type: 'scatter',
                  elementType: 'Scatter',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '气泡图',
                  type: 'bubble',
                  elementType: 'Bubble',
                  display: 'block',
                },
              ],
            },

            {
              userId: userAdmin.id,
              name: '玫瑰图',
              type: 'rose',
              widgets: [
                {
                  userId: userAdmin.id,
                  name: '基础玫瑰图',
                  type: 'basicRose',
                  elementType: 'BasicRose',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '分组玫瑰图',
                  type: 'groupedRose',
                  elementType: 'GroupedRose',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '堆叠玫瑰图',
                  type: 'stackedRose',
                  elementType: 'StackedRose',
                  display: 'block',
                },
              ],
            },

            {
              userId: userAdmin.id,
              name: '关系图',
              type: 'relationPlots',
              widgets: [
                {
                  userId: userAdmin.id,
                  name: '桑基图',
                  type: 'sankey',
                  elementType: 'Sankey',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '弦图',
                  type: 'chord',
                  elementType: 'Chord',
                  display: 'block',
                },
              ],
            },

            {
              userId: userAdmin.id,
              name: '热力图',
              type: 'heatmap',
              widgets: [
                {
                  userId: userAdmin.id,
                  name: '热力图',
                  type: 'heatmap',
                  elementType: 'Heatmap',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '密度热力图',
                  type: 'densityHeatmap',
                  elementType: 'DensityHeatmap',
                  display: 'block',
                },
              ],
            },

            {
              userId: userAdmin.id,
              name: '迷你图',
              type: 'tinyPlots',
              widgets: [
                {
                  userId: userAdmin.id,
                  name: '迷你折线图',
                  type: 'tinyLine',
                  elementType: 'TinyLine',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '迷你面积图',
                  type: 'tinyArea',
                  elementType: 'TinyArea',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '迷你柱形图',
                  type: 'tinyColumn',
                  elementType: 'TinyColumn',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '进度条图',
                  type: 'progress',
                  elementType: 'Progress',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '进度环图',
                  type: 'ringProgress',
                  elementType: 'RingProgress',
                  display: 'block',
                },
              ],
            },

            {
              userId: userAdmin.id,
              name: '更多图表',
              type: 'morePlots',
              widgets: [
                {
                  userId: userAdmin.id,
                  name: '矩形树图',
                  type: 'treemap',
                  elementType: 'Treemap',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '雷达图',
                  type: 'radar',
                  elementType: 'Radar',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '漏斗图',
                  type: 'funnel',
                  elementType: 'Funnel',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '瀑布图',
                  type: 'waterfall',
                  elementType: 'Waterfall',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '词云图',
                  type: 'wordCloud',
                  elementType: 'WordCloud',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '直方图',
                  type: 'histogram',
                  elementType: 'Histogram',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '旭日图',
                  type: 'sunburst',
                  elementType: 'Sunburst',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '对称条形图',
                  type: 'bidirectionalBar',
                  elementType: 'BidirectionalBar',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '玉珏图',
                  type: 'radialBar',
                  elementType: 'RadialBar',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '小提琴图',
                  type: 'violin',
                  elementType: 'Violin',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '箱型图',
                  type: 'box',
                  elementType: 'Box',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '韦恩图',
                  type: 'venn',
                  elementType: 'Venn',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '股票图',
                  type: 'stock',
                  elementType: 'Stock',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: 'CirclePacking',
                  type: 'circlePacking',
                  elementType: 'CirclePackin',
                  display: 'block',
                },
              ],
            },

            {
              userId: userAdmin.id,
              name: '关系图',
              type: 'relationGraph',
              widgets: [
                {
                  userId: userAdmin.id,
                  name: '指标拆解图',
                  type: 'decompositionTreeGraph',
                  elementType: 'DecompositionTreeGraph',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '来源去向图',
                  type: 'flowAnalysisGraph',
                  elementType: 'FlowAnalysisGraph',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '资金流向图',
                  type: 'fundFlowGraph',
                  elementType: 'FundFlowGraph',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '组织架构图',
                  type: 'organizationGraph',
                  elementType: 'OrganizationGraph',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '辐射图',
                  type: 'radialGraph',
                  elementType: 'RadialGraph',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '辐射树图',
                  type: 'radialTreeGraph',
                  elementType: 'RadialTreeGraph',
                  display: 'block',
                },
              ],
            },

            {
              userId: userAdmin.id,
              name: '高级图表',
              type: 'advancedPlots',
              widgets: [
                {
                  userId: userAdmin.id,
                  name: '多图层图表',
                  type: 'multiViewPlot',
                  elementType: 'MultiViewPlot',
                  display: 'block',
                },
                {
                  userId: userAdmin.id,
                  name: '分面图',
                  type: 'facetPlot',
                  elementType: 'FacetPlot',
                  display: 'block',
                },
              ],
            },
          ],
        },
        {
          userId: userAdmin.id,
          name: '框架',
          type: 'antdAdmins',
          widgetGroups: [
            {
              userId: userAdmin.id,
              name: '管理后台',
              type: 'admin',
              widgets: [
                {
                  type: 'antdPro',
                  elementType: 'AntdPro',
                  display: 'block',

                  userId: userAdmin.id,
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
