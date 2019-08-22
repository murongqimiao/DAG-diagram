import SVGContent from './dagContent'
import NodeBus from './nodeBus'
const DAGBoard = {
  install(Vue, options) {
    Vue.component(SVGContent.name, SVGContent)
    Vue.component(NodeBus.name, NodeBus)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(DAGBoard)
}

export default DAGBoard
