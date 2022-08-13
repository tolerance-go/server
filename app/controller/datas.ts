import { Controller } from 'egg';
import { Op } from 'sequelize';
import DataDto from '../contract/dto/data';
// import utl from 'lodash';

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * @controller DataController
 */
export default class DataController extends Controller {
  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/datas 路径
   * @request query integer appId appId
   * @request query integer limit limit
   * @request query integer offset offset
   * @response 200 DataListResponse
   */
  async index() {
    const ctx = this.ctx;

    const datas = await ctx.model.Data.findAll({
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
      order: [['created_at', 'ASC']],
      where: {
        ...(ctx.query.appId && {
          app_id: {
            [Op.eq]: ctx.query.appId,
          },
        }),
      },
    });

    ctx.body = datas;
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/datas/:id 路径
   * @request path string id id
   * @response 200 DataShowResponse
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Data.findByPk(toInt(ctx.params.id));
  }

  /**
   * @summary 创建 data
   * @description
   * @router post /api/datas
   * @request body CreationData data 应用对象
   * @response 200 DataShowResponse
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(DataDto.CreationData, ctx.request.body);

    const { name, desc, app_id, data } = ctx.request.body;
    const user = await ctx.model.Data.create({
      name,
      desc,
      app_id,
      data,
    });
    ctx.status = 200;
    ctx.body = user;
  }

  /**
   * @summary 更新 data
   * @description
   * @router put /api/datas/:id
   * @request path string id id
   * @request body string data 舞台数据的 json 字符串
   * @response 200 BaseResponse
   */
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const data = await ctx.model.Data.findByPk(id);
    if (!data) {
      throw new Error('未找到该资源');
    }

    /** 如果只有一个参数，body 如果是 JSON string，会自动转成对象，这里再转换一下 */
    await data.update({ data: JSON.stringify(ctx.request.body) });
    ctx.body = data;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/datas/:id
   * @request path string id id
   * @response 200 DataShowResponse
   */
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const app = await ctx.model.Data.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    await app.destroy();
    ctx.body = app;
  }
}
