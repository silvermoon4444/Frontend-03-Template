学习笔记

### css2总体结构
+ css grammar@charset
+ @import
+ rule
  + @media
  + @page
  + rule
## css Rules
### @rules
**@counter-style**

在li中使用 设置**list-style**的属性
``` 
 @counter-style circled-alpha {
  system: fixed;
  symbols: Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ Ⓖ Ⓗ Ⓘ Ⓙ Ⓚ Ⓛ Ⓜ Ⓝ Ⓞ Ⓟ Ⓠ Ⓡ Ⓢ Ⓣ Ⓤ Ⓥ Ⓦ Ⓧ Ⓨ Ⓩ;
  suffix: " ";
}
 .items {
   list-style: circled-alpha;
}
```
### 定义动画
**@keyframes** ★
```
@keyframes mymove
{
  from {top:0px;}
  to {top:200px;}
}

div
{
  width:100px;
  height:100px;
  background:red;
  position:relative;
  animation:mymove 5s infinite;
}
```

@**supports**
检查css兼容性,自己本身存在兼容性问题，不建议使用
### 待补全
#### 常用
**@charset** 
**@import**
**@media**  ★
**@page**
**@font-face**  ★
#### 不常用
**@namesapce** 

## CSS规则

###  自定义变量
+ --名字
+ var(名字)
  
```
:root {
        --cc: calc(16px*5)
    }

    h1~div {
        font-size: var(--cc);
    }

```
### 函数
+ calc(16px*5) 计算


## 简单选择器
+ div svg(命名空间)|a    【svg|MathML】  ❓
### 属性选择器
选择器[attr]
选择器[attr=val]  属性的值**正好**是val
选择器[attr~=val] 属性中**有val一个**值
选择器[attr|=val] 属性中的值**以val开头**，接着**以-衔接**之后的值,只有**第一个属性符合**才生效
### :hover 伪类选择器
元素的一种状态
### ::before 伪元素选择器 [单冒号开头也会生效]
元素的一种状态
## 复合选择器
+ ~ 随后的**所有**兄弟节点
  ```
  h1~div{
    font-size:20px
  }
    <h1>h1</h1>
    <div class="son son2">son</div>   ⭐
    <div class="son son2">son</div>   ⭐
  ```
  + \+ **下一个**兄弟节点
  ```
    h1~div{
    font-size:20px
  }
    <div class="son son2">son</div>   
    <h1>h1</h1>
    <div class="son son2">son</div>   ⭐
    <div class="son son2">son</div>   
  ```
  + || **css4**  操作表格中的某一个列
## 选择器权重
+ important[style,id,class|属性|伪类,标签|伪元素]通配符
+ :not(.a)[0,0,1,0] :not(.a)[0,1,0,0] :not()**本身不计算权重**，但写在它**里面的选择器**要计算权重 ⭐
## 伪类 
### 链接/动作
+ :any-link **所有状态**的a标签 [:link+:visited]  放最后面
#### :target
根据当前页面链接的hash值显示相应样式
+ http://www.example.com/index.html#**h1**
```
  h1:target{
        display: block;
        color: blue;
    }
  <h1 id='h1'>h1</h1>   ⭐
  <div class="son son2" id="s">1</div>
```
### 树结构
+ :empty       
  + p:empty 指定**空的(包括文本)**p元素的样式
+ :only-child
```
    p:only-child
{
    background:#ff0000;
}

    <div>
        <p>This is a paragraph.</p> ⭐
    </div>

    <div>
      <span>This is a span.</span>
      <p>This is a paragraph.</p>
    </div>
```

### 伪元素
#### 子元素为标签时依然生效 且只能用在块级元素下
+ first-line 选中子元素文本第一行
+ first-letter 选中子元素文本第一个字母

## css规则
### 基本函数
calc(1px*2) 
min()
max()
clamp(1px,2px) 值只能是[1px,2px] 这个范围内的值 超出最大取最大，超出最小取最小
### 选择器 Selector
#### 连接符
+ >
+ <space>
+ +
+ -
#### simple selector

+ type
+ *
+ .
+ #
+ []
+ : 伪类
+ :: 伪元素
+ :not(选择器)
### css标准爬取
+ contentdocument ifame的document,同域时返回document否则返回null
