import { expect } from 'chai';
import { describe, it } from 'mocha';
import { mergeAssays, mergeAttributes, convertAttrActionToCommonObj, convertDatasetAttrsToCommonObjList } from 'repositive/utils/attributes';

const attributeActions = [
  {
    'id': 'a1',
    'properties': {
      'key': 'ABC',
      'value': 'someActionAttr'
    },
    'userId': {
      'id': 'u1'
    }
  }
];
const attributesFromDataset = {
  assay: ['123', '456'],
  tissue: ['heart']
};

describe('mergeAssays', function() {
  it('returns empty list when no assays present', function() {
    expect(mergeAssays({}, [])).to.eql([]);
  });

  it('returns assaysFromUsers if no model assays are present', function() {
    const userAssays = ['abc', 'xyz'];
    expect(mergeAssays({}, userAssays)).to.eql(userAssays)
  });

  it('if assaysFromProps return merge with assaysFromUsers', function() {
    const model = { 'properties': { 'attributes': { 'assay': ['ABC', '123']}} }
    expect(mergeAssays(model, [])).to.eql(['ABC', '123']);
  });

  it('if no assaysFromProps but assaysFromDataset, return merge with assaysFromUsers', function() {
    const model = { 'assay': 'ABC,123' };
    expect(mergeAssays(model, [])).to.eql(['ABC', '123']);
  });
});

describe('mergeAttributes', function() {
  describe('when no args supplied', function() {
    it('should return an empty list', function() {
      expect(mergeAttributes()).to.eql([]);
    });
  });

  describe('when only action attributes are supplied', function() {
    it('should return a list of action attribute objects', function() {
      expect(mergeAttributes(attributeActions).length).to.eql(1);
      expect(mergeAttributes(attributeActions)[0].actionId).to.eql('a1');
    });
  });

  describe('when only dataset attributes are supplied', function() {
    it('should return a list of dataset attribute objects', function() {
      const result = mergeAttributes([], attributesFromDataset);
      expect(result.length).to.eql(3);
      expect(result[0].value).to.eql('123');
    });
  });

  describe('when dataset attributes and action attributes are supplied', function() {
    it('should return a list of merged attributes', function() {
      const result = mergeAttributes(attributeActions, attributesFromDataset);
      expect(result.length).to.eql(4);
      expect(result[0].value).to.eql('123');
      expect(result[3].value).to.eql('someActionAttr');
    });
  });
});

describe('convertAttrActionToCommonObj', function() {
  it('should return an object with correct values', function() {
    const result = convertAttrActionToCommonObj(attributeActions[0]);
    expect(result.key).to.eql('ABC');
    expect(result.value).to.eql('someActionAttr');
    expect(result.userId).to.eql('u1');
    expect(result.actionId).to.eql('a1');
  });
});

describe('convertDatasetAttrsToCommonObjList', function() {
  it('should return an object with correct values', function() {
    const result = convertDatasetAttrsToCommonObjList(attributesFromDataset);
    expect(result.length).to.eql(3);
    expect(result[2].key).to.eql('tissue');
    expect(result[2].value).to.eql('heart');
  });

  it('should return an empty array if an empty object is supplied', function() {
    const result = convertDatasetAttrsToCommonObjList({});
    expect(result).to.eql([]);
  });

  it('should reject all null pmids', function() {
    const attrsFromDataset = {
      'pmid': null
    }
    const result = convertDatasetAttrsToCommonObjList(attrsFromDataset);
    expect(result).to.eql([]);
  });

  it('should reject malformed pmids', function() {
    const attrsFromDataset = {
      'pmid': { 'pmid': "1231" }
    }
    const result = convertDatasetAttrsToCommonObjList(attrsFromDataset);
    expect(result).to.eql([]);
  });
});
