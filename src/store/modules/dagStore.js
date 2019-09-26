import edges from './edges.js'
import nodes from './nodes.js'
import { idGenerator } from "@/utils/idGenerator"
import { SIZE_CHANGE_TYPE, DAG_ELEMENT_TYPE } from "@/utils/enums"
import { getNodesPosition } from "@/utils/layout"

const dagStore = {
  state: {
    // DataAll: {"edges":[{"dst_node_id":"bf37cd8a88a2cb9c","id":0,"src_node_id":"bf37cd8a88a2cb91"},{"dst_node_id":"bf37cd8a88a2cb9b","id":1,"src_node_id":"bf37cd8a88a2cb91"},{"dst_node_id":"bf37cd8a88a2cb9w","id":2,"src_node_id":"bf37cd8a88a2cb91"},{"dst_node_id":"d0e294906a6a076f","id":3,"src_node_id":"bf37cd8a88a2cb91"},{"dst_node_id":"d0e294906a6a0766","id":4,"src_node_id":"d0e294906a6a076f"},{"dst_node_id":"bb7b4d9341ffe881","id":5,"src_node_id":"d0e294906a6a076f"},{"dst_node_id":"b5e0f0e3b6b24081","id":6,"src_node_id":"d0e294906a6a076f"},{"dst_node_id":"7e1135653e4ceb48","id":7,"src_node_id":"d0e294906a6a076f"},{"dst_node_id":"46ffab08872440d5","id":8,"src_node_id":"d0e294906a6a076f"},{"dst_node_id":"f3bb46e711e89a28","id":9,"src_node_id":"d0e294906a6a076f"},{"dst_node_id":"078d93b64d47125m","id":10,"src_node_id":"d0e294906a6a076f"},{"dst_node_id":"c82d433ad78a588b","id":11,"src_node_id":"078d93b64d47125m"},{"dst_node_id":"078d93b64d47125b","id":12,"src_node_id":"078d93b64d47125m"},{"dst_node_id":"0aba4979011e0cc8","id":13,"src_node_id":"078d93b64d47125m"},{"dst_node_id":"4f9c15cdc02a35cs","id":14,"src_node_id":"078d93b64d47125m"},{"dst_node_id":"aead66f6681c705a","id":15,"src_node_id":"4f9c15cdc02a35cs"},{"dst_node_id":"4f9c15cdc02a35cb","id":16,"src_node_id":"4f9c15cdc02a35cs"}],"nodes":[{"id":"bf37cd8a88a2cb91","name":"Data","pos_x":450.7105182896751,"pos_y":67.5222136959516},{"id":"bf37cd8a88a2cb9c","name":"step1","pos_x":175.82762870731102,"pos_y":166.34078141267295},{"id":"bf37cd8a88a2cb9b","name":"business","pos_x":102.7785413729028,"pos_y":115.25175677150573},{"id":"bf37cd8a88a2cb9w","name":"we","pos_x":247.91703646998803,"pos_y":221.28324856991168},{"id":"d0e294906a6a076f","name":"step2","pos_x":946.2296854940059,"pos_y":242.38695265129124},{"id":"d0e294906a6a0766","name":"shadow1","pos_x":1145.5737932623338,"pos_y":386.0028072167357},{"id":"bb7b4d9341ffe881","name":"shadow2","pos_x":1228.5256061579812,"pos_y":340.86692850039015},{"id":"b5e0f0e3b6b24081","name":"shadow3","pos_x":1450.6464718141883,"pos_y":193.05747483377246},{"id":"7e1135653e4ceb48","name":"shadow4","pos_x":1377.6454003036094,"pos_y":135.79564583320095},{"id":"46ffab08872440d5","name":"shadow5","pos_x":1303.5126329122195,"pos_y":292.1190410645251},{"id":"f3bb46e711e89a28","name":"shadow6","pos_x":1379.9190301552574,"pos_y":237.69517786417452},{"id":"078d93b64d47125m","name":"shadow7","pos_x":452.62988743490746,"pos_y":410.6234121711531},{"id":"c82d433ad78a588b","name":"shadow8","pos_x":172.0003980378404,"pos_y":512.5984412351168},{"id":"078d93b64d47125b","name":"shadow9","pos_x":101.62039440496244,"pos_y":455.6855994204556},{"id":"0aba4979011e0cc8","name":"shadow11","pos_x":246.99022238151974,"pos_y":561.9704908927068},{"id":"4f9c15cdc02a35cs","name":"shadow12","pos_x":945.3453964382976,"pos_y":575.90443453521},{"id":"aead66f6681c705a","name":"shadow13","pos_x":1224.131182982579,"pos_y":682.2938701713514},{"id":"4f9c15cdc02a35cb","name":"shadow14","pos_x":1154.2970743657886,"pos_y":726.6645663890195}]}
    DataAll: { edges: [], nodes: [] },
    svgSize: 1,
    // the offset of svg panel coordinate system
    svgCoordinate: { offset_x: 0, offset_y: 0 }
  },
  getters: {
    getNodePos: (state) => (nodeId) => {
      let nodeInfo = state.DataAll.nodes.find(node => node.id === nodeId);
      return {
        pos_x: nodeInfo.pos_x,
        pos_y: nodeInfo.pos_y
      };
    },
    getSvgPosition: (state) => () => {
      let { left, top } = document.getElementById("svgContent").getBoundingClientRect();
      return { svg_left: left, svg_top: top };
    }
  },
  actions: {
    changeSize: ({ commit, state }, { change_type }) => {
      return new Promise((resolve, reject) => {
        switch (change_type) {
          case SIZE_CHANGE_TYPE.INITIAL:
            state.svgSize = 1;
            break;
          case SIZE_CHANGE_TYPE.EXPAND:
            if (state.svgSize >= 2) {
              return reject(new Error("Can not expand any more"))
            }
            state.svgSize += 0.1;
            break;
          case SIZE_CHANGE_TYPE.SHRINK:
            if (state.svgSize <= 0.5) {
              return reject(new Error("Can not shrink any more"))
            }
            state.svgSize -= 0.1;
            break;
        }
      })
    }
  },
  mutations: {
    openGraph(state) {
      let _nodes = [];
      let _edges = [];
      for (let node_id in nodes) {
        _nodes.push({
          id: node_id,
          name: nodes[node_id]
        });
      }
      edges.forEach(edge_info => {
        _edges.push({
          dst_node_id: edge_info.to,
          id: idGenerator(DAG_ELEMENT_TYPE.EDGE),
          src_node_id: edge_info.from
        });
      });
      state.DataAll = { edges: _edges, nodes: _nodes };
    },
    updateLayout(state) {
      let _nodes = [];

      let nodes_info = [];
      state.DataAll.nodes.forEach(node_info => {
        nodes_info.push({
          id: node_info.id,
          width: 180,
          height: 30
        });
      });
      let edges_info = [];
      state.DataAll.edges.forEach(edge_info => {
        edges_info.push({
          from: edge_info.src_node_id,
          to: edge_info.dst_node_id
        })
      });
      let nodes_pos = getNodesPosition(nodes_info, edges_info);
      state.DataAll.nodes.forEach(node_info => {
        _nodes.push(Object.assign({}, node_info, {
          pos_x: nodes_pos[node_info.id].x,
          pos_y: nodes_pos[node_info.id].y
        }));
      });
      state.DataAll.nodes = _nodes;
    },
    moveNode: (state, { id, pos_x, pos_y }) => {
      let _DataAll = state.DataAll;
      _DataAll.nodes.forEach((item) => {
        if (item.id === id) {
          item.pos_x = pos_x;
          item.pos_y = pos_y;
        }
      });
    },
    addEdge: (state, { src_node_id, dst_node_id }) => {
      let edges = state.DataAll.edges;
      /**
       * Check duplicate arrow
       **/
      const checkDupArrow = (src_node_id, dst_node_id) => {
        let res = edges.find(ele => {
          return ele.src_node_id === src_node_id && ele.dst_node_id === dst_node_id;
        });
        return res !== undefined;
      };
      if (checkDupArrow(src_node_id, dst_node_id)) {
        alert('Duplicate arrows detected!');
        return;
      }
      /**
       * Detect circle
       * Suppose only the newly added edge will cause circle
       **/
      const checkCircle = (src_node_id, dst_node_id) => {
        let queue = [];
        queue.push({src_node_id, dst_node_id});
        while (queue.length > 0) {
          let cur = queue.shift();
          if (cur.dst_node_id === src_node_id) {
            return true;
          }
          let nextEdges = edges.filter(ele => {
            return ele.src_node_id === cur.dst_node_id;
          });
          queue.push(...nextEdges);
        }
        return false;
      };
      if (checkCircle(src_node_id, dst_node_id)) {
        alert('Circle detected!')
      } else {
        edges.push({
          src_node_id: src_node_id,
          dst_node_id: dst_node_id,
          id: idGenerator(DAG_ELEMENT_TYPE.EDGE)
        });
      }
    },
    delEdge: (state, { id }) => {
      state.DataAll.edges = state.DataAll.edges.filter(item => {
        return item.id !== id;
      });
    },
    delNode: (state, { id }) => {
      state.DataAll.edges = state.DataAll.edges.filter(item => {
        return item.src_node_id !== id && item.dst_node_id !== id;
      });
      state.DataAll.nodes = state.DataAll.nodes.filter(item => {
        return item.id !== id;
      });
    },
    addNode: (state, { node_name, pos_x, pos_y }) => {
      let _nodes = state.DataAll.nodes;
      _nodes.push({
        name: node_name,
        pos_x: pos_x,
        pos_y: pos_y,
        id: idGenerator(DAG_ELEMENT_TYPE.NODE)
      });
    },
    changeSvgOffset: (state, { offset_x, offset_y }) => {
      state.svgCoordinate.offset_x = offset_x;
      state.svgCoordinate.offset_y = offset_y;
    }
  }
};

export default dagStore
