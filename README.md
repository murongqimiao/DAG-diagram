

[VUE DAG diagram ]( https://murongqimiao.github.io/DAGBoard/#/example)
===========

`DAG diagram base in vue.`
`only support chrome now, can't compatibility other browser now. glad 4 everyone's PR ~ `

## SEE WHAT IT IS
[https://murongqimiao.github.io/DAGBoard/#/example](https://murongqimiao.github.io/DAGBoard/#/example)

## HOW TO USE
npm install --save-dev dag-board

//main.js
import DAGBoard from 'dag-board'
Vue.use(DAGBoard)

//xxx.vue
<DAGBoard :DataAll="DataAll" @updateDAG="updateDAG"></DAGBoard>

/* if u want node-bus */
//xxx.vue
<node-bus v-if="dragBus" :value="busValue.value" :pos_x="busValue.pos_x" :pos_y="busValue.pos_y" />
 

more details, plz fork and download.
npm install --> npm run dev

## WHAT IT HELP
. simulate the DAG diagram
. drag the graph / nodes flexible
. scale the graph by mouse wheel
. drag node into graph for add
. right-hand button to delete node or line
. right-hand button to add in_ports or out_ports
. 4 more -> edit JSON and see what happen

## I WANT MORE
issue or QQ group 793841737