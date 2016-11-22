import Ember from 'ember';
import d3 from 'npm:d3';
import topojson from 'npm:topojson';

// const { Controller, computed, Logger, get } = Ember;

export default Ember.Component.extend({
  didInsertElement: function() {
    const width = this.$().innerWidth();
    const height = this.$().innerHeight() > 0 ? this.$().innerHeight() : 500;
    console.log(`Width: ${width}`);
    console.log(`Height: ${height}`);
    console.log(this.$());
    let svg = d3.select('.map-search').append('svg')
      .attr('width', width)
      .attr('height', height);

    let g = svg.append('g');

    let mercator = d3.geoMercator()
      .center([0, 50])
      .scale(140);

    let path = d3.geoPath().projection(mercator);

    d3.json("assets/worldmap.json", function(error, topology) {

      g.selectAll("path")
        .data(topojson.object(topology, topology.objects.countries).geometries)
        .enter()
        .append("path")
        .attr("d", path)
        .attr('fill', '#888');

    });

  }
});