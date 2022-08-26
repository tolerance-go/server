import { Application, IBoot } from 'egg';
// import invariant from 'invariant';
// import { Strategy as LocalStrategy } from 'passport-local';

type LocalUserIdentity = {
  provider: 'local';
  username: string;
  password: string;
};

interface EggPluginUserIdentity {
  id: string;
  provider: string;
  apikey: string;
  name: string;
  displayName: string;
  photo: string;
  profile: object;
  currentUrl: string;
  lastUrl: string;
}

type UserIdentity = LocalUserIdentity | EggPluginUserIdentity;

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
      await this.app.model.sync({
        alter: true,
      });
    }

    this.passport();
  }

  async serverDidReady() {
    // this.stages.push('serverDidReady');
  }

  async beforeClose() {
    // this.stages.push('beforeClose');
  }

  passport() {
    this.app.passport.verify(async (ctx, user: UserIdentity) => {
      if (user.provider === 'local') {
        user = user as LocalUserIdentity;
        //
        // Authorization Table
        // column   | desc
        // ---      | --
        // provider | provider name, like github, twitter, facebook, weibo and so on
        // uid      | provider unique id
        // user_id  | current application user id
        // const auth = await ctx.model.Authorization.findOne({
        //   where: {
        //     uid: user.id,
        //     provider: user.provider,
        //   },
        // });
        // console.log(auth);
        const existsUser = await ctx.model.User.findOne({
          where: {
            password: user.password,
            username: user.username,
          },
        });
        if (existsUser) {
          return existsUser;
        }
        // // call user service to register a new user
        // const newUser = await ctx.service.user.register(user);
        // return newUser;
        /** 返回 null 会自动抛出异常 */
        return null;
      }
      /** 如果是第三方登录，帮助用户自动注册一个也挺好 */
    });

    // 序列化用户信息后存储进 session
    this.app.passport.serializeUser(async (_ctx, user: UserIdentity) => {
      console.log('-----------------------', 'serializeUser');
      // user.currentUrl = ctx.url;
      return user;
    });

    // 反序列化后取出用户信息
    this.app.passport.deserializeUser(async (_ctx, user: UserIdentity) => {
      // user.lastUrl = user.currentUrl;
      // user.currentUrl = ctx.url;
      return user;
    });

    /** 注册策略 */
    // register localapikey strategy into `this.app.passport`
    // must require `req` params
    // this.app.passport.use(
    //   new LocalStrategy(
    //     {
    //       passReqToCallback: true,
    //     },
    //     (req, username, password, done) => {
    //       // format user
    //       const user: LocalUserIdentity = {
    //         provider: 'local',
    //         username,
    //         password,
    //       };
    //       this.app.logger.debug(
    //         '%s %s get user: %j',
    //         req.method,
    //         req.url,
    //         user,
    //       );
    //       this.app.passport.doVerify(req, user, done);
    //     },
    //   ),
    // );
  }
}
