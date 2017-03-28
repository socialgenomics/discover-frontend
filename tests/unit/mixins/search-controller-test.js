import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import Ember from 'ember';
import SearchControllerMixin from 'repositive/mixins/search-controller';
import sinon from 'sinon';

describe('SearchControllerMixin', function() {
  const { get, set } = Ember;
  const SearchControllerObject = Ember.Object.extend(SearchControllerMixin);
  const parseStringVal = { lorem: 'ipsum' };
  const getFiltersVal = [{ predicate: 'a', text: 'A' }, { predicate: 'b', text: 'B' }, { predicate: 'c', text: 'C' }];

  let subject;

  function createQPMock(parseStringVal = '', getFiltersVal = []) {
    return {
      parseString: sinon.stub().returns(parseStringVal),
      getFilters: sinon.stub().returns(getFiltersVal),
      toBoolString: sinon.stub().returnsArg(0),
      addFilter: sinon.stub().returns('addFilter'),
      removeFilter: sinon.stub().returns('removeFilter')
    };
  }

  beforeEach(function () {
    subject = SearchControllerObject.create();

    set(subject, 'QP', createQPMock(parseStringVal, getFiltersVal));
  });

  describe('queryParams', function () {
    it('should bind to query, page, resultsPerPage', function () {
      expect(get(subject, 'queryParams').toString()).to.eql('query,page,resultsPerPage');
    });

    it('should set default values fall all query params', function () {
      expect(get(subject, 'page')).to.be.equal(1);
      expect(get(subject, 'query')).to.be.null;
      expect(get(subject, 'resultsPerPage')).to.be.equal(6);
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
        const addAction = 'addFilter';

        it('should use empty string if "query" is null', function () {
          subject[method](addAction, 'a', 'a');

          expect(get(subject, 'QP')[addAction].args[0][0]).to.be.equal('');
        });

        it('should parse query to query tree', function () {
          const query = 'lorem ipsum';

          set(subject, 'query', query);
          subject[method](addAction, 'a', 'a');

          expect(get(subject, 'QP').parseString.calledWith(query)).to.be.true;
        });

        it('should set new query', function () {
          const actions = [addAction, 'removeFilter'];

          set(subject, 'query', addAction);

          actions.forEach(action => {
            subject[method](action, 'a', 'a');

            expect(get(subject, 'query')).to.be.equal(action);
            expect(get(subject, 'QP')[action].calledWith(parseStringVal, 'a', 'a')).to.be.true;
            expect(get(subject, 'QP').toBoolString.calledWith(action)).to.be.true;
          });
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
