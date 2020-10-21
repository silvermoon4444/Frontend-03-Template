学习笔记
## Attribute 和 Property
### <input value ='cute'/> 
+ var inp= document.getElementByTagName('input')
+ inp.getAttribute('value') 获取的是标签上初始的默认值，inp.setAttribute设置的也是标签上初始的默认值，通过inp.value设置的值会显示在屏幕上实时更新