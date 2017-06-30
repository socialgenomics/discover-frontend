import Ember from 'ember';

const { get, isEmpty } = Ember;

export function mergeAssays(model, assaysFromUsers = []) {
  const assaysFromDataset = get(model, 'assay');
  const assaysFromProps = get(model, 'properties.attributes.assay');
  if (assaysFromProps) { return [...assaysFromProps, ...assaysFromUsers]; }
  if (assaysFromDataset) { return [...assaysFromDataset.split(','), ...assaysFromUsers]; }
  return assaysFromUsers;
}

export function convertActionToCommonObj(attribute) {
  return {
    key: get(attribute, 'properties.key'),
    value: get(attribute, 'properties.value'),
    actionId: get(attribute, 'id'),
    userId: get(attribute, 'userId.id')
  };
}

export function mergeAttributes(attributeActions = [], attributesFromDataset) {
  const actionAttrs = attributeActions.map(convertActionToCommonObj);
  const datasetAttrs = convertDatasetAttrsToCommonObjList(attributesFromDataset);
  return [...datasetAttrs, ...actionAttrs];
}

export function convertDatasetAttrsToCommonObjList(attributesFromDataset) {
  if (attributesFromDataset) {
    return Object.keys(attributesFromDataset).reduce((attrObjects, key) => {
      const keyValue = attributesFromDataset[key];
      if (isEmpty(keyValue) || 'pmid' in keyValue) { return attrObjects; }
      return [
        ...attrObjects,
        ...keyValue.map(value => { return { key, value }; })
      ];
    }, []);
  } else { return []; }
}
