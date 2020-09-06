学习笔记
## block box（里外都有bfc） 且 overflow:visible 有两个现象
+ bfc合并与float
+ bfc合并与边距重叠

父盒子设置overflow为visible(默认)时，子盒子和父盒子属于同层一bfc(边距折叠【子盒子和父盒子及父盒子的同级盒子】，margin-top合并)，overflow为hidden时不属于