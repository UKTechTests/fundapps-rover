var Rover = function () {
  this.x = 0;
  this.y = 0;
  this.direction = 'N';
  this.stoppedForObstacle = false;
}

var Obstacle = function (x, y) {
  this.x = x;
  this.y = y;
}

var rover = new Rover();
var obstacle = new Obstacle(0, 4);
var obstacleCheck;

obstacleCheck = function  (x, y) {
  if (x === obstacle.x && y === obstacle.y) {
    rover.stoppedForObstacle = true;
    return true;

  } else {
    return false;
  }
};

Rover.prototype.move = function (command) {

  var commandArray = command.split('');

  for (var i = 0; i < commandArray.length; i++) {
    if(this.stoppedForObstacle) return;

    if(commandArray[i] === 'f') {
      this.maneuver(commandArray[i]);
    }
    if(commandArray[i] === 'b') {
      this.maneuver(commandArray[i]);
    }
    if(commandArray[i] === 'l') {
      this.rotate(commandArray[i]);
    }
    if(commandArray[i] === 'r') {
      this.rotate(commandArray[i]);
    }
  };

};

Rover.prototype.rotate = function (direction) {
  var directions = ['N', 'E', 'S', 'W'];
  var currentIndex = _.indexOf(directions, this.direction);
  var newIndex;

  if (direction === 'l') {
    if (currentIndex - 1 < 0){
      newIndex = 3;
    } else {
      newIndex = currentIndex - 1;
    }

  } else {
    if (currentIndex + 1 > 3){
      newIndex = 0;
    } else {
      newIndex = currentIndex + 1;
    }
  }

  this.direction = directions[newIndex];
};

Rover.prototype.maneuver = function (direction) {
  var lastX = this.x;
  var lastY = this.y;
  var obstaclePresent;

  if (this.direction === 'N') {
    this.y = (direction === 'f') ? this.y + 1 : this.y - 1

  } else if (this.direction === 'S') {
    this.y = (direction === 'f') ? this.y - 1 : this.y + 1

  } else if (this.direction === 'E') {
    this.x = (direction === 'f') ? this.x + 1 : this.x - 1

  } else if (this.direction === 'W') {
    this.x = (direction === 'f') ? this.x - 1 : this.x + 1
  }

  //check bounds and wrap
  if (this.y > 100) this.y = 0;
  if (this.y < 0) this.y = 100;
  if (this.x > 100) this.x = 0;
  if (this.x < 0) this.x = 100;

  //check for obstacle
  obstaclePresent = obstacleCheck(this.x, this.y);
  this.x = (obstaclePresent) ? lastX : this.x;
  this.y = (obstaclePresent) ? lastY : this.y;
}

//test helper functions
Rover.prototype.reset = function () {
  this.x = 0;
  this.y = 0;
  this.direction = 'N';
  this.stoppedForObstacle = false;
}

Rover.prototype.set = function (x, y, direction) {
  this.x = x;
  this.y = y;
  this.direction = direction;
}









































