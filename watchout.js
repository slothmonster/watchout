// start slingin' some d3 here.
var height = window.innerHeight;
var width = window.innerWidth;

//var game = d3.select('body').append('svg').attr({'height':height, 'width': width});


var opponents = d3.select('svg').selectAll('circle').data(d3.range(20)).enter().append('circle')
  .attr('r', function(d) { return d*5; })
  .attr('cx', function(d){ return Math.floor((Math.random() * width));})
  .attr('cy', function(d){ return Math.floor((Math.random() * height));})
  .attr('opacity', '0.5')
  .attr('fill', 'blue');

window.setInterval(function(){
  opponents.transition()
    .attr('cx', function(d){ return Math.floor( (Math.random() * (width - (10*d)) + (d*5) ) );})
    .attr('cy', function(d){ return Math.floor( (Math.random() * (height - (10*d)) + (d*5) ) );})
    .attr('fill', function(d){
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    });
}, 300);