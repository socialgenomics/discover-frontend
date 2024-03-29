import { expect } from 'chai';
import { describe, it } from 'mocha';
import { buildActionsQuery, createActionData } from 'repositive/utils/actions';

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
    expect(buildActionsQuery({type: 'comment'})).to.eql(defaultObj);
  });

  it('prefixes and merges all params', function() {
    expect(buildActionsQuery({type: 'comment', value: 'ABC'})['where.value'])
      .to.eql('ABC');
  })

  it('when a modelId is passed in, its key is actionable_id', function() {
    const result = buildActionsQuery({type: 'comment', modelId: 'A1'})['where.actionable_id'];
    expect(result).to.eql('A1');
  });
});
