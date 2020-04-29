/**
 * 这里放置json 数据撑起组件内容
 */
export const diagramExampleData = {

}

export const JSONFromService = { "edges": [{ "src_node_id": 100, "src_output_idx": 0, "dst_node_id": 101, "dst_input_idx": 0, "id": 10 }], "nodes": [{ "pos_x": 323.50000000000034, "pos_y": 117.00000000000011, "name": "服务端拿取的数据", "iconClassName": "el-icon-collection-tag", "form": { "details": "普通节点的内容balabala", "createTime": "Wed Apr 29 2020" }, "id": 100, "in_ports": [0], "out_ports": [0] }, { "pos_x": 198.75000000000023, "pos_y": 271.0000000000002, "name": "普通节点", "iconClassName": "el-icon-collection-tag", "form": { "details": "普通节点的内容balabala", "createTime": "Wed Apr 29 2020" }, "id": 101, "in_ports": [0], "out_ports": [0] }] }
export const nodesBasic = [{
    name: '普通节点',
    iconClassName: 'el-icon-collection-tag',
    form: { details: '普通节点的内容balabala', createTime: '' }
}, {
    name: '动态节点',
    iconClassName: 'el-icon-loading',
    form: { details: '动态节点的内容balabala', createTime: '' }
}, {
    name: '自定义节点',
    form: { details: '自定义节点的内容balabala', createTime: '' },
    iconClassName: 'el-icon-magic-stick',
    nodeStyle: {
        "border": "2px solid orange",
        "border-radius": 0,
        "height": "40px"
    },
    iconStyle: {
        "background": "orange"
    }
}, {
    name: '拖入右侧',
    form: { details: '节点内容自由编辑', createTime: '' }
}]
