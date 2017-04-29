import React from 'react'

import serverCall from '../../utils/helpers.js'

class Breakout extends React.Component {



  //Tutorial at
	//https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
  run(){
		//-----------------------------Canvas--------------------------------
    //declare canvas
    var canvas = document.getElementById('myCanvas')
    var ctx = canvas.getContext('2d')
    var score = 0
    var lives = 3
    var bricksDestroyed = 0

    function drawScore() {
      ctx.font = '16px Arial'
      ctx.fillStyle = '#0095DD'
      ctx.fillText('Score: ' + score, 8, 20)
    }
    function drawLives() {
      ctx.font = '16px Arial'
      ctx.fillStyle = '#0095DD'
      ctx.fillText('Lives: ' + lives, canvas.width-65, 20)
    }

    function gameOver(){
      ctx.font = '16px Arial'
      ctx.fillStyle = 'black'
      ctx.fillText('Game Over', canvas.width/2, canvas.height/2)
      ctx.fillText('Final Score: ' + score, canvas.width/2 - 9, (canvas.height/2) + 28)
      var userData = {
        username: 'username',
        score: score
      }
      serverCall.saveScore(userData).then(response => console.log(response))
    .catch(errors => console.log(errors))
    }

    function victory(){
      ctx.font = '16px Arial'
      ctx.fillStyle = 'black'
      ctx.fillText('Victory!', canvas.width/2, canvas.height/2)
      ctx.fillText('Final Score: ' + score, canvas.width/2 - 11, (canvas.height/2) + 28)
    }

    //------------------------------Ball-----------------------------------
    //ball variables
    //ball starts in a random x position
    var x = Math.floor(Math.random() * (canvas.width - 30)) + 10
    var y = 200
    var dx = 2.5
    var dy = 2
    var ballRadius = 10

    //creates the ball, moves freely
    function drawCircle() {
      ctx.beginPath()
      ctx.arc(x, y, ballRadius, 0, Math.PI*2)
      ctx.fillStyle = '#0095DD'
      ctx.fill()
      ctx.closePath()
    }

        //checks the height of the circle, if it collides with the wall, switch direction. If it hits the bottom, game over. If it hits the paddle, reverse direction.
    function checkHeight() {
      var yhit = (canvas.height - ballRadius) - paddleHeight + 2

      if (y + dy > yhit && x > paddleX && x < paddleX + paddleWidth){
        dy = -dy
        dy -= .25
        if (dx > 0){
          dx += .25
        } else {
          dx -= .25
        }
      }
      if (y + dy < ballRadius){
        dy = -dy
      } else if (y + dy > canvas.height-ballRadius){
        lives--
        if(lives < 1) {
          setTimeout(stop, 0)
          window.requestAnimationFrame(gameOver, canvas)
        } else {
          x = Math.floor(Math.random() * (canvas.width - 30)) + 10
          y = canvas.height-30
          dx = 2
          dy = -2
        }
      }      
    }

    //checks the width of the circle, if it collides with the wall, switch direction
    function checkWidth() {
      if (x + dx < ballRadius || x + dx > canvas.width-ballRadius){
        dx = -dx
      }
    }

    //-----------------------------Paddle-------------------------------------

    //paddle definition
    var paddleHeight = 10
    var paddleWidth = 75
    var paddleX = 360

    //draw the paddle
    function drawPaddle() {
      ctx.beginPath()
      ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
      ctx.fillStyle = '#0095DD'
      ctx.fill()
      ctx.closePath()
    }

    //default keypress states
    var rightPressed = false
    var leftPressed = false

    //keyboard controls
    document.addEventListener('keydown', keyDownHandler, false)
    document.addEventListener('keyup', keyUpHandler, false)

    function keyDownHandler(e) {
      if(e.keyCode == 39) {
        rightPressed = true
      } else if(e.keyCode == 37) {
        leftPressed = true
      }
    }

    function keyUpHandler(e) {
      if(e.keyCode == 39) {
        rightPressed = false
      } else if(e.keyCode == 37) {
        leftPressed = false
      }
    }

    //------------------------------ Mouse control-----------

    function movePaddle(){
      if(rightPressed && (paddleX < canvas.width - paddleWidth)) {
        paddleX += 5
      } else if(leftPressed && (paddleX > 0)) {
        paddleX -= 5
      }
    }

    // document.addEventListener('mousemove', mouseMoveHandler, false)

    // function mouseMoveHandler(e) {

    //   var relativeX = e.clientX + canvas.offsetLeft
    //   if(relativeX > 0 && relativeX < canvas.width) {
    //     paddleX = relativeX - paddleWidth/2
    //   }
    // }

    function mouse(e) {
      var pos = getMousePos(canvas, e)
      paddleX = pos.x - paddleWidth/2
    }

    window.addEventListener('mousemove', mouse, false)

    function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect()
      return {
        x: evt.clientX - rect.left
      }
    }

    //----------------------------------Bricks------------------------------

    //individual bricks
    var brickWidth = 75
    var brickHeight = 20

    //brick row
    var brickPadding = 1
    var brickOffsetTop = 30
    var brickOffsetLeft = 5
    var brickRowCount = 3
    var brickColumnCount = 7

    //store bricks in an array
    var bricks = []
    for(var c=0; c<brickColumnCount; c++) {
      bricks[c] = []
      for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 }
      }
    }

      //call drawBricks in draw, places the actual bricks
    function drawBricks() {
      for(var c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
          if(bricks[c][r].status == 1) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop
            bricks[c][r].x = brickX
            bricks[c][r].y = brickY
            ctx.beginPath()
            ctx.rect(brickX, brickY, brickWidth, brickHeight)
            ctx.fillStyle = '#0095DD'
            ctx.fill()
            ctx.closePath()
          }
        }
      }
    }


    //Brick collision detection

    function collisionDetection() {
      for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
          var b = bricks[c][r]
          if(b.status == 1) {
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
              dy = -dy
              b.status = 0
              score++
              bricksDestroyed++
              if(bricksDestroyed == brickRowCount*brickColumnCount) {
                setTimeout(stop, 0)
                window.requestAnimationFrame(victory, canvas)
              }
            }
          }
        }
      }
    }



    //-----------------------Draw (ball, paddle, bricks, run game)-----------

    var running 

    function start(){
      if (!running){
        draw()
      }
    }

    function stop(){
      window.cancelAnimationFrame(running)
      running  = undefined
    }

    //creates all movement, constantly redrawing based on new position
    function draw() {
      movePaddle()
      checkWidth()
      checkHeight()
      collisionDetection()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawCircle()
      drawPaddle()
      drawBricks()
      drawScore()
      drawLives()
      x += dx
      y += dy
      running = window.requestAnimationFrame(draw, canvas)
      // requestAnimationFrame(draw)
    }
    start()
  }

  render() {
    return (
      <div className = 'row'>
        <div className = 'col-md-12'>
          <button onClick={this.run}>Play</button>
          <canvas id='myCanvas' width='540' height='400'></canvas>
        </div>
      </div>
    )
  }
}

Breakout.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  profile: React.PropTypes.object,
  error: React.PropTypes.string,
  onLoginClick: React.PropTypes.func.isRequired,
  onLogoutClick: React.PropTypes.func.isRequired
}

export default Breakout
