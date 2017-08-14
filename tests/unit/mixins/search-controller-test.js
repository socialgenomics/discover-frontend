import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import Ember from 'ember';
import SearchControllerMixin from 'repositive/mixins/search-controller';
import sinon from 'sinon';

describe('SearchControllerMixin', function() {
  const { get, set } = Ember;
  const SearchControllerObject = Ember.Object.extend(SearchControllerMixin);
  const fromNaturalVal = { lorem: 'ipsum' };
  const filtersVal = [{ key: 'a', value: 'A' }, { key: 'b', value: 'B' }, { key: 'c', value: 'C' }];

  let subject;

  function createQPMock(fromNaturalVal = '', filtersVal = []) {
    return {
      fromNatural: sinon.stub().returns(fromNaturalVal),
      filter: sinon.stub().returns(filtersVal),
      toNatural: sinon.stub().returnsArg(0),
      addFilter: sinon.stub().returns('addFilter'),
      removeFilter: sinon.stub().returns('removeFilter'),
      and: sinon.stub().returnsArg(0)
    };
  }

  beforeEach(function () {
    subject = SearchControllerObject.create();

    set(subject, 'QP', createQPMock(fromNaturalVal, filtersVal));
  });

  describe('queryParams', function () {
    it('should bind to query, page, resultsPerPage', function () {
      expect(get(subject, 'queryParams').toString()).to.eql('query,page,resultsPerPage');
    });

    it('should set default values fall all query params', function () {
      expect(get(subject, 'page')).to.be.equal(1);
      expect(get(subject, 'query')).to.be.null;
      expect(get(subject, 'resultsPerPage')).to.be.equal(30);
    });
  });

  describe('computed properties', function () {
    describe('totalPages', function () {
      const property = this.title;
      const total = 19;

      beforeEach(function () {
        set(subject, 'model', { meta: { total } });
      });

      it('should return number of pages based on total results and "resultsPerPage"', function () {
        const resultsPerPege = [1, 9, total, total * 2];

        resultsPerPege.forEach(number => {
          set(subject, 'resultsPerPage', number);

          expect(get(subject, property)).to.be.equal(Math.ceil(total / number));
        });
      });
    });

    describe('activeFilters', function () {
      const property = this.title;

      it('should return active filters if query is not null', function () {
        set(subject, 'query', 'lorem ipsum');
        expect(get(subject, property)).to.eql(['a:A', 'b:B', 'c:C']);
      });

      it('should return empty array if query is null', function () {
        expect(get(subject, property)).to.eql([]);
      });
    });

    describe('custom methods', function () {
      describe('_toggleFilter', function () {
        const method = this.title;
        const addAction = 'add';

        it('should use empty string if "query" is null', function () {
          const QP = get(subject, 'QP');
          const rand = { rand: Math.random() };

          QP.fromNatural.returns(undefined);
          subject._toggleFilter(addAction, rand);

          expect(QP.toNatural.calledOnce).to.be.true;
          expect(QP.toNatural.args[0][0]).to.eql(rand);
        });

        it('should parse query to query tree', function () {
          const query = 'lorem ipsum';

          set(subject, 'query', query);
          subject[method](addAction, 'a', 'a');

          expect(get(subject, 'QP').fromNatural.calledWith(query)).to.be.true;
        });

        it('should reset page to 1', function () {
          set(subject, 'page', 5);
          subject[method](addAction, 'a', 'a');

          expect(get(subject, 'page')).to.be.equal(1);
        });
      });
    });
  });
});
