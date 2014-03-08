var height = window.innerHeight;
var width = window.innerWidth;

window.addEventListener('resize', function(){
  height = window.innerHeight;
  width = window.innerWidth;
});


var currentFrame = [];

for(var i = 0; i < 100; i++){
  currentFrame.push({
    r : 20,
    cx : (Math.random() * (width - (40)) + 20 ),
    cy : (Math.random() * (height - (40)) + 20 ),
    xspeed : 5, //Math.ceil(Math.random() * 5),
    yspeed : 5 //Math.ceil(Math.random() * 5)
  });
}
var frames = [currentFrame];

var generateFrame = function(thisFrame){

  if(frames.length < 1000){
    var newFrame = thisFrame.map(function(opponentFrame){
      var obj = {};
      obj.r = opponentFrame.r;
      obj.cx = opponentFrame.cx + opponentFrame.xspeed;
      obj.cy = opponentFrame.cy + opponentFrame.yspeed;

      if(obj.cx > width-20){
        obj.xspeed = Math.abs(opponentFrame.xspeed) * -1;
      } else if(obj.cx < 20){
        obj.xspeed = Math.abs(opponentFrame.xspeed)
      } else {
        if(Math.abs(opponentFrame.xspeed) > 10){
          obj.xspeed = opponentFrame.xspeed - ( (Math.random() * 1) * opponentFrame.xspeed/Math.abs(opponentFrame.xspeed)) ;
        } else if(Math.abs(opponentFrame.xspeed) < 3){
          obj.xspeed = opponentFrame.xspeed + ( (Math.random() * 1) * opponentFrame.xspeed/Math.abs(opponentFrame.xspeed));
        } else {
          obj.xspeed = opponentFrame.xspeed + (Math.random() * 0.5) - (Math.random() * 0.5);
        }
      }

      if(obj.cy > height-20){
        obj.yspeed = Math.abs(opponentFrame.yspeed) * -1;
      } else if(obj.cy < 20){
        obj.yspeed = Math.abs(opponentFrame.yspeed)
      } else {
        if(Math.abs(opponentFrame.yspeed) > 10){
          obj.yspeed = opponentFrame.yspeed - ( (Math.random() * 1) * opponentFrame.yspeed/Math.abs(opponentFrame.yspeed));
        } else if(Math.abs(opponentFrame.yspeed) < 3){
          obj.yspeed = opponentFrame.yspeed + ( (Math.random() * 1) * opponentFrame.yspeed/Math.abs(opponentFrame.yspeed));
        } else {
          obj.yspeed = opponentFrame.yspeed + (Math.random() * 0.5) - (Math.random() * 0.5);
        }
      }

      return obj;
    });
    frames.push(newFrame);

    setTimeout(function(){
      generateFrame(newFrame);
    },5);

  } else {
    setTimeout(function(){
      generateFrame(thisFrame);
    },5);

  }

}

generateFrame(currentFrame);


var opponents = d3.select('svg').selectAll('circle').data(currentFrame).enter().append('circle')
  .attr('r', function(d) { return d.r; })
  .attr('cx', function(d){ return d.cx; })
  .attr('cy', function(d){ return d.cy;})
  .attr('opacity', '0.5')
  .attr('fill', 'black');

var render = function(){
  opponents
    .data(frames.shift())
    .attr('r', function(d) { return d.r; })
    .attr('cx', function(d){ return d.cx;})
    .attr('cy', function(d){ return d.cy;});
    // .attr('fill', function(d){
    //   return '#' + Math.floor(Math.random() * 16777215).toString(16);
    // });
};


(function animloop(){
  requestAnimFrame(animloop);
  //setTimeout(animloop, 700);
  render();
})();