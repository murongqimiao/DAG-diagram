// Generate id for an object
// param:
// objectType: DAG_ELEMENT_TYPE
// return: String
function idGenerator(objectType) {
  let ts = new Date().getTime();
  let rand = Math.floor(Math.random() * 1e9);
  return objectType + "_" + ts + "_" + rand;
}

export { idGenerator }
