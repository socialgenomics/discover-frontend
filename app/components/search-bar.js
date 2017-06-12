import Ember from 'ember';
import { getRandomElement } from 'repositive/utils/arrays'
const { Component, get, inject: { service }, setProperties, computed } = Ember;

export default Component.extend({
    queryService: service('query'),

    placeholderValues: [
        `obesity AND microbiome`,
        `autism AND assay:"RNA seq"`,
        `infant stool AND assay:wgs`,
        `Alzheimer's disease`,
        `fetal epigenome`,
        `human populations AND (assay:"Whole Genome Sequencing" OR assay:WGS)`
    ],

    init() {
        this._super(...arguments);
        const queryService = get(this, 'queryService');
        setProperties(this, {
            'query': queryService.getQueryString(),
            'placeholder': this._getSearchPlaceholder(get(this, 'placeholderValues'))
        });
    },

    query: computed('queryService.queryString', {
        get() {
            return get(this, 'queryService').getQueryString();
        },
        set(key, value) {
            return value;
        }
    }),

    actions: {
        search(query) {
            get(this, 'search')(query.trim()); //calls search on application route
        }
    },

    /**
     * @desc returns random search term placeholder
     * @returns {String}
     * @private
     */
    _getSearchPlaceholder(placeholderList) {
        return getRandomElement(placeholderList);
    }
});
