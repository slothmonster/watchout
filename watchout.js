var height = 700;
var width = 700;
var heroStats = [{r: 10, fill: 'red', cy: 350, cx: 350}];

var scoreboard = {
  highscore : 0,
  currentscore : 0,
  collisions : 0
};

var highscore = document.getElementById('highscore');
var currentscore = document.getElementById('currentscore');
var collisions = document.getElementById('collisions');

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

var enemies = d3.select('svg').selectAll('image').data(makeEnemies(30)).enter().append('image')
  .attr({
    'height': function(d){ return d.r },
    'width': function(d){ return d.r },
    'xlink:href' : 'shuriken.svg',
    'fill': 'blue',
    'y': function(d) { return d.cy },
    'x': function(d) { return d.cx }
  })
  .classed('spin', true);

setInterval(function(){
  enemies
  .transition()
  .duration(1300)
  .attr('fill', 'blue')
  .attr('y', function() { return Math.floor(Math.random() * (height - 40 +1)) + 20 })
  .attr('x', function() { return Math.floor(Math.random() * (width - 40 + 1)) + 20 });
}, 1100);

var onCollision = function(){
  scoreboard.collisions ++;
  collisions.innerHTML = scoreboard.collisions + '' ;
  scoreboard.currentscore = 0;
  currentscore.innerHTML = '0' ;
}

var updateScore = function(){
  scoreboard.currentscore++;
  currentscore.innerHTML = scoreboard.currentscore ;
  if(scoreboard.highscore < scoreboard.currentscore){
    scoreboard.highscore = scoreboard.currentscore;
    highscore.innerHTML = scoreboard.highscore;
  }
}

throttledCollision = _.throttle(onCollision, 500);
throttledUpdateScore = _.throttle(updateScore, 500);

d3.timer(function(t){
  var hx = hero.attr('cx');
  var hy = hero.attr('cy');
  var hr = hero.attr('r');
  enemies.each(function(d,i){
    var enemy = d3.select(this);
    var ex = parseFloat(enemy.attr('x'));
    var ey = parseFloat(enemy.attr('y'));
    var er = parseFloat(enemy.attr('height'));
    ex = ex + er/2;
    ey = ey + er/2;
    var x = hx - ex;
    var y = hy - ey;
    var dis = Math.sqrt(x*x + y*y);
    if(dis < parseInt(hr)+parseInt(er)){
      //alert(hr + " and " + er + "is more than" + dis + "\n Details:" );
      throttledCollision();
    } else {
      throttledUpdateScore();
    }
  });
});


