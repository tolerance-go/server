import { Controller } from 'egg';
import { Op } from 'sequelize';
import { getFindOptions } from '../helpers/getFindOptions';
import { toInt } from '../utils/toInt';

/**
 * @controller LicenseController
 */
export default class LicenseController extends Controller {
  /**
   * @summary 获取列表
   * @description 描述
   * @router get /api/license 路径
   * @request query integer limit limit
   * @request query integer offset offset
   * @response 200 LicenseListResponse
   */
  async index() {
    const ctx = this.ctx;

    ctx.body = await ctx.model.License.findAll({
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
      order: [['created_at', 'DESC']],
    });
  }

  /**
   * @summary 获取列表
   * @description 获取列表
   * @router post /api/license/findAll
   * @request body FindOptions findOptions
   * @response 200 LicenseListResponse
   */
  async findAll() {
    const ctx = this.ctx;
    const findOptions = getFindOptions(ctx, ctx.rule.FindOptions);
    const result = await ctx.model.License.findAll(findOptions);
    ctx.body = result;
  }

  /**
   * @summary 获取列表
   * @description 获取列表
   * @router post /api/license/findAndCountAll
   * @request body FindOptions findOptions
   * @response 200 LicenseListAndCountResponse
   */
  async findAndCountAll() {
    const ctx = this.ctx;
    const findOptions = getFindOptions(ctx, ctx.rule.FindOptions);
    const result = await ctx.model.License.findAndCountAll(findOptions);
    ctx.body = result;
  }

  /**
   * @summary 查看
   * @description 描述
   * @router get /api/licenses/:id 路径
   * @request path string id id
   * @response 200 LicenseShowResponse
   */
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.License.findByPk(ctx.params.id);
  }

  /**
   * @summary 创建 app
   * @description
   * @router post /api/licenses
   * @request body CreationLicense app 应用对象
   * @response 200 LicenseShowResponse
   */
  async create() {
    const ctx = this.ctx;

    ctx.validate(ctx.rule.CreationLicense, ctx.request.body);

    const user = await ctx.model.License.create({
      ...ctx.request.body,
      userId: ctx.user.id,
    });
    ctx.status = 200;
    ctx.body = user;
  }

  /**
   * @summary 更新 app
   * @description
   * @router put /api/licenses/:id
   * @request path string id id
   * @request body UpdationLicense data
   * @response 200 LicenseShowResponse
   */
  async update() {
    const ctx = this.ctx;

    ctx.validate(ctx.rule.UpdationLicense, ctx.request.body);

    const id = ctx.params.id;
    const app = await ctx.model.License.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    /** 如果只有一个参数，body 如果是 JSON string，会自动转成对象，这里再转换一下 */
    await app.update(ctx.request.body);
    ctx.body = app;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/licenses/:id
   * @request path string id id
   * @response 200 LicenseShowResponse
   */
  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const app = await ctx.model.License.findByPk(id);
    if (!app) {
      throw new Error('未找到该资源');
    }

    await app.destroy();
    ctx.status = 200;
  }

  /**
   * @summary 删除 app
   * @description
   * @router delete /api/licenses/bulkDestroy
   * @request body array[integer] ids
   * @response 200 CountResponse
   */
  async bulkDestroy() {
    const ctx = this.ctx;

    const destroyedRows = await ctx.model.License.destroy({
      where: {
        id: {
          [Op.in]: ctx.request.body ?? [],
        },
      },
    });

    ctx.body = destroyedRows;
  }
}
