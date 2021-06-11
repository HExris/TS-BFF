import KOA from 'koa'
import { createContainer, Lifetime } from 'awilix'
import { loadControllers, scopePerRequest } from 'awilix-koa'

// 创建APP实例
const app = new KOA()
// 创建容器
const container = createContainer()
// 容器加载模块
container.loadModules([__dirname + '/services/*.js'], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED
  }
})

// APP加载路由
app.use(scopePerRequest(container))
app.use(loadControllers(__dirname + '/routes/*.js'))
app.listen(3000, () => {
  console.log('Server is listening on port 3000.')
})