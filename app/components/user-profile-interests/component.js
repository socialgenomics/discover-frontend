import Ember from 'ember';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import { buildValidations } from 'ember-cp-validations';
import emptyValidator from 'repositive/validations/emptyValidator';


const { Component, inject: { service }, Logger, get, set, setProperties } = Ember;
const Validations = buildValidations({ newInterest: emptyValidator() });

export default Component.extend(FlashMessageMixin, Validations, {
  store: service(),

  isOpen: false,
  newInterest: '',

  init() {
    this._super(...arguments);

    set(this, 'editInterests', [...(get(this, 'interests') || [])]);

    set(this, 'suggestedInterests', [
      "Whole Genome Sequencing", "Cancer", "skin", "Whole exome sequencing", "autism",
      "blood", "RNA-seq", "cystic fibrosis", "neuron", "Genomics", "obesity", "epithelial",
      "Proteomics", "ALS", "gut", "single-cell","Alzheimer's disease", "kidney", "microbiome",
      "epilepsy", "heart", "methylation", "depression", "lung","epigenome", "asthma", "breast",
      "GWAS", "diabetes", "brain", "PDX", "Crohn's disease", "Musculoskeletal", "CRISPR",
      "Multiple Sclerosis", "prostate", "miRNA", "Schizophrenia", "embryonic", "genetics",
      "IBD", "pancreas", "therapeutics", "ADHD", "eye", "bioinformatics", "allergy",
      "cardiovascular", "CHIP-seq", "cardiovascular disease", "ovarian",
      "SNP", "personal", "data analysis", "populations", "metagenomics"
    ]);
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
      debugger
      // if (get(this, 'validations.isValid')) {
      this._saveChanges(get(this, 'editInterests').addObject(name));
      // }
    },

    /**
     * @desc hides add interest input and resets it state
     */
    hideInput() {
      setProperties(this, { isOpen: false, newInterest: '' });
    },

    /**
     * @desc shows add interest input
     */
    showInput() {
      set(this, 'isOpen', true);
    },

    handleKeydown(dropdown, e) {
      if (e.keyCode !== 13) { return; }
      debugger;

      const text = e.target.value;
      if (text.length > 0 && get(this, 'suggestedInterests').indexOf(text) === -1) {
        // let interests = get(this, 'selectedInterests');
        this._saveChanges(get(this, 'editInterests').addObject(text));
        // set(this, 'selectedInterests', interests.concat([text]));
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
