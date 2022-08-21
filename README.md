# hackernews-async-ts

[Hacker News](https://news.ycombinator.com/) showcase using typescript && egg

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+

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
