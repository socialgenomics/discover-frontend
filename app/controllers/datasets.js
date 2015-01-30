import Ember from "ember";
export default Ember.ArrayController.extend({
  datasets: function () {
    //var length = this.get('length');
    var length = 4;
    return this.map(function (dataset, i) {
      // Checks if it’s the last dataset
      if ((i + 1) === length) {
        dataset.last = true;
      } else {
        dataset.last = false;

        // Checks if it’s the first dataset
        if (i === 0) {
          dataset.first = true;
        } else {
          dataset.first = false;
        }

        // Checks if it’s the last dataset of a row
        if ((i + 1) % 3 === 0) {
          dataset.lastOfRow = true;
        } else {
          dataset.lastOfRow = false;
        }
      }

      return dataset;
    });
  }.property('content.@each')
});