class Route {
    constructor (path, component, name) {
      this.path = path
      this.name = name
      this.component = component
    }

    static new (path, component, name) {
      let i = new this(path, component, name)
      return i
    }
  }

  export default Route
