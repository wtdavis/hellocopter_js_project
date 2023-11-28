import Player from "./classes/Player.js"
import {Enemy, EnemyHandler} from "./classes/Enemy.js"
import { Checkpoint, CheckpointHandler} from "./classes/Checkpoint.js"
import { Projectile, ProjectileHandler } from "./classes/Projectile.js"
import { Background } from "./classes/Background.js"
import { InputHandler } from "./classes/Input.js"
import { Game } from "./classes/Game.js"
import { GameOver, Run, checkpoints, projectiles, enemies, gameOver } from "./utils.js"
// import Canvas from "./canvas.js" ****modules! refactor
window.addEventListener("DOMContentLoaded", function () {



class GameLoop {
    constructor () {
        this.success = false;
        this.gameOver = false;
        this.run = false;
        this.game
        this.background
        this.projectileHandler
        this.enemyHandler
        this.checkPointHandler
        this.player
        this.gameDimensions
    }


    generateEnemies (numEnemies) {
        // x, y, width, height, lift, speed, gun, timer, gunAngle, bulletSize
        for (let i=0;i<numEnemies; i++) {
            let x = this.gameDimensions[0]/(Math.random() * 20)
            let y = this.game.canvasHeight - 50
            let width = 50
            let height = 50
            let lift = 0
            let speed = Math.random() * 5
            let gun = true
            let timer = Math.random() * 300
            let gunAngle = [Math.random() * 2, Math.random() * 3]
            let bulletSize = [Math.random() * 10, Math.random() * 10]
            this.game.enemies.push(new Enemy(this.game, x, y, width, height, lift, speed, gun, timer, gunAngle, bulletSize))
        }
    }

    start () {
        
        const backgroundImage = document.getElementById("game_background")
        this.gameDimensions = [(window.innerWidth - 20), backgroundImage.naturalHeight]
        // create new game, then add is as arg to each instance of other classes.
        // game instance contains necessary common variables

        this.game = new Game(this.gameDimensions)
        this.background = new Background("game_background", this.game)
        this.projectileHandler = new ProjectileHandler(this.game)
        this.enemyHandler = new EnemyHandler(this.game)
        this.checkPointHandler = new CheckpointHandler(this.game)
        this.player = new Player(this.game)
        this.game.setPlayer(this.player)
        const input = new InputHandler(this.game)
       
        
        // const canvas = document.getElementById("game_canvas")
        // const ctx = canvas.getContext("2d")
        
        this.generateEnemies(10)
        const start = new Checkpoint( 50, this.gameDimensions[1] - 50, 100, 50, "origin")
        const end = new Checkpoint( 2200 , this.gameDimensions[1] - 50, 100, 50, "destination")
        
        requestAnimationFrame(e => this.draw())
    }

    draw() {
        this.game.ctx.clearRect(0, 0, ...this.gameDimensions)
        this.background.update()
        this.projectileHandler.update()
        this.enemyHandler.update()
        this.checkPointHandler.update()
        this.player.update()
        
        requestAnimationFrame(e => {this.draw()})
    }

    step () {

    }

}

    let currentGameLoop;
    window.addEventListener("keydown", function (e) {
        if (e.key === " ") {
            currentGameLoop = new GameLoop();
            currentGameLoop.start()
        }
        // console.log("gameloop loaded")
    } )



// let GameOver = false
// let Run = false

// function gameOver(player) {
//     if (!player.alive)
//     {GameOver =  true}
//     if (player.success)
//     {GameOver = true}
//     if (GameOver === true && player.success === false) 
//         {splash ("Defeat! Press R to Restart"); window.addEventListener('keydown', function (e) {if (e.key === 'r'){ restart()}})}
//         else if (GameOver === true && player.success === true)
//         {splash("Victory! Press R to Restart"); window.addEventListener('keydown', function (e) {if (e.key === 'r'){ restart()}})}
//     // {const endGame = document.createElement("h1")
//     // endGame.textContent = "Game Over"}
// }



// let checkpoints = []
// let projectiles = []
// let enemies = []


// const canvas = document.getElementById("game_canvas")
// const ctx = canvas.getContext("2d")

// const backgroundImage = document.getElementById("game_background")
// canvas.width = (window.innerWidth - 20)
// canvas.height = backgroundImage.naturalHeight

// const start = new Checkpoint( 50, canvas.height - 50, 100, 50, "origin")
// const end = new Checkpoint( 2200 , canvas.height - 50, 100, 50, "destination")



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
 


function splash (fillText) {
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle="blue";
    ctx.strokeStyle="grey"
    ctx.lineWidth="8"
    ctx.rect(canvas.width / 4, canvas.height / 4, canvas.width / 2,  canvas.height / 2)
    ctx.fillRect(canvas.width / 4, canvas.height / 4, canvas.width / 2,  canvas.height / 2)
    ctx.stroke()
    ctx.fillStyle="white"
    ctx.font = "30px Arial"
    ctx.textAlign="center"
    ctx.fillText(fillText, canvas.width/2, canvas.height/2)
}

function restart(){

    projectiles = []
    enemies = []
    // checkpoints = []
    enemy1 = new Enemy(700 , canvas.height - 50 , 50, 50, 0, 1, true, 100, [-1, 1], [4,4])
    enemy2 = new Enemy(backgroundImage.naturalWidth / 2, canvas.height - 50, 50, 50, 0, -1, true, 200, [0, 1], [5,5])
    enemy3 = new Enemy(backgroundImage.naturalWidth - 700, canvas.height - 50, 50, 50, 0, 0, true, 200, [.5, 1], [5,5])
    enemy4 = new Enemy(backgroundImage.naturalWidth / 7 , canvas.height - 50 , 50, 50, 0, 2, true, 250, [-1.5, .2], [10,10])
    enemy5 = new Enemy(backgroundImage.naturalWidth / 2 , canvas.height - 50 , 50, 50, 0, 0, true, 400, [0, .5], [10,10])
    enemies.push(enemy1, enemy2, enemy3, enemy4, enemy5)
    // checkpoints.push(start, end)
    background = new Background(canvas.width, canvas.height, "game_background")
    player = new Player(canvas.width, canvas.height)
    GameOver = false
    Run = false
    firstFrame()
}

function firstFrame(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    background.update(player, ctx)
    bases.update(ctx, background, player)
    player.update(input, ctx)
    bullets.update(background, player)
    baddies.update(background, player)
    splash("Press Space to Begin")
    window.addEventListener('keydown', function (e) {
        if (e.key === ' ')
        {if (Run === false){
            Run = true; requestAnimationFrame(t => {animate(t)})
        }}
    })
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape')
        {Run = false}
    })
}

let elapsedTime

function step (timeStamp, prevTimeStamp) {
    let p = prevTimeStamp || timeStamp
    let t = timeStamp
    elapsedTime = performance.now()
    // console.log(elapsedTime) 
    if (GameOver === false && Run === true && t - p >= 16) {
        requestAnimationFrame(mark => animate(mark, t))
    } 
    else if (t-p < 16) {
        // console.log(t-p)
        setTimeout(() => {animate(elapsedTime, p)}, 1)
    } else {
        // console.log("gameover")
        // debugger
        // gameOver(player)
    }
}


function animate(timeStamp, prevTimeStamp) {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    background.update(player, ctx)
    bases.update(ctx, background, player)
    player.update(input, ctx)
    bullets.update(background, player)
    baddies.update(background, player)
    gameOver(player)    
    
    step(timeStamp, prevTimeStamp)
    
}

// firstFrame()
// splash("Press Space to Begin")
// animate()
// animate()

})