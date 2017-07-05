import { expect } from 'chai';
import { describe, it } from 'mocha';
import { buildActionsQuery, buildActionsQueryForModel, createActionData } from 'repositive/utils/actions';

describe('createActionData', function () {
  const model = { constructor: { modelName: 'dataset' } };
  const userId = { id: 2 };
  const type = 'favourite';

  it('should create an object with model user and type', function() {
    const result = createActionData(model, userId, type);
    expect(result.type).to.eql(type);
    expect(result.userId).to.eql(userId);
    expect(result.datasetId).to.eql(model);
    expect(result.actionable_model).to.eql(model.constructor.modelName);
  });

  it('should create an object with customProperties', function() {
    const result = createActionData(model, userId, type, {text: 'Hello'});
    expect(result.text).to.eql('Hello');
  });
});

describe('buildActionsQuery', function () {
  const defaultObj = {
    'where.type': 'comment',
    'order[0][0]': 'updated_at',
    'order[0][1]': 'DESC',
    limit: 100
  }
  it('returns an object with type, ordering, and limit', function() {
    expect(buildActionsQuery('comment')).to.eql(defaultObj);
  });

  it('merges prefixed customProps with the returned object', function() {
    const customObj = { value: 'ABC' };
    expect(buildActionsQuery('comment', customObj)['where.value'])
      .to.eql('ABC');
  })
});

describe('buildActionsQueryForModel', function () {
  it('returns an object with an actionable_id', function() {
    const result = buildActionsQueryForModel('comment', 'modelId1')['where.actionable_id'];
    expect(result).to.eql('modelId1');
  });
});
