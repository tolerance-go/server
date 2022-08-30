## resources

1. 数据表迁移

https://sequelize.org/docs/v6/other-topics/migrations/
https://sequelize.org/docs/v7/other-topics/query-interface/

2. swagger

https://github.com/tolerance-go/egg-swagger-doc-custom

## 注意

1. findAll 传 raw 的时候，boolean 类型的值会转成 0 和 1

2. router 中自定义的 api，可能和 resources 有冲突
   比如 /discusses-count-comments 是可以的，但是 /discusses/count-comments 和 resources('discusses') 就有冲突

3. ctx.user 的内容可能是旧的

~~是最近一次保存进 session 的内容，要取 id 重新查询~~

通过中间件，已经自动更新了 ctx.user 内容

# view 存放前端文件，只是为了 需求原子化，在同一个 commit 上完成前后端开发
