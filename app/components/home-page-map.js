import Ember from 'ember';
import d3 from 'npm:d3';
import topojson from 'npm:topojson';

// const { Controller, computed, Logger, get } = Ember;

export default Ember.Component.extend({
  didInsertElement: function() {
    const width = this.$().innerWidth();
    const height = this.$().innerHeight() > 0 ? this.$().innerHeight() : 500;


    let svg = d3.select('.map-search').insert("svg",":first-child")
      .attr('width', width)
      .attr('height', height)
      .attr('id', 'map');

    let g = svg.append('g');

    let mercator = d3.geoMercator()
      .center([0, 20])
      .scale(150);

    let path = d3.geoPath().projection(mercator);

    d3.json("assets/worldmap.json", function(error, topo) {

      console.log(topojson.feature(topo, topo.objects.countries));
      g.selectAll("path")
        .data(topojson.feature(topo, topo.objects.countries).features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr('fill', '#888');

      d3.json('assets/points.json', function (error, topology) {

        let color = d3.scaleOrdinal(d3.schemeCategory10);

        svg.selectAll('.samples')
          .data(topology.features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr("cursor", "pointer")
          .attr('fill', d => {
            return color(d.properties.type);
          });
      });

    });

  }
});