### 文件解构

1. .browserslistrc 浏览器适配
某些工具在工作会读取这个文件，从而进行浏览器的适配，比如给css加前缀

### ts InstanceType

1. .vue文件中，export default 导出的组件是一个对象，这个对象实际上是一个对这个组件的描述，类似于一个class，当在另外一个组件里面使用这个组件的时候，不是直接使用这个导出的对象，而是根据这个导出的对象创建出一个真正的组件实例，每次用到这个组件的时候，就都会创建一个这样的实例

2. class就是对一个对象的具体描述，描述一个对象里面有哪些属性，让后通过new关键字创建出一个真正的对象实例

3. InstanceType可以帮助从某一个类型里面取出一个拥有构造函数的实例

```ts
class Person {}

type Foo = InstanceType<typeof Person>
// 这里的 Foo 就等同于 Person

// 这里的LoginAccount是导入的组件，accountRef是这个组件的模板引用变量
// 通过 typeof LoginAccount 先拿到类型，再通过这个InstanceType获取对应的拥有构造函数的实例，构造函数的实例获取的到之后，就可以确定accountRef是对应的LoginAccount创建出来的
const accountRef = ref<InstanceType<typeof LoginAcount>>()
```
 
### 菜单动态路由配置的三种方案

1. 将所有菜单对用的路由注册好，不同角色登录进来后，只展示他的角色对应的菜单，其余的直接隐藏，但是存在安全隐患，因为用户还是可以通过在浏览器输入路由path的方式访问到不属于他菜单权限范围内的东西

2. 在本地将不同角色对应的菜单路由全部注册好，例如superadmin: [{},{},{}]，admin:[{},{}]，user:[{}]，当用户登录进来的时候，获取到用户的角色id，再通过角色匹配到当前用户的菜单路由数组，然后注册不同的路由，但是如果新添加角色的话，就要修改本地代码，然后重新部署

3. 根据菜单动态生成路由隐射：根据服务器返回的菜单，菜单里面有url，url对应一个路由，路由对应一个path，path对应一个component，例如角色管理菜单 -> url: '/main/role' -> path -> component，最后生成一个routes数组，再通过addRoute方法添加到children里面去
菜单动态生成路由的两种方案：
1). 菜单中就有加载组件的名称和路径，例如有一个{component: 'Role.vue', path: '/main/role'}，要求名称/路径必须要一致
2). 菜单中只有url，在前端项目中，每一个url -> path -> component，形成一个映射关系，最后生成一个routes[]，通过addRoute方法添加到children数组里面去

### requier.context()
**https://webpack.docschina.org/guides/dependency-management/#requirecontext**
1. require.context(directory, useSubdirectories, regExp)，返回一个webapck的上下文环境
2. directory: 表示检索的目录
3. useSubdirectories: 表示是否检索其子目录
4. regExp: 匹配文件的正则表达式，一般是文件名
```ts
const files1 = require.context('./test', false, /\.test\.js$/);
//（创建出）一个 context，其中文件来自 test 目录，request 以 `.test.js` 结尾。
const files2 = require.context('../', true, /\.stories\.js$/);
// （创建出）一个 context，其中所有文件都来自父文件夹及其所有子级文件夹，request 以 `.stories.js` 结尾。

// 调用key方法，返回一个包含检索出来的文件路径的数组
const files1Keys = files1.key()
```
5. 当上下文环境传入某一个键时，就会得到一个标准的esModule

### form组件封装

1. 封装一个通用的表单组件，之后使用中，给这个表单组件传递一个配置文件就可以快速完成页面的表单部分
2. 表单的基本布局： 通过el-row el-col来进行布局
3. 组件接收一个配置项数组，通过循环配置项创建表单
- 配置项类型: IFormItem[]
- IFormItem中应该配置哪些属性(包含公共属性与各个表单项的特有属性)
4. 表单type的控制：通过不同的type动态渲染不同类型的表单
5. 针对select与datePicker添加不同的属性，如果表单项中有其他类型的表达，也需要单独进行属性的添加
6. 针对各种表单项特有的属性可通过定义一个 otherOptions 属性，将这些特有的属性放在otherOptions中，再通过v-bind动态绑定
7. 针对样式问题：每一个form-item之间的间距 / form-item的label的宽度大小 / 表单部分的响应式布局
- form-item的label的宽度大小：添加一个props(有默认值)，也可由父组件决定传入labelWidth的大小
- 每一个form-item之间的间距：添加一个props(有默认值)，也可由父组件决定form-item之间的间距大小
- 表单部分的响应式布局：栅格布局 通过设置el-col的属性(xs,sm,md,lg,xl,span)控制响应式，有默认值，也由父组件决定如何进行响应式变化
8. 属性抽取，配置文件抽取，类型合并

### 刷新页面后菜单与路径的同步匹配

1. 设置el-menu组件的default-active的值
2. 通过递归userMenus，找到与当前路由path对应的那个menu
3. 将这个menu的id设为default-active的值

## 视频分段

### lesson8

1. 14:00 - 33:00 页面刷新后菜单路由匹配定位 路径为/main是定位到第一个菜单
2. 33:00 - 
