import Ember from 'ember';
import d3 from 'npm:d3';
import topojson from 'npm:topojson';

export default Ember.Component.extend({
  didInsertElement: function() {
    const width = this.$().innerWidth();
    const height = this.$().innerHeight() > 0 ? this.$().innerHeight() : 650;
    const mapColour = '#E2E8EA';
    const datasourceColour = '#E97275';
    const datasetColour = '#39AFB5';
    const pointRadius = 3;

    const frag = document.createDocumentFragment();

    const svg = d3.select(frag).append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('id', 'map');

    const g = svg.append('g');

    const mercator = d3.geoMercator()
      .center([0, 60])
      .scale(160);

    const path = d3.geoPath().projection(mercator);
    const points = d => mercator([d.geometry.coordinates[0], d.geometry.coordinates[1]]);

    d3.json('assets/worldmap.json', function(error, topo) {
      g.selectAll('path')
        .data(topojson.feature(topo, topo.objects.countries).features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', mapColour);

      d3.json('assets/points.json', function (error, topology) {
        const color = d3.scaleOrdinal().domain(['datasource', 'dataset'])
          .range([d3.rgb(datasourceColour), d3.rgb(datasetColour)]);
        const circles = svg.selectAll('circle')
          .data(topology.features)
          .enter()
          .append('circle')
          .attr('cx', d => points(d)[0])
          .attr('cy', d => points(d)[1])
          .attr('r', pointRadius)
          .attr('fill', d => color(d.properties.type));

        document
          .getElementsByClassName('map-background')[0]
          .appendChild(frag);

        /**
        * This amazing animation is a sleeping beauty
        * waiting for a kiss from the UI prince to be awaken again.
        */
        // circles.each(function (d, i) {
        //   setTimeout(() => {
        //     d3.select(this).raise();
        //     d3.select(this).transition()
        //       .attr('r', pointRadius * 2)
        //       .ease(d3.easeElastic)
        //       .duration(1000)
        //       .transition()
        //       .attr('r', pointRadius)
        //       .ease(d3.easeLinear)
        //       .duration(500)
        //   }, i * ( Math.floor( Math.random() * ( 6000 - 500 + 1 ) + 500 ) ) );
        // });
      });
    });
  }
});
