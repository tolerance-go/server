import { Application, IBoot } from 'egg';

export default class AppBoot implements IBoot {
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  configWillLoad() {
    // this.stages.push('configWillLoad');
  }

  async didLoad() {
    // this.stages.push('didLoad');
  }

  async willReady() {
    // this.stages.push('willReady');
  }

  async didReady() {
    if (this.app.config.env === 'local') {
      console.log('start force sync model');
      await this.app.model.sync();
    }
  }

  async serverDidReady() {
    // this.stages.push('serverDidReady');
  }

  async beforeClose() {
    // this.stages.push('beforeClose');
  }
}
