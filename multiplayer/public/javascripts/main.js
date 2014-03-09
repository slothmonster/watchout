var height = 700;
var width = 700;
var heroStats = [{r: 10, fill: 'green', cy: 350, cx: 350}];

var enemies = d3.select('svg.arena').selectAll('circle.enemy').data(d3.range(2)).enter().append('circle').classed('enemy', true).attr({
  fill:'red',
  r: 10,
  cx: Math.random() * 700,
  cy: Math.random() * 700
});

var runStuff = function(){
  // socket.emit('playerUpdate', {x: 100, y:100});
  socket.on('playerUpdate', function(data){console.log(data)});
  socket.on('enemies', function(arr){
    d3.select('svg.arena').selectAll('circle.enemy').data(arr).enter().append('circle').classed('enemy', true).attr({
      fill:'red',
      r: 10
    });
    d3.select('svg.arena').selectAll('circle.enemy').transition().attr({
      cx: function(d){return d[0]},
      cy: function(d){return d[1]}
    });
  });
}

var runStuffOnce = _.once(runStuff);

var socket = io.connect();

socket.on('connect', function(data){
  console.log(data);
  runStuffOnce();
});





var dragmove = function(d){
  var newx, newy;
  if(d3.event.x < heroStats[0].r){
    newx = heroStats[0].r;
  } else if(d3.event.x > width - heroStats[0].r){
    newx = width - heroStats[0].r;
  } else {
    newx = d3.event.x;
  }
  if(d3.event.y < heroStats[0].r){
    newy = heroStats[0].r;
  } else if(d3.event.y > height - heroStats[0].r){
    newy = width - heroStats[0].r;
  } else {
    newy = d3.event.y;
  }
  d3.select(this)
    .attr('cx', newx)
    .attr('cy', newy);
  socket.emit('playerUpdate', {x: newx, y: newy});
};

var drag = function(obj){
    return d3.behavior.drag()
      .on("drag", dragmove);
};

var makeHero = function(heroStats){
  var hero = d3.select('svg').selectAll('circle.hero').data(heroStats);

  hero.enter().append('svg:circle')
    .attr({
      'r': function(d){ return d.r },
      'fill': function(d){ return d.fill },
      'cy': function(d){ return d.cy },
      'cx': function(d){ return d.cx },
      'class': 'hero'
    })
    .call(drag());
  return hero;
};

var hero = makeHero(heroStats);