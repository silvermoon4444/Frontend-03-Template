学习笔记
## Attribute 和 Property
### <input value ='cute'/> 
+ var inp= document.getElementByTagName('input')
+ inp.getAttribute('value') 获取的是标签上初始的默认值，inp.setAttribute设置的也是标签上初始的默认值，通过inp.value设置的值会显示在屏幕上实时更新
+ 转换JSX插件 @babel/plugin-transform-react-jsx
+ white-space: nowrap 【文本、inline-block、inline不换行】
+ 控制0≦n<4  n=n%4   
+ 浏览器一帧为16mss
## clientX、pageX、screenX、offsetX、X
+ **clientX、clientY**
+ + 点击位置距离当前body可视区域的x，y坐标

+  **pageX、pageY**
+ + 对于整个页面来说，包括了被卷去的body部分的长度

+ **screenX、screenY**
+ + 点击位置距离当前电脑屏幕的x，y坐标

+ **offsetX、offsetY**
+ + 相对于带有定位的父盒子的x，y坐标

+ **x、y**
+ + 和screenX、screenY一样