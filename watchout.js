// start slingin' some d3 here.

var height = window.innerHeight;
var width = window.innerWidth;

var enemies = d3.select('svg').selectAll('circle').data([10,30,40,20]).enter().append('circle')
.attr('r', function(d){ return d})
.attr('fill', 'blue')
.attr('cy', function() { return Math.floor(Math.random() * height)})
.attr('cx', function() { return Math.floor(Math.random() * width)});

//Got lazy and made them transition to r: 30 instead of r: random
setInterval(function(){
  enemies.transition()
  .attr('r', 30)
  .attr('fill', 'blue')
  .attr('cy', function() { return Math.floor(Math.random() * height)})
  .attr('cx', function() { return Math.floor(Math.random() * width)});
}, 500);
