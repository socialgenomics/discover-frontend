export default (store, modelType, id) => {
  return store.peekRecord(modelType, id) || store.createRecord(modelType, { id });
};
