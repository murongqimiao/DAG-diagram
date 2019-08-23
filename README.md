

[VUE DAG diagram ]( https://murongqimiao.github.io/DAG-diagram/#/example)

===========
[中文](https://github.com/murongqimiao/DAG-diagram/blob/master/README_CN.md)

`DAG diagram base in vue.`
`only support chrome now, compatibility for other browser may need your help. glad 4 everyone's PR ~ `

## SEE WHAT IT IS
[https://murongqimiao.github.io/DAG-diagram/#/example](https://murongqimiao.github.io/DAG-diagram/#/example)

## HOW TO USE
```
npm install --save-dev dag-board
```

```
//main.js

import DAGBoard from 'dag-board'

Vue.use(DAGBoard)

```
```
//xxx.vue

<DAGBoard :DataAll="DataAll" @updateDAG="updateDAG"></DAGBoard>
```

```
/* if u want node-bus */

//xxx.vue

<node-bus v-if="dragBus" :value="busValue.value" :pos_x="busValue.pos_x" :pos_y="busValue.pos_y" />
 ```

more details, plz fork and download.
npm install --> npm run dev

## WHAT IT HELP
1. simulate the DAG diagram
2. drag the graph / nodes flexible
3. scale the graph by mouse wheel
4. drag node into graph for add
5. right-hand button to delete node or line
6. right-hand button to add in_ports or out_ports
7. more -> edit JSON and see what happen

## I WANT MORE
issue or QQ group 793841737
