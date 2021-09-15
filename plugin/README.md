

[VUE DAG diagram ]( https://murongqimiao.github.io/DAG-diagram/#/example)

===========
[for English guide , click there](https://github.com/murongqimiao/DAG-diagram/blob/master/README_EN.md)


[具体展示页,可以改右侧json看效果](https://murongqimiao.github.io/DAG-diagram/#/example)

## 效果展示
- 画布移动 / 复原
![[图片上传中...(画布缩放.gif-823313-1567493208259-0)]
](https://upload-images.jianshu.io/upload_images/6385607-13e8af401de01819.gif?imageMogr2/auto-orient/strip)


- 画布缩放 / 复原
![画布缩放.gif](https://upload-images.jianshu.io/upload_images/6385607-f9b2135817c0c606.gif?imageMogr2/auto-orient/strip)

- 拖动节点
![节点拖动gif.gif](https://upload-images.jianshu.io/upload_images/6385607-7216c13df58d9577.gif?imageMogr2/auto-orient/strip)

- 框选拖动多个节点
![框选拖动gif.gif](https://upload-images.jianshu.io/upload_images/6385607-48b010c3fe92b177.gif?imageMogr2/auto-orient/strip)

- 添加节点
![添加节点gif.gif](https://upload-images.jianshu.io/upload_images/6385607-7043a33b5ce857be.gif?imageMogr2/auto-orient/strip)

- 删除节点
![删除节点.gif](https://upload-images.jianshu.io/upload_images/6385607-ba2ed2c331ef72fe.gif?imageMogr2/auto-orient/strip)

- 添加节点关系
![添加节点关系gif.gif](https://upload-images.jianshu.io/upload_images/6385607-ba2ed2c331ef72fe.gif?imageMogr2/auto-orient/strip)


- 删除节点关系
![删除节点关系gif.gif](https://upload-images.jianshu.io/upload_images/6385607-e9e8fd0fa83a7daa.gif?imageMogr2/auto-orient/strip)

- 添加节点入口 / 出口
![节点出入口添加gif.gif](https://upload-images.jianshu.io/upload_images/6385607-c6b72e629f2d3f66.gif?imageMogr2/auto-orient/strip)

- 展示模型训练流程 ( 自定义用法需自行开发 )
![节点训练gif.gif](https://upload-images.jianshu.io/upload_images/6385607-b85560e461afb740.gif?imageMogr2/auto-orient/strip)


## 使用方法
- 基础安装
```
npm install --save dag-board
```
vue项目的main.js中
```
import DAGBoard from 'dag-board'
Vue.use(DAGBoard)
```
具体文件里中
```
    <DAGBoard :DataAll="DataAll" @updateDAG="updateDAG" @editNodeDetails="editNodeDetails"></DAGBoard>
```
```
DataAll: 数据源
updateDAG:每次动作行为会抛出最新的数据, 和对应事件名称.
editNodeDetails: 可选内容,右键点击节点会带出节点数据,用此方法接受, 进行二次开发.比如更改节点携带的数据等.
```

- 高级安装 (动态添加节点的时候模拟用)
```
    <node-bus v-if="nodeBusDragging" //  是否正在添加节点
    :value="nodeName"                       //   模拟的节点名称
    :pos_x="nodeBusPositionX"          //   动态赋值 鼠标位置的x坐标 
    :pos_y="nodeBusPositionY" />      //   动态赋值 鼠标位置的y坐标
```
`以上内容均可前往github 下载项目查看使用过程, 熟练使用vue即可无障碍阅读代码.`

### 数据源的扩展性 / 样式自定义
为了更多同学能友好体验,在github右侧有JSON模拟器.使用如下图.
- 节点自定义
![节点自定义.gif](https://user-gold-cdn.xitu.io/2019/9/3/16cf62377ad04cab?w=480&h=272&f=gif&s=1433004)
```
一份完整的节点包括以下几个内容
{
			"id": 1,                             // 节点id
			"in_ports": [ 0 ],                   // 入口下标
			"name": "NODE_PARENT",               // 节点名称
			"out_ports": [ 0, 1 ],               // 出口下标
			"pos_x": 157,                        // 节点坐标 距离左侧
			"pos_y": 120,                        // 节点坐标 距离顶部
			"nodeStyle": {                       /* 非必要 节点样式 */ 
				"border": "2px solid red"
			},
			"iconStyle": {                       /* 非必要 节点icon样式 */
				"background": "red"
			},
			"iconClassName": "el-icon-link",     /* 非必要  节点icon的类名 */
			"nameDescribe": "气泡内容",           /* 非必要 气泡内容 */               
		},
```

- 节点关系自定义
![节点关系自定义gif.gif](https://user-gold-cdn.xitu.io/2019/9/3/16cf62376ae8ea72?w=480&h=272&f=gif&s=1817977)
```
// 一份完整的节点关系包括以下几个内容
"edges": [
		{
			"dst_input_idx": 0,  // 来源节点出口的下标
			"dst_node_id": 2,    // 来源节点的id
			"id": 1,             // 节点的id
			"src_node_id": 1,    // 目标节点的id
			"src_output_idx": 0  // 目标节点的入口下标
            "style": { }      /* 非必要 自定义节点样式 */
		}
	],
```

很多内容致敬了阿里PAI的早期样式

如果使用当中有任何问题或者实现不了的需求,


可以qq群艾特我.793841737.




