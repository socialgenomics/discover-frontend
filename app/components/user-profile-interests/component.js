import Ember from 'ember';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { Component, inject: { service }, Logger, get, set, setProperties, isBlank } = Ember;
const rawSuggestedInterests = [
  "Whole Genome Sequencing", "Cancer", "skin", "Whole exome sequencing", "autism",
  "blood", "RNA-seq", "cystic fibrosis", "neuron", "Genomics", "obesity", "epithelial",
  "Proteomics", "ALS", "gut", "single-cell","Alzheimer's disease", "kidney", "microbiome",
  "epilepsy", "heart", "methylation", "depression", "lung","epigenome", "asthma", "breast",
  "GWAS", "diabetes", "brain", "PDX", "Crohn's disease", "Musculoskeletal", "CRISPR",
  "Multiple Sclerosis", "prostate", "miRNA", "Schizophrenia", "embryonic", "genetics",
  "IBD", "pancreas", "therapeutics", "ADHD", "eye", "bioinformatics", "allergy",
  "cardiovascular", "CHIP-seq", "cardiovascular disease", "ovarian",
  "SNP", "personal", "data analysis", "populations", "metagenomics"
];

export default Component.extend(FlashMessageMixin, {
  store: service(),

  isOpen: false,

  init() {
    this._super(...arguments);

    const interests = get(this, 'interests') || [];
    const transformedSuggestions = rawSuggestedInterests
      .map(interest => interest.capitalize())
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
        if (!isBlank(text) && get(this, 'suggestedInterests').indexOf(text) === -1) {
          this.send('addInterest', text);
        }
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
    // this.send('hideInput');

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
