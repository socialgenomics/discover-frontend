import { expect } from 'chai';
import { describe, it } from 'mocha';
import { createActionData } from 'repositive/utils/actions';

describe('createActionData', function () {
  const model = { constructor: { modelName: 'dataset' } };
  const userId = { id: 2 };
  const type = 'favourite';

  it('should create an object with model user and type', function() {
    const result = createActionData(model, userId, type);
    expect(result.type).to.eql(type);
    expect(result.userId).to.eql(userId);
    expect(result.datasetId).to.eql(model);
  });

  it('should create an object with customProperties', function() {
    const result = createActionData(model, userId, type, {text: 'Hello'});
    expect(result.text).to.eql('Hello');
  });
});
