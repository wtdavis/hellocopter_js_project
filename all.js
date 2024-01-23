import Player from "./classes/Player.js"
import {Enemy, EnemyHandler} from "./classes/Enemy.js"
import { Checkpoint, CheckpointHandler} from "./classes/Checkpoint.js"
import { Projectile, ProjectileHandler } from "./classes/Projectile.js"
import { Background } from "./classes/Background.js"
import { InputHandler } from "./classes/Input.js"
import { Game } from "./classes/Game.js"
import { GameOver, Run, checkpoints, projectiles, enemies, gameOver } from "./utils.js"
import Modal from "./classes/Modal.js"
// import Canvas from "./canvas.js" ****modules! refactor
window.addEventListener("DOMContentLoaded", function () {


    class GameLoop {
        constructor (num) {
            this.success = false;
            this.alive
            this.pickup
            this.run = true;
            // game status variables

            // this.gameOver = false;
            // this.pause = false
            // this.menu = true
            // this.modal = true
            // game modal variables --> moduled!

            this.game
            this.background
            this.projectileHandler
            this.enemyHandler
            this.checkPointHandler
            this.player
            // game-loop-relevant objects, including game, where variables are stored 
            this.gameDimensions
            this.num = num
            this.animationFrameId
            // some importantish numbers 
            this.gameModal = null
            this.header = document.querySelector("header")
            this.modalText0;
            this.modalText1;
            this.modalText2;
            this.modalText3;
            this.modalText4;
            this.modalText5;
            // game modal objects and state handling 
        }

        gameState() {
            this.alive = this.game.alive
            this.success = this.game.success
            // this.run = this.game.run
            this.pickup = this.game.pickup

            if (this.alive === false) {
                this.setDie()
                setTimeout(() => {this.setMenu(); this.reset()}, 5000)

            }
            if (this.pickup === true && this.success === true && this.alive === true) {
                this.setSuccess();
                setTimeout(() => {this.setMenu(); this.reset()}, 5000)
            }
        }

        setMenu () {
            this.menu = true;
            this.modal.setModalText("start")
            this.modal.modalHide(false)
        }

        setDie () {
            this.modal.setModalText("defeat")
            this.modal.modalHide(false)
        }

        setSuccess () {
            this.modal.setModalText("success")
            this.modal.modalHide(false)
        }

        generateEnemies (numEnemies) {
            this.game.enemies = []
            //enemy parameters: x, y, width, height, lift, speed, gun, timer, gunAngle, bulletSize
            for (let i=0;i<numEnemies; i++) {
                let x = this.gameDimensions[0]/(Math.random())
                let y = this.game.canvasHeight - 50
                let width = 50
                let height = 50
                let lift = 0
                let speed = (Math.random() * 2) - 1
                let gun = true
                let timer = Math.random() * 5 + 200
                let gunAngle = [Math.random() * 2, Math.random() * 3]
                let bulletSize = [Math.random() * 5 + 3 , Math.random() * 5 + 3]
                this.game.enemies.push(new Enemy(this.game, x, y, width, height, lift, speed, gun, timer, gunAngle, bulletSize))
            }
        }

        setup () {
            const backgroundImage = document.getElementById("game_background")
            // this.gameDimensions = [(window.innerWidth - 20), backgroundImage.naturalHeight]
            this.gameDimensions = [1200, 600]
            // create new game, then add it as arg to each instance of other classes.
            // game instance contains necessary common variables
            
            this.game = new Game(this.gameDimensions)
            this.background = new Background("game_background", this.game)
            this.checkPointHandler = new CheckpointHandler(this.game)
            this.projectileHandler = new ProjectileHandler(this.game)
            this.enemyHandler = new EnemyHandler(this.game)
            this.player = new Player(this.game)
            this.game.setPlayer(this.player)
            const input = new InputHandler(this.game)
            // create game objects 

            this.modal = new Modal()
            this.modal.modalHide(false)
            this.modal.setModalText("start")

            this.generateEnemies(12)
            const start = new Checkpoint( 200, this.gameDimensions[1] - 100, 180, 100, "origin", 0)
            const end = new Checkpoint( 2000 , this.gameDimensions[1] - 100, 180, 100, "destination", 1)
            this.game.checkpoints = this.game.checkpoints.concat([start, end])
            // populate enemies and checkpoints
        }
        
        start () {
            this.game.run = true
            this.game.alive = true
            this.game.pickup = false
            this.game.success = false
            this.gameOver = false
            this.pause = false
            this.menu = false
            cancelAnimationFrame(this.animationFrameId)
             this.draw(Math.random())
            // draw then calls itself, so this line kicks off the animation 
        }

        reset () {
            this.game.reset();
            this.player.reset();
            this.enemyHandler.reset();
            this.generateEnemies(12)
        }
  
        draw(num) {
            if (num) {
                this.num = num
            }
            // num is for keeping track of the game loop instance - random num, testing artifact 
            // console.log(num)
            this.game.ctx.clearRect(0, 0, ...this.gameDimensions)
            this.background.update()
            this.checkPointHandler.update()
            this.projectileHandler.update()
            this.enemyHandler.update()
            this.player.update()
            this.gameState()
            
            if (this.game.run && this.run) {
                this.animationFrameId = requestAnimationFrame(e => {this.draw(this.num)})
            } else {
                cancelAnimationFrame(animationFrameId)
            }
        }
    }

    let currentGameLoop;

    currentGameLoop = new GameLoop(1);
    currentGameLoop.setup();
    currentGameLoop.start()
    
    window.addEventListener("keydown", function (e) {
        if (e.key === " ") {
            e.preventDefault() 
            if (currentGameLoop) {
                currentGameLoop.modal.modalHide(true)
                currentGameLoop.reset();
                currentGameLoop.start()
            // if there is a GameLoop in existence, reset it (each extra gameloop was slowing the browser down?)
            // and restart it
            } 
        }} 
    )

    window.addEventListener("keydown", function (e) {
        if (e.key.toLowerCase() === "p" ) {
            if (currentGameLoop.run) {
                currentGameLoop.run = false;
                currentGameLoop.menu = false
                currentGameLoop.pause = true
                // pause and toggle modal
            } else {
                currentGameLoop.run = true
                currentGameLoop.pause = false
                currentGameLoop.menu = false
                // currentGameLoop.modalToggle(null)
                currentGameLoop.draw()
                // unpause and toggle modal
            }
        }}
    )
  
  
    window.addEventListener("keydown", function (e) {
        if (e.key.toLowerCase() === "g" ) {
            currentGameLoop.modal.modalHide(true)
            console.log("hide")

        }
    })

// modal not disappearing test for dom manpipulation


    // const gameModal =  document.createElement("div")

    // let header = document.querySelector("header")

    // gameModal.setAttribute("class", "gameModal")
    // gameModal.setAttribute("id", "modal")

    // let gameModalTextItem1 = document.createElement("p")
    // gameModal.appendChild(gameModalTextItem1)
    // gameModalTextItem1.innerText = "press space to begin!"

    // let gameModalTextItem2 = document.createElement("p")
    // gameModal.appendChild(gameModalTextItem2)
    // gameModalTextItem2.innerText = "press space to begin!"

    // header.append(gameModal)

// game start gameModal initialization

// function restart(){

//     projectiles = []
//     enemies = []
//     // checkpoints = []
//     enemy1 = new Enemy(700 , canvas.height - 50 , 50, 50, 0, 1, true, 100, [-1, 1], [4,4])
//     enemy2 = new Enemy(backgroundImage.naturalWidth / 2, canvas.height - 50, 50, 50, 0, -1, true, 200, [0, 1], [5,5])
//     enemy3 = new Enemy(backgroundImage.naturalWidth - 700, canvas.height - 50, 50, 50, 0, 0, true, 200, [.5, 1], [5,5])
//     enemy4 = new Enemy(backgroundImage.naturalWidth / 7 , canvas.height - 50 , 50, 50, 0, 2, true, 250, [-1.5, .2], [10,10])
//     enemy5 = new Enemy(backgroundImage.naturalWidth / 2 , canvas.height - 50 , 50, 50, 0, 0, true, 400, [0, .5], [10,10])
//     enemies.push(enemy1, enemy2, enemy3, enemy4, enemy5)
//     // checkpoints.push(start, end)
//     background = new Background(canvas.width, canvas.height, "game_background")
//     player = new Player(canvas.width, canvas.height)
//     GameOver = false
//     Run = false
//     firstFrame()
// }

})
