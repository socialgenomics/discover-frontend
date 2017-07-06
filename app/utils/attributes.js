import Ember from 'ember';

const { get, isEmpty } = Ember;

/**
 * @desc Merges assays found on the model with assay objects passed in
 * @public
 * @param {Ember.DS.Model} model - The model which has assays
 * @param {Array} assaysFromUsers - User added assays as an array
 * @return {Array} List of merged assays
 */
export function mergeAssays(model, assaysFromUsers = []) {
  const assaysFromDataset = get(model, 'assay');
  const assaysFromProps = get(model, 'properties.attributes.assay');
  if (assaysFromProps) { return [...assaysFromProps, ...assaysFromUsers]; }
  if (assaysFromDataset) { return [...assaysFromDataset.split(','), ...assaysFromUsers]; }
  return assaysFromUsers;
}

/**
 * @desc Extracts several attribute values into a new object
 * @public
 * @param {Ember.DS.Model} attribute - The attribute to convert
 * @return {Object} The attribute converted to a simpler object
 */
export function convertAttrActionToCommonObj(attribute) {
  return {
    key: get(attribute, 'properties.key'),
    value: get(attribute, 'properties.value'),
    actionId: get(attribute, 'id'),
    userId: get(attribute, 'userId.id')
  };
}

/**
 * @desc merges two lists of differently formatted attributes after conversion
 * @public
 * @param {Array} attributeActions - Action objects of type attribute
 * @param {Array} attributesFromDataset - Attributes from the model
 * @return {Array} The merged attributes
 */
export function mergeAttributes(attributeActions = [], attributesFromDataset = []) {
  const actionAttrs = attributeActions.map(convertAttrActionToCommonObj);
  const datasetAttrs = convertDatasetAttrsToCommonObjList(attributesFromDataset);
  return [...datasetAttrs, ...actionAttrs];
}

/**
 * @desc converts attributes from a dataset to a simple common object
 * @public
 * @param {Array} attributesFromDataset - Attributes from the model
 * @return {Array} The converted list of attributes
 */
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
