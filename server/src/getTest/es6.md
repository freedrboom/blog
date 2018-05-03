## let 和 const 命令
- 块级作用域：‘{}’内的区块
- 不存在变量提升
- 暂时性死区：如果区块中存在 let 和 const 命令,这个区块对这些命令必先声明后使用，否则报错，就算是用typeof也会报错
- 不允许重复声明

### let命令

```javascript
function bar(x = y, y = 2) {
return [x, y];
}
bar(); // 报错
```

### const ：常量
>notice:对于常量引用类型而言，只保证变量名所指向的地址不变，内容可变


### 全局对象的属性

let 命令、 const 命令、 class 命令声明的全局变量,不属于全局对象的属性。也就是说,从 ES6 开
始,全局变量将逐步与全局对象的属性脱钩

```javascript
var a = 1;
// 如果在 Node 的 REPL 环境,可以写成 global.a
// 或者采用通用方法,写成 this.a
window.a // 1
let b = 1;
window.b // undefined

```

## 变量的解构赋值

### 数组的解构赋值:按次序排列从数组中取值
#### 基本用法
- 可以从数组中提取值,按照对应位置,对变量赋值。
- 如果解构不成功，变量的值就等于undefined
- 如果等号的右边不是数组(或者严格地说,不是可遍历的结构),那么将会报错
- 对于 Set 结构,也可以使用数组的解构赋值`let [x, y, z] = new Set(["a", "b", "c"]);
x // "a"`
- 只要某种数据结构具有 Iterator 接口,都可以采用数组形式的解构赋值

```javascript
function* fibs() {
var a = 0;
var b = 1;
while (true) {
yield a;
[a, b] = [b, a + b];
}
}
var [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
```
#### 默认值

```JavaScript
var [foo = true] = [];
foo // true
[x, y = 'b'] = ['a']; // x='a', y='b'
[x, y = 'b'] = ['a', undefined]; // x='a', y='b'

var [x = 1] = [undefined];
x // 1
var [x = 1] = [null];
x // null
```
- 解构赋值允许指定默认值

- ES6 内部使用严格相等运算符( === ),判断一个位置是否有值

```javascript
//如果默认值是一个表达式,那么这个表达式是惰性求值的,即只有在用到的时候,才会求值

function f() {
console.log('aaa');
}
let [x = f()] = [1];
//因为 x 能取到值,所以函数 f 根本不会执行。上面的代码其实等价于下面的代码

let x;
if ([1][0] === undefined) {
x = f();
} else {
x = [1][0];
}
//默认值可以引用解构赋值的其他变量,但该变量必须已经声明。
let [x=1,y=x]=[];//x=1,y=1
let [x=1,y=x]=[2];//x=2,y=2
let [x=1,y=x]=[2,3];//x=2,y=3
let [x=y,y=1]=[];//referenceError因为 x 用到默认值 y 时, y 还没有声明
```

### 对象的解构赋值:
- 变量必须与属性同名,才能取到正确的值

```javascript
var { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
//简写形式
var {bar，foo}={foo:'aaa',bar:'bbb'}; //foo='aaa',bar='bbb'

```

- 如果变量名与属性名不一致就得写成这样

```javascript
// 对象的解构赋值的内部机制,是先找到同名属性,然后再赋给对应的变量。真正被赋值的是后者,而不是前者
var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```

- 变量的声明和赋值是一体的。对于 let 和 const 来说,变量不能重新声明,所以一旦赋值的变量以前声明
过,就会报错

```javascript
let foo;
let {foo} = {foo: 1}; // SyntaxError: Duplicate declaration "foo"
let baz;
let {bar: baz} = {bar: 1}; // SyntaxError: Duplicate declaration "baz"
// 用 let 和 const 命令时出现。如果没有第二个 let 命令,上面的代码就不会报错。
let foo;
({foo} = {foo: 1}); // 成功
let baz;
({bar: baz} = {bar: 1}); // 成功
```
- 对象的嵌套解构

```javascript
//只有 line 是变量, loc 和 start 都是模式,不会被赋值。
var node = {
loc: {
start: {
line: 1,
column: 5
}
}
};
var { loc: { start: { line }} } = node;
line // 1
loc // error: loc is undefined
start // error: start is undefined

// 报错
var {foo: {bar}} = {baz: 'baz'};
// 如果解构模式是嵌套的对象,而且子对象所在的父属性不存在,那么将会报错
```

- 指定默认值：默认值生效的条件是,对象的属性值严格等于 undefined

```javascript

var {x = 3} = {};
x // 3
var {x, y = 5} = {x: 1};
x // 1
y // 5
var { message: msg = "Something went wrong" } = {};
msg // "Something went wrong"

// 错误的写法
var x;
{x} = {x: 1};
// SyntaxError: syntax error
//因为 JavaScript 引擎会将 {x} 理解成一个代码块,从而发生语法错误。只有不将大括号写在行首,避免 JavaScript 将其解释为代码块
//将整个解构赋值语句,放在一个圆括号里面,就可以正确执行。关于圆括号与解构赋值的关系
// 正确的写法
({x} = {x: 1});

```
### 字符串的解构赋值：字符串被转换成了一个类似数组的对象

```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
//类似数组的对象都有一个 length 属性,因此还可以对这个属性解构赋值。
let {length : len} = 'hello';
len // 5
```

### 数值和布尔值的解构赋值

解构赋值的规则是,只要等号右边的值不是对象,就先将其转为对象。由于 undefined 和 null 无法转为对象,所以对它们
进行解构赋值,都会报错

```javascript
let {toString: s} = 123;
s === Number.prototype.toString // true
let {toString: s} = true;
s === Boolean.prototype.toString // true
//值和布尔值的包装对象都有 toString 属性,因此变量 s 都能取到值
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```
### 函数参数的解构赋值

```javascript
function move({x = 0, y = 0} = {}) {
return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

function move({x, y} = { x: 0, y: 0 }) {
return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]

[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]
```
### 元括号问题

一个式子到底是模式,还是表达式,没有办法从一开始就知道,必须解析到(或解析不到)等号才能知道；
只要有可能导致解构的歧义,就不得使用圆括号

#### 不能使用圆括号情况

```javascript
// 变量声明语句中，不能带圆括号
var [(a)]=[1];//error
var {x:(c)}={};//error
var ({x:c})={};//error
var {(x:c)}={};//error
var {(x):c}={};//error
var { o: ({ p: p }) } = { o: { p: 2 } };//error
//因为它们都是变量声明语句,模式不能使用圆括号

// 报错
function f([(z)]) { return z; }
//函数参数也属于变量声明,因此不能带有圆括号

// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
//赋值语句中,不能将整个模式,或嵌套模式中的一层,放在圆括号之中
// 报错
[({ p: a }), { x: c }] = [{}, {}];
```
#### 可以使用圆括号的情况：赋值语句的非模式部分

```javascript
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确

/*上面三行语句都可以正确执行,因为首先它们都是赋值语句,而不是声明语句;其次它们的圆括号都不属于模式的一部分。第
一行语句中,模式是取数组的第一个成员,跟圆括号无关;第二行语句中,模式是 p ,而不是 d ;第三行语句与第一行语句的性
质一致。
*/
```
### 用途
- 交换变量  ：`[x, y] = [y, x];`
- 从函数返回多个值

    ```javascript
      // 返回一个数组
      function example() {
      return [1, 2, 3];
      }
      var [a, b, c] = example();
      // 返回一个对象
      function example() {
      return {
      foo: 1,
      bar: 2
      };
      }
      var { foo, bar } = example();
    ```

- 函数参数的定义:将一组参数与变量名对应起来

```javascript
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);
// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

- 提取json数据

```javascript
var jsonData = {
id: 42,
status: "OK",
data: [867, 5309]
};
let { id, status, data: number } = jsonData;
console.log(id, status, number);
// 42, "OK", [867, 5309]
```

- 函数参数的默认值

```javascript
jQuery.ajax = function (url, {
async = true,
beforeSend = function () {},
cache = true,
complete = function () {},
crossDomain = false,
global = true,
// ... more config
}) {
// ... do stuff
};
//避免了在函数体内部再写 var foo = config.foo || 'default foo';
```

- 遍历Map结构

```javascript
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {
console.log(key + " is " + value);
}
// first is hello
// second is world

// 获取键名
for (let [key] of map) {
// ...
}
// 获取键值
for (let [,value] of map) {
// ...
}
```
### 输入模块的指定方法

`const { SourceMapConsumer, SourceNode } = require("source-map");`


## 字符串的扩展
### 字符的Unicode表示法：\uxxxx 形式表示一个字符,其中 “xxxx” 表示字符的码点
- `\u0000 —— \uFFFF`：\uxxxx
- `\uFFFF—— ～`：（"\uD842\uDFB7"）两个双字节的形式表达

### codePointAt()


### 扩展的字符串操作方法
- includes(str,start) :返回布尔值,表示是否找到了参数字符串
- startsWith(str,start) :返回布尔值,表示参数字符串是否在源字符串的头部
- endsWith(str,start) :返回布尔值,表示参数字符串是否在源字符串的尾部
- repeat():方法返回一个新字符串,表示将原字符串重复 n 次 -- 参数如果是小数,会被取整,参数是负数或者 Infinity ,会报错

### 模板字符串

模板字符串( template string )是增强版的字符串,用反引号标识。它可以当作普通字符串使用,也可以用来定义多行字符
串,或者在字符串中嵌入变量

模板字符串中嵌入变量,需要将变量名写在 ${} 之中，反引号需要转义，大括号内部可以放入任意的 JavaScript 表达式,可以进行运算,以及引用对象属性

  如果大括号中的值不是字符串,将按照一般的规则转为字符串。比如,大括号中是一个对象,将默认调用对象的 toString 方
  法

### 标签模板：紧跟在一个函数名后面,该函数将被调用来处理这个模板字符串

```javascript
function tag(stringArr, value1, value2){
// ...
}
// 等同于
function tag(stringArr, ...values){
// ...
}

var a = 5;
var b = 10;
tag`Hello ${ a + b } world ${ a * b }`;
/*
tag 函数的第一个参数是一个数组,该数组的成员是模板字符串中那些没有变量替换的部分,也就是说,变量替换只发生在
数组的第一个成员与第二个成员之间、第二个成员与第三个成员之间,以此类推

第一个参数: ['Hello ', ' world ', '']
第二个参数 : 15
第三个参数: 50
---> tag(['Hello ', ' world ', ''], 15, 50)
*/
```

- “ 标签模板 ” 的一个重要应用,就是过滤 HTML 字符串,防止用户输入恶意内容

### String.raw():模板字符串的处理函数,返回一个斜杠都被转义(即斜杠前面再加一个斜杠)的字符串

如果原字符串的斜杠已经转义,那么 String.raw 不会做任何处理

```javascript

String.raw`Hi\n${2+3}!`;
// "Hi\\n5!"
String.raw`Hi\u000A!`;
// 'Hi\\u000A!'

String.raw`Hi\\n`
// "Hi\\n"

String.raw = function (strings, ...values) {
var output = "";
for (var index = 0; index < values.length; index++) {
output += strings.raw[index] + values[index];
}
output += strings.raw[index]
return output;
}
```
## 正则的扩展

## 数组的扩展
- Array.from()
  类似数组的对象和可遍历的对象(包括 ES6新增的数据结构 Set 和 Map )转换为数组

```javascript
let arrayLike = {
'0': 'a',
'1': 'b',
'2': 'c',
length: 3
};
// ES5 的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6 的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

//常见的类似数组的对象是 DOM 操作返回的 NodeList 集合,以及函数内部的 arguments 对象

// NodeList 对象
let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
console.log(p);
});
// arguments 对象
function foo() {
var args = Array.from(arguments);
// ...
}

Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']
let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']

//字符串和 Set 结构都具有 Iterator 接口,因此可以被 Array.from 转为真正的数组

Array.from([1, 2, 3])
// [1, 2, 3]

//如果参数是一个真正的数组, Array.from 会返回一个一模一样的新数组。
//扩展运算符( ... )也可以将某些数据结构转为数组
// arguments 对象
function foo() {
var args = [...arguments];
}
// NodeList 对象
[...document.querySelectorAll('div')]
```

扩展运算符背后调用的是遍历器接口( Symbol.iterator ),如果一个对象没有部署这个接口,就无法转
换。 Array.from 方法则是还支持类似数组的对象。所谓类似数组的对象,本质特征只有一点,即必须有 length 属性。因
此,任何有 length 属性的对象,都可以通过 Array.from 方法转为数组,而此时扩展运算符就无法转换

```javascript
Array.from({ length: 3 });
// [ undefined, undefined, undefinded ]
//Array.from 返回了一个具有三个成员的数组。扩展运算符转换不了这个对象

//对于还没有部署该方法的浏览器,可以用 Array.prototype.slice 方法替代。

```

 Array.from 还可以接受第二个参数,作用类似于数组的 map 方法,用来对每个元素进行处理,将处理后的值放入返回的数组。

 ```javascript
 Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);
Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]

Array.from([1, , 2, , 3], (n) => n || 0)
// [1, 0, 2, 0, 3]

function typesOf () {
return Array.from(arguments, value => typeof value)
}
typesOf(null, [], NaN)
// ['object', 'object', 'number']

Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']
```

- Array.of():将一组值,转换为数组,弥补数组构造函数 Array() 的不足。因为参数个数的不同,会导致 Array() 的行为有差异

```javascript
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```


- Array.prototype.copyWithin(target, start = 0, end = this.length)

在当前数组内部,将指定位置的成员复制到其他位置(会覆盖原有成员),然后返回当前数
组。也就是说,使用这个方法,会修改当前数组。

  1. target (必需):从该位置开始替换数据。
  2. start (可选):从该位置开始读取数据,默认为 0 。如果为负值,表示倒数。
  3. end (可选):到该位置前停止读取数据,默认等于数组长度。如果为负值,表示倒数

  ```javascript

  // 将 3 号位复制到 0 号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]
// -2 相当于 3 号位, -1 相当于 4 号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]
// 将 3 号位复制到 0 号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}
// 将 2 号位到数组结束,复制到 0 号位
var i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]
// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```
- Array.find()和Array.findIndex()

数组实例的 find 方法,用于找出第一个符合条件的数组成员。它的参数是一个回调函数,所有数组成员依次执行该回调函
数,直到找出第一个返回值为 true 的成员,然后返回该成员。如果没有符合条件的成员,则返回 undefined

数组实例的 findIndex 方法的用法与 find 方法非常类似,返回第一个符合条件的数组成员的位置,如果所有成员都不符合
条件,则返回 -1 。

这两个方法都可以接受第二个参数,用来绑定回调函数的 this 对象。
另外,这两个方法都可以发现 NaN ,弥补了数组的 IndexOf 方法的不足

```javascript
[1, 5, 10, 15].find(function(value, index, arr) {
return value > 9;
}) // 10

[NaN].indexOf(NaN)
// -1
[NaN].findIndex(y => Object.is(NaN, y))
```

- Array.fill(value,[start],[end]):使用给定值,填充一个数组

```javascript
['a', 'b', 'c'].fill(7)
// [7, 7, 7]
new Array(3).fill(7)
// [7, 7, 7]
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']

```

- Array.entries()、Array.keys()、Array.values()

keys() 是对键名的遍历、 values() 是对键值的遍
历, entries() 是对键值对的遍历

```javascript
for (let index of ['a', 'b'].keys()) {
console.log(index);
}
// 0
// 1
for (let elem of ['a', 'b'].values()) {
console.log(elem);
}
// 'a'
// 'b'
for (let [index, elem] of ['a', 'b'].entries()) {
console.log(index, elem);
}
// 0 "a"
// 1 "b"

//可以手动调用遍历器对象的 next 方法
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']

```

- Array.includes():返回一个布尔值,表示某个数组是否包含给定的值

```javascript
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true
```


- 数组的空位

数组的空位指,数组的某一个位置没有任何值。比如, Array 构造函数返回的数组都是空位。

ES5 对空位的处理,已经很不一致了,大多数情况下会忽略空位。
forEach() , filter() , every() 和 some() 都会跳过空位。
map() 会跳过空位,但会保留这个值
join() 和 toString() 会将空位视为 undefined ,而 undefined 和 null 会被处理成空字符串。

ES6 则是明确将空位转为 undefined

Array.from 方法会将数组的空位,转为 undefined ,也就是说,这个方法不会忽略空位
扩展运算符( ... )也会将空位转为 undefined
copyWithin() 会连空位一起拷贝
fill() 会将空位视为正常的数组位置
entries() 、 keys() 、 values() 、 find() 和 findIndex() 会将空位处理成 undefined


## 函数的扩展
### 函数参数的默认值
#### 基本用法
- 参数变量是默认声明的,所以不能用 let 或 const 再次声明
```javascript
function foo(x = 5) {
let x = 1; // error
const x = 2; // error
}
```

#### 与解构默认值结合使用
```javascript
// 写法一
function m1({x = 0, y = 0} = {}) {
return [x, y];
}
// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
return [x, y];
}


// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]
// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]
// x 有值, y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]
// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]
m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]

```
#### 参数默认值的位置：尾参数默认值才能正常被获取到

```javascript
// 例二
function f(x, y = 5, z) {
return [x, y, z];
}
f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]
/*
有默认值的参数都不是尾参数。这时,无法只省略该参数,而不省略它后面的参数,除非显式输
入 undefined 。
如果传入 undefined ,将触发该参数等于默认值, null 则没有这个效果
*/

function foo(x = 5, y = 6) {
console.log(x, y);
}
foo(undefined, null)
// 5 null
```
#### 函数的length:该函数预期传入的参数个数

函数的 length 属性,将返回没有指定默认值的参数个数。也就是说,指定了默认值后, length 属性将失真

```javascript
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
//rest 参数也不会计入 length 属性
(function(...args) {}).length // 0
//如果设置了默认值的参数不是尾参数,那么 length 属性也不再计入后面的参数了
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1

```

#### 作用域


```javascript
//如果参数默认值是一个变量,则该变量所处的作用域,与其他变量的作用域规则是一样
var x = 1;
function f(x, y = x) {
console.log(y);
}
f(2) // 2
//如果调用时,函数作用域内部的变量 x 没有生成,结果就会不一样
let x = 1;
function f(y = x) {
let x = 2;
console.log(y);
}
f() // 1

//如果此时,全局变量 x 不存在,就会报错
function f(y = x) {
let x = 2;
console.log(y);
}
f() // ReferenceError: x is not defined

//如果函数 A 的参数默认值是函数 B ,由于函数的作用域是其声明时所在的作用域,那么函数 B 的作用域不是函数 A ,而是全局作用域
let foo = 'outer';
function bar(func = x => foo) {
let foo = 'inner';
console.log(func()); // outer
}
bar();
//等同于
let foo = 'outer';
let f = x => foo;
function bar(func = f) {
let foo = 'inner';
console.log(func()); // outer
}
bar();
//如果写成下面这样,就会报错。
function bar(func = () => foo) {
let foo = 'inner';
console.log(func());
}
bar() // ReferenceError: foo is not defined
```
### 应用：利用参数默认值,可以指定某一个参数不得省略,如果省略就抛出一个错误

```javascript
function throwIfMissing() {
throw new Error('Missing parameter');
}
function foo(mustBeProvided = throwIfMissing()) {
return mustBeProvided;
}
foo()
// Error: Missing parameter

//另外,可以将参数默认值设为 undefined ,表明这个参数是可以省略的。
function foo(optional = undefined) { ··· }
```
### reset参数：(形式为 “... 变量名 ”)用于获取函数的多余参数

```javascript
function add(...values) {
let sum = 0;
for (var val of values) {
sum += val;
}
return sum;
}
add(2, 5, 3) // 10


function push(array, ...items) {
items.forEach(function(item) {
array.push(item);
console.log(item);
});
}
var a = [];
push(a, 1, 2, 3)
```
### 扩展运算符：好比 rest 参数的逆运算,将一个数组转为用逗号分隔的参数序列

```javascript
function f(v, w, x, y, z) { }
var args = [0, 1];
f(-1, ...args, 2, ...[3]);

//替代数组的 apply 方法,扩展运算符可以展开数组,所以不再需要 apply 方法,将数组转为函数的参数
// ES5 的写法
function f(x, y, z) {
// ...
}
var args = [0, 1, 2];
f.apply(null, args);
// ES6 的写法
function f(x, y, z) {
// ...
}
var args = [0, 1, 2];
f(...args);
```
#### 扩展运算符的应用
- 合并数组
- 与解构赋值结合
- 函数的返回值
- 字符串：将字符串转为真正的数组`[...'hello']`
- 实现了 Iterator 接口的对象：任何 Iterator 接口的对象,都可以用扩展运算符转为真正的数组
- Map 和 Set 结构, Generator 函数
```javascript
//扩展运算符内部调用的是数据结构的 Iterator 接口,因此只要具有 Iterator 接口的对象,都可以使用扩展运算符
let map = new Map([
[1, 'one'],
[2, 'two'],
[3, 'three'],
]);
let arr = [...map.keys()]; // [1, 2, 3]

//Generator 函数运行后,返回一个遍历器对象,因此也可以使用扩展运算符
var go = function*(){
yield 1;
yield 2;
yield 3;
};
[...go()] // [1, 2, 3]

//如果对没有 iterator 接口的对象,使用扩展运算符,将会报错
var obj = {a: 1, b: 2};
let arr = [...obj]; // TypeError: Cannot spread non-iterable object

```

#### name属性

将一个匿名函数赋值给一个变量, ES5 的 name 属性,会返回空
字符串,而 ES6 的 name 属性会返回实际的函数名

如果将一个具名函数赋值给一个变量,则 ES5 和 ES6 的 name 属性都返回这个具名函数原本的名字

Function 构造函数返回的函数实例, name 属性的值为 “anonymous” 。

bind 返回的函数, name 属性值会加上 “bound ” 前缀
```javascript
var func1 = function () {};
// ES5
func1.name // ""
// ES6
func1.name // "func1"

const bar = function baz() {};
// ES5
bar.name // "baz"
// ES6
bar.name // "baz"

(new Function).name // "anonymous"

function foo() {};
foo.bind({}).name // "bound foo"
(function(){}).bind({}).name // "bound "
```

### 箭头函数
- 箭头函数不需要参数或需要多个参数,就使用一个圆括号代表参数部分
- 如果箭头函数的代码块部分多于一条语句,就要使用大括号将它们括起来,并且使用 return 语句返回
- 所以如果箭头函数直接返回一个对象,必须在对象外面加上括号

#### 使用的注意点
1. 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
2. 不可以当做构造函数（不能new 否则会抛出异常）
3. 没有arguments对象，可以用Rest参数代替
4. 不能使用yield命令，所以箭头函数不能用作Generator

### 函数绑定：并排的两个双冒号( :: ),双冒号左边是一个对象,右边是一个函数

```javascript
foo::bar;
// 等同于
bar.bind(foo);
foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
return obj::hasOwnProperty(key);
}
//如果双冒号左边为空,右边是一个对象的方法,则等于将该方法绑定在该对象上面
var method = obj::obj.foo;
// 等同于
var method = ::obj.foo;
let log = ::console.log;
// 等同于
var log = console.log.bind(console);

//由于双冒号运算符返回的还是原对象,因此可以采用链式写法
// 例一
import { map, takeWhile, forEach } from "iterlib";
getPlayers()
::map(x => x.character())
::takeWhile(x => x.strength > 100)
::forEach(x => console.log(x));
// 例二
let { find, html } = jake;
document.querySelectorAll("div.myClass")
::find("p")
::html("hahaha");
```
### 尾调用：指某个函数的最后一步是调用另一个函数
#### 尾调用优化

尾调用由于是函数的最后一步操作,所以不需要保留外层函数的调用帧,因为调用位置、内部变量等信息都不会再用到了,只
要直接用内层函数的调用帧,取代外层函数的调用帧就可以了

```javascript

function f() {
let m = 1;
let n = 2;
return g(m + n);
}
f();
// 等同于
function f() {
return g(3);
}
f();
// 等同于
g(3);

//非尾调用优化
function addOne(a){
var one = 1;
function inner(b){
return b + one;
}
return inner(a);
}
```
#### 尾递归：尾调用自身

对于尾递归来说,由于只存在一个调用帧,所以永远不会发生 “ 栈溢出 ” 错误

```javascript
//非尾递归，复杂度 O(n)
function factorial(n) {
if (n === 1) return 1;
return n * factorial(n - 1);
}
factorial(5) // 120

//尾递归，复杂度 O(1)

function factorial(n, total) {
if (n === 1) return total;
return factorial(n - 1, n * total);
}
factorial(5, 1) // 120
```

####　递归函数的改写

尾递归的实现,往往需要改写递归函数,确保最后一步只调用自身。做到这一点的方法,就是把所有用到的内部变量改写成函
数的参数

```javascript

//方法一是在尾递归函数之外,再提供一个正常形式的函数
function tailFactorial(n, total) {
if (n === 1) return total;
return tailFactorial(n - 1, n * total);
}
function factorial(n) {
return tailFactorial(n, 1);
}
factorial(5) // 120

//方法二柯里化( currying ),意思是将多参数的函数转换成单参数的形式
function currying(fn, n) {
return function (m) {
return fn.call(this, m, n);
};
}
function tailFactorial(n, total) {
if (n === 1) return total;
return tailFactorial(n - 1, n * total);
}
const factorial = currying(tailFactorial, 1);
factorial(5) // 120

//方法三　采用 ES6 的函数默认值
function factorial(n, total = 1) {
if (n === 1) return total;
return factorial(n - 1, n * total);
}
factorial(5) // 120


```

#### 严格模式

ES6 的尾调用优化只在严格模式下开启,正常模式是无效的
这是因为在正常模式下,函数内部有两个变量,可以跟踪函数的调用栈。
func.arguments :返回调用时函数的参数。
func.caller :返回调用当前函数的那个函数。
尾调用优化发生时,函数的调用栈会改写,因此上面两个变量就会失真。严格模式禁用这两个变量,所以尾调用模式仅在严格
模式下生效。

```javascript
function restricted() {
"use strict";
restricted.caller;
// 报错
restricted.arguments; // 报错
}
restricted();
```

#### 尾递归优化的实现：“ 循环 ” 换掉 “ 递归 ”

```javascript
//蹦床函数( trampoline )可以将递归执行转为循环执行
function trampoline(f) {
while (f && f instanceof Function) {
f = f();
}
return f;
}
/*
上面就是蹦床函数的一个实现,它接受一个函数 f 作为参数。只要 f 执行后返回一个函数,就继续执行。注意,这里是返
回一个函数,然后执行该函数,而不是函数里面调用函数,这样就避免了递归执行,从而就消除了调用栈过大的问题。
然后,要做的就是将原来的递归函数,改写为每一步返回另一个函数
*/
function sum(x, y) {
if (y > 0) {
return sum.bind(null, x + 1, y - 1);
} else {
return x;
}
}

trampoline(sum(1, 100000))
//蹦床函数并不是真正的尾递归优化,下面的实现才是

function tco(f) {
var value;
var active = false;
var accumulated = [];
return function accumulator() {
accumulated.push(arguments);
if (!active) {
active = true;
while (accumulated.length) {
value = f.apply(this, accumulated.shift());
}
active = false;
return value;
}
};
}
var sum = tco(function(x, y) {
if (y > 0) {
return sum(x + 1, y - 1)
}
else {
return x
}
});
sum(1, 100000)
// 100001

/*
上面代码中, tco 函数是尾递归优化的实现,它的奥妙就在于状态变量 active 。默认情况下,这个变量是不激活的。一旦
进入尾递归优化的过程,这个变量就激活了。然后,每一轮递归 sum 返回的都是 undefined ,所以就避免了递归执行;
而 accumulated 数组存放每一轮 sum 执行的参数,总是有值的,这就保证了 accumulator 函数内部的 while 循环总是会
执行。这样就很巧妙地将 “ 递归 ” 改成了 “ 循环 ” ,而后一轮的参数会取代前一轮的参数,保证了调用栈只有一层。
*/
```

#### 函数参数的尾逗号：ES7 有一个提案,允许函数的最后一个参数有尾逗号( trailing comma )


## 对象的扩展
### 属性的简洁表示：可直接写入和函数，作为对象的属性和方法

```javascript
var foo = 'bar';
var baz = {foo};
baz // {foo: "bar"}
// 等同于
var baz = {foo: foo};
//只写属性名,不写属性值。这时,属性值等于属性名所代表的变量

function f(x, y) {
return {x, y};
}
// 等同于
function f(x, y) {
return {x: x, y: y};
}
f(1, 2) // Object {x: 1, y: 2}
//方法也可以简写
var o = {
method() {
return "Hello!";
}
};
// 等同于
var o = {
method: function() {
return "Hello!";
}
};

var birth = '2000/01/01';
var Person = {
name: ' 张三 ',
// 等同于 birth: birth
birth,
// 等同于 hello: function ()...
hello() { console.log(' 我的名字是 ', this.name); }
};

//这种写法用于函数的返回值,将会非常方便
function getPoint() {
var x = 1;
var y = 10;
return {x, y};
}
getPoint()
// {x:1, y:10}

//CommonJS 模块输出变量,就非常合适使用简洁写法
var ms = {};
function getItem (key) {
return key in ms ? ms[key] : null;
}
function setItem (key, value) {
ms[key] = value;
}
function clear () {
ms = {};
}
module.exports = { getItem, setItem, clear };
// 等同于
module.exports = {
getItem: getItem,
setItem: setItem,
clear: clear
};

//属性的赋值器( setter )和取值器( getter ),事实上也是采用这种写法

var cart = {
_wheels: 4,
get wheels () {
return this._wheels;
},
set wheels (value) {
if (value < this._wheels) {
throw new Error(' 数值太小了! ');
}
this._wheels = value;
}
}

//注意,简洁写法的属性名总是字符串,这会导致一些看上去比较奇怪的结果
var obj = {
class () {}
};
// 等同于
var obj = {
'class': function() {}
};
//class 是字符串,所以不会因为它属于关键字,而导致语法解析报错

//如果某个方法的值是一个 Generator 函数,前面需要加上星号
var obj = {
* m(){
yield 'hello world';
}
};

```
### 属性名表达式：ES6 允许字面量定义对象时,用方法二(表达式)作为对象的属性名,即把表达式放在方括号内
```javascript
var lastWord = 'last word';
var a = {
'first word': 'hello',
[lastWord]: 'world'
};
a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"

//表达式还可以用于定义方法名。
let obj = {
['h'+'ello']() {
return 'hi';
}
};
obj.hello() // hi

//注意,属性名表达式与简洁表示法,不能同时使用,会报错。
// 报错
var foo = 'bar';
var bar = 'abc';
var baz = { [foo] };
// 正确
var foo = 'bar';
var baz = { [foo]: 'abc'};
```
### 方法的name属性：函数的 name 属性,返回函数名。对象方法也是函数,因此也有 name 属性

```javascript

var person = {
sayName() {
console.log(this.name);
},
get firstName() {
return "Nicholas";
}
};
person.sayName.name // "sayName"
person.firstName.name // "get firstName"

//有两种特殊情况: bind 方法创造的函数, name 属性返回 “bound” 加上原函数的名字; Function 构造函数创造的函数, name 属性返回 “anonymous” 。
(new Function()).name // "anonymous"
var doSomething = function() {
// ...
};
doSomething.bind().name // "bound doSomething"


//如果对象的方法是一个 Symbol 值,那么 name 属性返回的是这个 Symbol 值的描述。
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
[key1]() {},
[key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // ""
```
### Object.is()
### Object.assign():将源对象( source )的所有可枚举属性,复制到目标对象( target )
```javascript
var target = { a: 1, b: 1 };
var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
//如果目标对象与源对象有同名属性,或多个源对象有同名属性,则后面的属性会覆盖前面的属性
//如果只有一个参数, Object.assign 会直接返回该参数
var obj = {a: 1};
Object.assign(obj) === obj // true


//如果该参数不是对象,则会先转成对象,然后返回。
typeof Object.assign(2) // "object"

//由于 undefined 和 null 无法转成对象,所以如果它们作为参数,就会报错
Object.assign(undefined) // 报错
Object.assign(null) // 报错

/*
如果非对象参数出现在源对象的位置(即非首参数),那么处理规则有所不同。首先,这些参数都会转成对象,如果无法转成
对象,就会跳过。这意味着,如果 undefined 和 null 不在首参数,就不会报错
*/

let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true

/*
其他类型的值(即数值、字符串和布尔值)不在首参数,也不会报错。但是,除了字符串会以数组形式,拷贝入目标对象,其
他值都不会产生效果.因为只有字符串的包装对象,会产生可枚举属性
*/

var v1 = 'abc';
var v2 = true;
var v3 = 10;
var obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }


//Object.assign 拷贝的属性是有限制的,只拷贝源对象的自身属性(不拷贝继承属性),也不拷贝不可枚举的属性
Object.assign({b: 'c'},
Object.defineProperty({}, 'invisible', {
enumerable: false,
value: 'hello'
})
)
// { b: 'c' }

//属性名为 Symbol 值的属性,也会被 Object.assign 拷贝
Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
// { a: 'b', Symbol(c): 'd' }

```
### 注意点
1. Object.assign 方法实行的是浅拷贝,如果源对象某个属性的值是对象,那么目标对象拷贝得到
的是这个对象的引用
2. 对于这种嵌套的对象,一旦遇到同名属性, Object.assign 的处理方法是替换
3. Object.assign 可以用来处理数组,但是会把数组视为对象`Object.assign([1, 2, 3], [4, 5]);// [4, 5, 3]`

### Object.assign常见用途
```javascript
//( 1 )为对象添加属性
class Point {
constructor(x, y) {
Object.assign(this, {x, y});
}
}

//( 2 )为对象添加方法
Object.assign(SomeClass.prototype, {
someMethod(arg1, arg2) {
···
},
anotherMethod() {
···
}
});
// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
···
};
SomeClass.prototype.anotherMethod = function () {
···
};

//( 3 )克隆对象
function clone(origin) {
return Object.assign({}, origin);
}

//只能克隆原始对象自身的值,不能克隆它继承的值,如果想要保持继承链,可以采用下面的代码
function clone(origin) {
let originProto = Object.getPrototypeOf(origin);
return Object.assign(Object.create(originProto), origin);
}

//( 4 )合并多个对象
const merge =
(target, ...sources) => Object.assign(target, ...sources);
//返回一个新的对象
const merge =
(...sources) => Object.assign({}, ...sources);


//( 5 )为属性指定默认值
const DEFAULTS = {
logLevel: 0,
outputFormat: 'html'
};
function processContent(options) {
let options = Object.assign({}, DEFAULTS, options);
}

```

### 属性的可枚举性：对象的每个属性都有一个描述对象( Descriptor ),用来控制该属性的行为。 Object.getOwnPropertyDescriptor 方法可以获取该属性的描述对象
```javascript
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
// { value: 123,
//writable: true,
//enumerable: true,
//configurable: true }
/*
S5 有三个操作会忽略 enumerable 为 false 的属性。
1. for...in 循环:只遍历对象自身的和继承的可枚举的属性
2. Object.keys() :返回对象自身的所有可枚举的属性的键名
3. JSON.stringify() :只串行化对象自身的可枚举的属性
ES6 新增了两个操作,会忽略 enumerable 为 false 的属性。
1. Object.assign() :只拷贝对象自身的可枚举的属性
2. Reflect.enumerate() :返回所有 for...in 循环会遍历的属性
另外, ES6 规定,所有 Class 的原型的方法都是不可枚举的
*/
Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
// false
Object.getOwnPropertyDescriptor([], 'length').enumerable
// false
Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
// false
```

### 属性的遍历：ES6 一共有 6 种方法可以遍历对象的属性
1. for...in　--> for...in 循环遍历对象自身的和继承的可枚举属性(不含 Symbol 属性)。
2. Object.keys(obj) --> Object.keys 返回一个数组,包括对象自身的(不含继承的)所有可枚举属性(不含 Symbol 属性)。
3. Object.getOwnPropertyNames(obj) --> Object.getOwnPropertyNames 返回一个数组,包含对象自身的所有属性(不含 Symbol 属性,但是包括不可枚举属性)。
4. Object.getOwnPropertySymbols(obj) --> Object.getOwnPropertySymbols 返回一个数组,包含对象自身的所有 Symbol 属性。
5. Reflect.ownKeys(obj) --> Reflect.ownKeys 返回一个数组,包含对象自身的所有属性,不管是属性名是 Symbol 或字符串,也不管是否可枚举。
6. Reflect.enumerate(obj) --> Reflect.enumerate 返回一个 Iterator 对象,遍历对象自身的和继承的所有可枚举属性(不含 Symbol 属性),与 for...in 循
环相同。


以上的 6 种方法遍历对象的属性,都遵守同样的属性遍历的次序规则。
1. 首先遍历所有属性名为数值的属性,按照数字排序。
2. 其次遍历所有属性名为字符串的属性,按照生成时间排序。
3. 最后遍历所有属性名为 Symbol 值的属性,按照生成时间排序。
```javascript
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
```
### __proto__ 属性、Object.setPrototypeOf() , Object.getPrototypeOf()

### Object.values() , Object.entries() , Object.keys()
1. Object.keys 方法,返回一个数组,成员是参数对象自身的(不含继承的)所有可遍历( enumerable )属性的键名
2. Object.values 方法返回一个数组,成员是参数对象自身的(不含继承的)所有可遍历( enumerable )属性的键值
3. Object.entries 方法返回一个数组,成员是参数对象自身的(不含继承的)所有可遍历( enumerable )属性的键值对数组

### 对象的扩展运算符
#### Rest 解构赋值
```javascript
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }

/*
对象的 Rest 解构赋值用于从一个对象取值,相当于将所有可遍历的、但尚未被读取的属性,分配到指定的对象上面。所有的键
和它们的值,都会拷贝到新对象上面
*/

//Rest 解构赋值的一个用处,是扩展某个函数的参数,引入其他操作
function baseFunction({ a, b }) {
// ...
}
function wrapperFunction({ x, y, ...restConfig }) {
// 使用 x 和 y 参数进行操作
// 其余参数传给原始函数
return baseFunction(restConfig);
}
```

#### 扩展运算符:扩展运算符( ... )用于取出参数对象的所有可遍历属性,拷贝到当前对象之中
```javascript
let aWithOverrides = { ...a, x: 1, y: 2 };
// 等同于
let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
// 等同于
let x = 1, y = 2, aWithOverrides = { ...a, x, y };
// 等同于
let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });


//如果把自定义属性放在扩展运算符前面,就变成了设置新对象的默认属性值
et aWithDefaults = { x: 1, y: 2, ...a };
// 等同于
let aWithDefaults = Object.assign({}, { x: 1, y: 2 }, a);
// 等同于
let aWithDefaults = Object.assign({ x: 1, y: 2 }, a);


//扩展运算符的参数对象之中,如果有取值函数 get ,这个函数是会执行的
// 并不会抛出错误,因为 x 属性只是被定义,但没执行
let aWithXGetter = {
...a,
get x() {
throws new Error('not thrown yet');
}
};
// 会抛出错误,因为 x 属性被执行了
let runtimeError = {
...a,
...{
get x() {
throws new Error('thrown now');
}
}
};

//如果扩展运算符的参数是 null 或 undefined ,这个两个值会被忽略,不会报错
let emptyObject = { ...null, ...undefined }; // 不报错
```
### Object.getOwnPropertyDescriptors()

ES5 有一个 Object.getOwnPropertyDescriptor 方法,返回某个对象属性的描述对象( descriptor )。

ES7 有一个提案,提出了 Object.getOwnPropertyDescriptors 方法,返回指定对象所有自身属性(非继承属性)的描述对
象。主要是为了解决 Object.assign() 无法正确拷贝 get 属性和 set 属性的问题

## symbol：ES6 引入了一种新的原始数据类型 Symbol ,表示独一无二的值

## proxy和reflect

## 二进制数值

## Set和Map数据结构
### Set
#### 基本用法
- Set 函数可以接受一个数组(或类似数组的对象)作为参数,用来初始
- 它类似于精确相等运算符( === ),主要的区别是 NaN 等于自身,另外,两个对象总是不相等的
#### Set实例的属性和方法
- Set 结构的实例有以下属性。
  1. Set.prototype.constructor :构造函数,默认就是 Set 函数。
  2. Set.prototype.size :返回 Set 实例的成员总数。
- Set 实例的方法分为两大类:操作方法(用于操作数据)和遍历方法(用于遍历成员)。下面先介绍四个操作方法。
  1. add(value) :添加某个值,返回 Set 结构本身。
  2. delete(value) :删除某个值,返回一个布尔值,表示删除是否成功。
  3. has(value) :返回一个布尔值,表示该值是否为 Set 的成员。
  4. clear() :清除所有成员,没有返回值
- 遍历操作
  1. keys() :返回一个键名的遍历器
  2. values() :返回一个键值的遍历器
  3. entries() :返回一个键值对的遍历器
  4. forEach() :使用回调函数遍历每个成员

### WeakSet：WeakSet 的成员只能是对象,而不能是其他类型的值

其次, WeakSet 中的对象都是弱引用,即垃圾回收机制不考虑 WeakSet 对该对象的引用,也就是说,如果其他对象都不再引用该
对象,那么垃圾回收机制会自动回收该对象所占用的内存,不考虑该对象还存在于 WeakSet 之中。这个特点意味着,无法引用
WeakSet 的成员,因此 WeakSet 是不可遍历的

WeakSet 结构有以下三个方法。
  - WeakSet.prototype.add(value) :向 WeakSet 实例添加一个新成员。
  - WeakSet.prototype.delete(value) :清除 WeakSet 实例的指定成员。
  - WeakSet.prototype.has(value) :返回一个布尔值,表示某个值是否在 WeakSet 实例之中


### Map：类似于对象,也是键值对的集合,但是 “ 键 ” 的范围不限于字符串,各种类型的值(包括对象)都可以当作键
#### 属性和方法
- size 属性
- set(key, value)：返回整个 Map 结构。如果 key 已经有值,则键值会被更新,否则就新生成该键
- get(key)：get 方法读取 key 对应的键值,如果找不到 key ,返回 undefined
- has(key)：返回一个布尔值,表示某个键是否在 Map 数据结构中
- delete(key)：delete 方法删除某个键,返回 true 。如果删除失败,返回 false
- clear()：clear 方法清除所有成员,没有返回值
#### 遍历方法
- keys() :返回键名的遍历器。
- values() :返回键值的遍历器。
- entries() :返回所有成员的遍历器。
- forEach() :遍历 Map 的所有成员。
### WeakMap
## Iterator和for...of循环
