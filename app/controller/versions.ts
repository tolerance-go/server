import { Controller } from 'egg';
import { Op } from 'sequelize';
import VersionDto from '../contract/dto/version';

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/**
 * @controller VersionController
 */
export default class VersionController extends Controller {
  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/versions 路径
   * @request query integer appId appId
   * @request query integer limit limit
   * @request query integer offset offset
   * @response 200 VersionListResponse
   */
  async index() {
    const ctx = this.ctx;

    const versions = await ctx.model.Version.findAll({
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
      order: [['created_at', 'DESC']],
      where: {
        ...(ctx.query.appId && {
          app_id: {
            [Op.eq]: ctx.query.appId,
          },
        }),
      },
    });

    ctx.body = versions;
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/versions/:id 路径
   * @request path string id id
   * @response 200 VersionShowResponse
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Version.findByPk(toInt(ctx.params.id));
  }

  /**
   * @summary 创建 version
   * @description
   * @router post /api/versions
   * @request body CreationVersion page 应用对象
   * @response 200 VersionShowResponse
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(VersionDto.CreationVersion, ctx.request.body);

    const { name, app_id, pageIds } = ctx.request.body;

    const pages = await ctx.model.Page.findAll({
      where: {
        id: {
          [Op.in]: pageIds,
        },
      },
    });

    const version = await ctx.model.Version.create({
      name,
      app_id,
    });

    await ctx.model.Page.bulkCreate(
      pages.map((page) => {
        const { path, appId, stage_data } = page.toJSON();
        return {
          path,
          appId,
          stage_data,
          version_id: version.id,
        };
      }),
    );

    ctx.status = 200;
    ctx.body = version;
  }

  /**
   * @summary 更新 page
   * @description
   * @router put /api/versions/:id
   * @request path string id id
   * @request body string data 舞台数据的 json 字符串
   * @response 200 BaseResponse
   */
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const version = await ctx.model.Version.findByPk(id);
    if (!version) {
      throw new Error('未找到该资源');
    }

    /** 如果只有一个参数，body 如果是 JSON string，会自动转成对象，这里再转换一下 */
    // await version.update({ app_data: JSON.stringify(ctx.request.body) });
    ctx.body = version;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/versions/:id
   * @request path string id id
   * @response 200 VersionShowResponse
   */
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const app = await ctx.model.Version.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    await app.destroy();
    ctx.body = app;
  }
}
