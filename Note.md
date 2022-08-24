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
 