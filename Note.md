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

### form组件的数据绑定

### 各个模块数据的储存 & vuex模块内部请求方法的封装

* 按照菜单进行划分，分别在vuex中新建system-module、story-module、product-module、analysis-module，分别管理各自模块的数据，这样划分解构比较清晰，易于管理数据

* 由于请求接口地址的url存在公共部分，比如user/list、department/list、role/list等，所以可以对请求list的方法进行封装，传递不同的url，请求不同的列表数据

### vgri-table组件的封装

* 初步封装，简单抽取
* 针对每一列展现形式可能不同，有的列按钮展现形式，有的列tag展现，有的列文本展示等，对每一列的内容需要做不同的处理，使用插槽对需要处理的列的内容进行修改，需要注意对作用域插槽的使用以及动态绑定插槽名称

### 全局方法的注册添加(插件的使用场景)

1. 通过`app.component()`和`app.directive()`注册的一到多个全局组件或者自定义指令
2. 通过`app.provide()`使一个资源可被注入进整个应用
3. 向`app.config.globalProperties`中添加一些全局实例属性或方法，常用的比如时间格式化，价格格式化等
4. 一个可能上述三种都包含了的功能库(例如vue-router)

**app.config.globalProperties**：一个用于注册能够被应用内所有组件实例访问到的全局属性对象，在上面添加的属性与方法可在任意的组件模板上使用，详情见`global-registerProperties`函数

注：一般全局都会用到的方法，放在global文件夹里面，一般全局方法的定义都会以$符号开头，这是一种命名习惯

### 软件架构的分层思想

### table组件封装的数据管理

### 组件封装时的配置文件存放数据类型

* 一般静态配置可控的配置项可抽取到配置文件中
* 动态的数据，变化的不宜抽取到配置文件中

### 请求列表数据方法的封装

* 接口规范：例如/user/list /role/list /menu/list等，可通过传pageName，然后请求时，动态拼接url，或者用一个对象映射，将pageName与url进行一一对应
* 接口不规范：例如/user/qqq/list /role/www/list /menu/lll/list等，用一个对象映射，将pageName与url进行一一对应

### 表单数据双向绑定中重置不生效的原因

* v-model用于简单数据的双向绑定，例如只有一个name，message，对于引用值，不适合使用v-model，其本质只是一种语法糖
* 使用双向绑定：
```ts
// 点击重置按钮，修改formData的深层属性
const handleRestClick = () => {
  // formData.value = originFormData
  // 由于vgri-form对于传递过去的数据只是做了一层浅拷贝，所以修改深层的属性值，是可以监听到的
  for (const key of Object.keys(originFormData)) {
    formData.value[key] = originFormData[key]
  }
}
```
* 不使用双向绑定：由于双向绑定只是modelvalue与update:modelValue的语法糖，所以直接回归原始模式
```ts
// <!-- 通过model-value直接绑定page-search传递过来的值，当值发生改变的时候监听update:modelValue事件， -->
//  <el-input
//   :placeholder="item.placeholder"
//   :show-password="item.type === 'password' ? true : false"
//   v-bind="item.otherOptions"
//   :model-value="modelValue[`${item.filed}`]"
//   @update:modelValue="handleModelValueChange($event, item.filed)"
// />

const emits = defineEmits(['update:modelValue'])

// 发出事件，修改page-search组件中的formData的值
const handleModelValueChange = (value: any, field: string) => {
  emits('update:modelValue', { ...props.modelValue, [field]: value })
}

```

## 视频分段

### lesson8

1. 14:00 - 33:00 页面刷新后菜单路由匹配定位 路径为/main是定位到第一个菜单
2. 33:00 - 57:00 面包屑组件封装使用
3. 57:00 - 01:25:00 表单组件的双向数据绑定
4. 01:25:00 - 01:38:53 表单组件header footer添加 页面search部分单独抽离
5. 01:38:53 - 02:05:00 userList数据的获取，vuex中system模块划分以及请求userList数据
6. 02:05:00 - 02:27:00 userList数据渲染，vgri-tabel组件初步封装
7. 02:27:00 - 02:42:00 vgri-table组件封装根据不同列的展现显示不同添加插槽单独进行处理

### lesson09

1. 08:38 -  27:00 列表按钮样式调整 全局方法的添加 时间格式化函数
2. 20:00 - 44:00 列表序号列的显示与否 多选框列的显示与否与选择后列数据的获取与传递 操作列
3. 44:00 - 01:02:00 表格组件的header封装 与 footer封装
4. 01:02:00 - 01:20:45 table组件配置抽取 page-content组件封装 数据的抽取 (**多听几遍，有关组件分层，数据抽取的思想**)
5. 01:20:45 - 01:53:00 对于请求接口方法的封装以及拿到不同数据的处理方法
6. 01:53:00 - 02:04:39 vuex中代码优化 软件分层思想
7. 02:04:39 - 表单优化：formdata中属性应该动态控制 表单重置功能

### lesson10
1. 05:00 - 31:00 表单重置后不生效的两种解决办法
2. 31:00 - 53:00 搜索/重置功能 use-page-search的hooks封装
