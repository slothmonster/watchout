window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


var height = 700; //parseInt(d3.select('svg.arena').style('height').replace("px",""));
var width = 700; //parseInt(d3.select('svg.arena').style('width').replace("px",""));
var heroStats = [{r: 10, fill: 'red', cy: 350, cx: 350}];

var makeHero = function(heroStats){
  var hero = d3.select('svg').selectAll('circle.hero').data(heroStats);
  
  hero.enter().append('svg:circle')
    .attr({
      'r': function(d){ return d.r },
      'fill': function(d){ return d.fill },
      'cy': function(d){ return d.cy },
      'cx': function(d){ return d.cx },
      'class': '.hero'
    });
  return hero;
};


var hero = makeHero(heroStats);

var makeEnemies = function(x){
  circles = [];
  for(var i=0; i<x; i++){
    circles.push({
      r: 15,
      fill: 'blue',
      cy: Math.floor(Math.random() * (height - 30 + 1)) + 15,
      cx: (Math.floor(Math.random() * (width - 30 + 1)) + 15)
    })
  }
  return circles;
};

var enemies = d3.select('svg').selectAll('circle').data(makeEnemies(10)).enter().append('circle')
  .attr({
    'r': function(d){ return d.r },
    'fill': 'blue',
    'cy': function(d) { return d.cy },
    'cx': function(d) { return d.cx }
  });

setInterval(function(){
  enemies.transition()
  // .ease('bounce')
  .duration(1300)
  .attr('fill', 'blue')
  .attr('cy', function() { return Math.floor(Math.random() * (height - 40 +1)) + 20 })
  .attr('cx', function() { return Math.floor(Math.random() * (width - 40 + 1)) + 20 });
}, 1100);
