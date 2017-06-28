import Ember from 'ember';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { Component, inject: { service }, Logger, get, set, setProperties, isBlank, $ } = Ember;
const rawSuggestedInterests = [
  "ADHD", "ALS", "Allergy", "Alzheimer's disease", "Asthma", "Autism", "Bioinformatics",
  "Blood", "Brain", "Breast", "CHIP-seq", "CRISPR", "Cancer", "Cardiovascular",
  "Cardiovascular disease", "Crohn's disease", "Cystic fibrosis", "Data analysis",
  "Depression", "Diabetes", "Embryonic", "Epigenome", "Epilepsy", "Epithelial",
  "Eye", "GWAS", "Genetics", "Genomics", "Gut", "Heart", "IBD", "Kidney", "Lung",
  "Metagenomics", "Methylation", "MiRNA", "Microbiome", "Multiple Sclerosis",
  "Musculoskeletal", "Neuron", "Obesity", "Ovarian", "PDX", "Pancreas", "Personal",
  "Populations", "Prostate", "Proteomics", "RNA-seq", "SNP", "Schizophrenia",
  "Single-cell", "Skin", "Therapeutics", "Whole Genome Sequencing", "Whole exome sequencing"
];

export default Component.extend(FlashMessageMixin, {
  store: service(),

  isOpen: false,

  init() {
    this._super(...arguments);

    const interests = get(this, 'interests') || [];
    const transformedSuggestions = rawSuggestedInterests
      .map(interest => interest.capitalize())
      .sort()
      .filter(interest => interests.indexOf(interest) === -1);

    setProperties(this, {
      'editInterests': interests,
      'suggestedInterests': transformedSuggestions
    });
  },

  actions: {
    /**
     * @desc removes interest
     * @param {String} name
     */
    removeInterest(name) {
      //If the term is a suggested one, add it back to the suggestedInterests Array
      if (rawSuggestedInterests.indexOf(name) !== -1) {
        const newArray = [...get(this, 'suggestedInterests'), ...[name]].sort();
        set(this, 'suggestedInterests', newArray);
      }
      this._saveChanges(get(this, 'editInterests').removeObject(name));
    },

    /**
     * @desc adds interest
     * @param {String} name
     */
    addInterest(name) {
      if (!isBlank(name)) {
        const suggestedInterests = get(this, 'suggestedInterests');
        //Remove from suggestions
        if (suggestedInterests.indexOf(name) !== -1) {
          set(this, 'suggestedInterests', suggestedInterests.without(name));
        }
        this._saveChanges(get(this, 'editInterests').addObject(name));
      }
    },

    /**
     * @desc hides add interest input and resets it state
     */
    hideInput() {
      set(this, 'isOpen', false);
    },

    /**
     * @desc shows add interest input
     */
    showInput() {
      set(this, 'isOpen', true);
    },

    handleKeydown(dropdown, e) {
      if (e.keyCode !== 13) { return; }
      if (isBlank(dropdown.highlighted)) {
        const text = e.target.value;
        this.send('addInterest', text);
      }
    }
  },
  /**
   * @desc saves changes to backend
   * @param {Array<String>} interests
   * @private
   */
  _saveChanges(interests) {
    const userModel = get(this, 'store').peekRecord('user', get(this, 'userId'));

    set(userModel, 'profile.interests', interests);

    userModel
      .save()
      .then(this._onSaveSuccess.bind(this))
      .catch(this._onSaveError.bind(this, userModel));
  },

  /**
   * @desc save success handler
   * @private
   */
  _onSaveSuccess() {
    $('.ember-power-select-trigger').blur();
    this._addFlashMessage('Your interests have been updated.', 'success');
  },

  /**
   * @desc save error handler
   * @param {Ember.DS.Model} userModel
   * @param {Error} error
   * @private
   */
  _onSaveError(userModel, error) {
    userModel.rollbackAttributes();
    set(this, 'editInterests', get(userModel, 'profile.interests'));
    Logger.error(error);
    this._addFlashMessage('Sorry. There was a problem with updating your interests.', 'warning');
  }
});
