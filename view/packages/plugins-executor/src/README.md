用来存放无状态组件，配合 withExecutor 使用

在约定路由的边上注册执行器，本质是一个组件

会找到对应路由进行包裹

src/executors -> @@/global-layout

pages/index.executor -> index

pages/design/executors/* -> design