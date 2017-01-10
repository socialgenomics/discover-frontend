import { expect } from 'chai';
import { describe, it } from 'mocha';
import Ember from 'ember';
import sinon from 'sinon';
import IncrementCollectionViewCounterMixinMixin from 'repositive/mixins/increment-collection-view-counter-mixin';

const { get, set } = Ember;

describe('Unit | Mixin | increment collection view counter mixin', function() {
  it('increments collection view counter only once for each collection', function() {
    const IncrementCollectionViewCounterMixinObject = Ember.Object.extend(IncrementCollectionViewCounterMixinMixin);
    const subject = IncrementCollectionViewCounterMixinObject.create();
    const spy = sinon.spy();
    const modelMock = Ember.Object.create({
      collection: {
        id: 123
      }
    });

    set(subject, '_incrementViewCounter', spy);

    subject.incrementCollectionsViewCounter(modelMock);
    subject.incrementCollectionsViewCounter(modelMock);

    expect(spy.calledOnce).to.be.true;
    expect(
      get(subject, 'viewedCollections').indexOf(
        get(modelMock, 'collection.id')
      ) !== -1
    ).to.be.true;
    expect(get(subject, 'viewedCollections').length === 1).to.be.true;
  });
});
