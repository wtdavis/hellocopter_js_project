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
            this.run = this.game.run
            this.pickup = this.game.pickup

            if (this.alive === false) {
                this.gameOver = true
            }
            if (this.pickup === true && this.success === true && this.alive === true) {
                this.gameOver = true
            }
        }

        generateEnemies (numEnemies) {
            // x, y, width, height, lift, speed, gun, timer, gunAngle, bulletSize
            for (let i=0;i<numEnemies; i++) {
                let x = this.gameDimensions[0]/(Math.random())
                let y = this.game.canvasHeight - 50
                let width = 50
                let height = 50
                let lift = 0
                let speed = Math.random() * 2
                let gun = true
                let timer = Math.random() * 10 + 100
                let gunAngle = [Math.random() * 2, Math.random() * 3]
                let bulletSize = [Math.random() * 5 + 3 , Math.random() * 5 + 3]
                // let bulletSize = [2,2]
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

            this.generateEnemies(2)
            const start = new Checkpoint( 200, this.gameDimensions[1] - 100, 180, 100, "origin", 0)
            const end = new Checkpoint( 2000 , this.gameDimensions[1] - 100, 180, 100, "destination", 1)
            this.game.checkpoints = this.game.checkpoints.concat([start, end])
            // populate enemies and checkpoints

            // this.game.run = true
            // requestAnimationFrame(e => this.draw(Math.random()))
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
        }
  
        draw(num) {
            if (num) {
                this.num = num
            }
            // num is for keeping track of the game loop instance - random num, testing artifact 
            console.log(num)
            this.game.ctx.clearRect(0, 0, ...this.gameDimensions)
            this.background.update()
            this.checkPointHandler.update()
            this.projectileHandler.update()
            this.enemyHandler.update()
            this.player.update()
            this.modalHandle()
            this.gameState()
            
            if (this.game.run && this.run) {
                this.animationFrameId = requestAnimationFrame(e => {this.draw(this.num)})
            } else {
                cancelAnimationFrame(animationFrameId)
            }
        }


        setModalText (status) {
    
            if (status === "pause"){
                this.modalText0 = "Paused!"
                this.modalText1 = "Press \"p\" to unpause"
                this.modalText2 = null
                this.modalText3 = null
                this.modalText4 = null
                this.modalText5 = null
            }
            if (status === "defeat") {
                this.modalText0 = "Defeat!"
                this.modalText1 = "Don't give up! Press space to restart!"
                this.modalText2 = null
                this.modalText3 = null
                this.modalText4 = null
                this.modalText5 = null
            }
            if (status === "success") {
                this.modalText0 = "Success!"
                this.modalText1 = "You rescued our capybara friend! Champagne!"
                this.modalText2 = null
                this.modalText3 = null
                this.modalText4 = null
                this.modalText5 = null
            }
            if (status === "start") {
                this.modalText0 = "Welcome to HelloCopter! We at CapyCorp need you to rescue a capybara!"
                this.modalText1 = "The evil Dr. 404 kidnapped her for experiments! Hurry!"
                this.modalText2 = "Fly to the other side of the map, rescue her from Dr 404's Evil Tower of Science,"
                this.modalText3 = "and fly her back here!"
                this.modalText4 = null
                this.modalText5 = null
            }

            let modalTextList = [
                this.modalText0,
                this.modalText1,
                this.modalText2,
                this.modalText3,
                this.modalText4,
                this.modalText5
                ]

            for (let i=0;i<modalTextList.length;i++) {
                let element = document.createElement("p")
                element.setAttribute("class", `modalText modalText${i}`)
                element.innerText = modalTextList[i]

                this.gameModal.appendChild(element)
            }
            for (let i=0;i<modalTextList.length;i++) {
                debugger
                modalTextList[i].innerText = modalTextList[i]
                debugger

            }
        }

        modalHandle () {
            
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
            

            // if (this.pause) {
            //     this.modalToggle(true);
            //     this.setModalText("pause")
            // } else if (this.gameOver && this.success) {
            //     this.modalToggle(true);
            //     this.setModalText("success")
            // } else if (this.gameOver && !this.success) {
            //     this.modalToggle(true);
            //     this.setModalText("defeat")
            // } else if (this.menu) {
            //     this.modalToggle(true);
            //     this.setModalText("start")
            // } 
            
            // else {
            //     this.modalToggle(null)
            //     this.setModalText("start")
            //     console.log("tru")
            // }

            // the above 4 lines break the program idk why
        }

        // modalToggle (on) {
        //     // "on" paramater should be true or null, to add or remove modal
        //     if (on) {
        //         this.gameModal = document.createElement("div");
        //         this.gameModal.setAttribute("class", "gameModal");
        //         this.gameModal.setAttribute("id", "modal");
        //         let header = document.querySelector("header");
        //         header.appendChild(this.gameModal);
        //         // create game modal, put it in header
        //     }
        //     else {
        //         let gameModal = document.querySelector(".gameModal");
        //         gameModal?.remove();
        //         this.gameModal = null;
        //         // remove modal from DOM, set GameLoop instance variable to null
        //     }

        // }
    }

    let currentGameLoop;

    currentGameLoop = new GameLoop(1);
    currentGameLoop.setup();
    // currentGameLoop.modalToggle(null)
    currentGameLoop.start()
    currentGameLoop.menu = true
    
    window.addEventListener("keydown", function (e) {
        if (e.key === " ") {
            e.preventDefault() 
            if (currentGameLoop) {
                console.log("game reset")
                currentGameLoop.reset();
                // currentGameLoop.modalToggle(null)
                currentGameLoop.start()
                // currentGameLoop.menu = true
            // if there is a GameLoop in existence, reset it (each extra gameloop was slowing the browser down?)
            // and restart it
            } 
            // else {
            //     currentGameLoop = new GameLoop(1);
            //     currentGameLoop.setup();
            //     currentGameLoop.start()
            //     currentGameLoop.modalToggle(null)
            //     currentGameLoop.menu = false
            //     // if there is no GameLoop, make one (the first one) and start it
            // }
        }} 
    )

    window.addEventListener("keydown", function (e) {
        if (e.key.toLowerCase() === "p" ) {
            if (currentGameLoop.run) {
                currentGameLoop.run = false;
                currentGameLoop.menu = false
                currentGameLoop.pause = true
                // currentGameLoop.modalToggle(true)
                // currentGameLoop.setModalText("pause")
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
            currentGameLoop.modal.test()
            // debugger
            // let a = currentGameLoop
            // // a.run = true
            // // a.pause = false
            // if (a.menu === true) {
            //     a.menu = false
            //     // a.modalToggle(null)
            //     a.start()
            // } else {
            //     // a.modalToggle(true)
            // }

        }
    })

    // window.addEventListener("keydown", function (e) {
    //     if (e.key === "q") {
    //        let gameModal = document.querySelector(".gameModal");
    //        gameModal.remove();
    //         currentGameLoop.modalToggle(null)
    //         console.log("no modals")
    //     }
    // })

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






// let game = new Game(canvas.width, canvas.height)

// const input = new InputHandler(game)
// let player = new Player(game) 
// let background = new Background(canvas.width, canvas.height, "game_background", game)
// const bullets = new ProjectileHandler(game)
// const baddies = new EnemyHandler(ctx, 500, bullets)
// const bases = new CheckpointHandler(ctx, background, player)

// let enemy1 = new Enemy(700 , canvas.height - 50 , 50, 50, 0, 1, true, 100, [-1, 1], [4,4])
// let enemy2 = new Enemy(backgroundImage.naturalWidth / 2, canvas.height - 50, 50, 50, 0, -1, true, 200, [0, 1], [5,5])
// let enemy3 = new Enemy(backgroundImage.naturalWidth - 700, canvas.height - 50, 50, 50, 0, 0, true, 200, [.5, 1], [5,5])
// let enemy4 = new Enemy(backgroundImage.naturalWidth / 7 , canvas.height - 50 , 50, 50, 0, 2, true, 250, [-1.5, .2], [10,10])
// let enemy5 = new Enemy(backgroundImage.naturalWidth / 2 , canvas.height - 50 , 50, 50, 0, 0, true, 400, [0, .5], [10,10])


// //  enemies.push(otherEnemy, newEnemy, lastEnemy)
// baddies.enemiesArrayAdd(bullets, enemy1, enemy2, enemy3, enemy4, enemy5)

// checkpoints.push(start, end)
 


// function splash (fillText) {
//     // ctx.clearRect(0, 0, canvas.width, canvas.height)
//     ctx.fillStyle="blue";
//     ctx.strokeStyle="grey"
//     ctx.lineWidth="8"
//     ctx.rect(canvas.width / 4, canvas.height / 4, canvas.width / 2,  canvas.height / 2)
//     ctx.fillRect(canvas.width / 4, canvas.height / 4, canvas.width / 2,  canvas.height / 2)
//     ctx.stroke()
//     ctx.fillStyle="white"
//     ctx.font = "30px Arial"
//     ctx.textAlign="center"
//     ctx.fillText(fillText, canvas.width/2, canvas.height/2)
// }


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

// function firstFrame(){
//     ctx.clearRect(0,0,canvas.width, canvas.height)
//     background.update(player, ctx)
//     bases.update(ctx, background, player)
//     player.update(input, ctx)
//     bullets.update(background, player)
//     baddies.update(background, player)
//     splash("Press Space to Begin")
//     window.addEventListener('keydown', function (e) {
//         if (e.key === ' ')
//         {if (Run === false){
//             Run = true; requestAnimationFrame(t => {animate(t)})
//         }}
//     })
//     window.addEventListener('keydown', function (e) {
//         if (e.key === 'Escape')
//         {Run = false}
//     })
// }

// let elapsedTime

// function step (timeStamp, prevTimeStamp) {
//     let p = prevTimeStamp || timeStamp
//     let t = timeStamp
//     elapsedTime = performance.now()
//     // console.log(elapsedTime) 
//     if (GameOver === false && Run === true && t - p >= 16) {
//         requestAnimationFrame(mark => animate(mark, t))
//     } 
//     else if (t-p < 16) {
//         // console.log(t-p)
//         setTimeout(() => {animate(elapsedTime, p)}, 1)
//     } else {
//         // console.log("gameover")
//         // debugger
//         // gameOver(player)
//     }
// }


// function animate(timeStamp, prevTimeStamp) {
//     ctx.clearRect(0,0,canvas.width, canvas.height)
//     background.update(player, ctx)
//     bases.update(ctx, background, player)
//     player.update(input, ctx)
//     bullets.update(background, player)
//     baddies.update(background, player)
//     gameOver(player)    
    
//     step(timeStamp, prevTimeStamp)
    
// }

// firstFrame()
// splash("Press Space to Begin")
// animate()
// animate()

})
