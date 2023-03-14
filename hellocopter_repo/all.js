
// import Canvas from "./canvas.js" ****modules! refactor


let projectiles = []
let enemies = []
const canvas = document.getElementById("game_canvas")
const ctx = canvas.getContext("2d")
canvas.width = 1000;
canvas.height = 500;
// let gunTimer = 0

class Enemy{
    constructor(x, y, width, height, lift, speed, gun, bullets, timer, gunAngle, bulletSize, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.lift = lift;
        this.speed = speed;
        // this.relX = 0
        // this.realX = this.x + this.relX
        this.relevant = true;
        this.gun = gun
        this.bullets = bullets
        this.timer = timer
        this.counter = 0
        this.gunAngle = gunAngle
        this.bulletSize = bulletSize
        this.image = image
        // this.image = document.getElementById(image);d
    }

    draw(ctx, offset) {
        ctx.fillStyle = "red"
        ctx.fillRect(this.x - offset, this.y, this.width, this.height)
        // ctx.drawImage(this.image, sx, sy, swidth, sheight, drawx, drawy, width, height)
    }
    
    isRelevant(gameWidth, gameHeight) {
        if (this.x + this.width  < 0 || 
            this.x > gameWidth ||
             this.y + this.height < 0 || 
             this.y > gameHeight ) {
                this.relevant = false      
             }
    }

    // fire(bulletCount, width, height, speed, lift) {
    //     let gun = this
    //     for (let i = bulletCount; i > 0; i--){
    //     enemies.push(new Enemy(gun.x, gun.y, width, height, lift, speed))}
    // }

    update(gameWidth, gameHeight) {
        this.x += this.speed + this.relSpeed
        this.y -= this.lift
        if (this.x < 0 || this.x > gameWidth || this.y > gameHeight || this.y < 0) {
            this.relevant = false  // don't kick out of queue just don't draw
        }
    }

    fireControl() {
        // let that = this
        if (this.counter > this.timer) {
            for (let i = 0; i < this.bullets; i++){
               this.fire()
            }; this.counter = 0
        } else {this.counter++}

        // else {gunTimer++; console.log(gunTimer)}
    }

    fire() { 
        projectiles.push(new Projectile(this.x + this.width / 2, this.y + this.height / 2, this.bulletSize[0], this.bulletSize[1],
                                        this.gunAngle[0], this.gunAngle[1]))
                                    }

        }




class Projectile{
    constructor(x, y, width, height, speed, lift){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.lift = lift
        this.speed = speed
        this.relX = 0
        this.realX = this.relX + this.x
        this.relevant = true
    }

    draw(context, offset) {
        context.fillStyle = "yellow"
        context.fillRect(this.x - offset, this.y, this.width, this.height)
        // debugger
    }

    update() {
        this.x += this.speed
        this.y -= this.lift

    }

    isRelevant(gameWidth, gameHeight) {
        if (this.y + this.height < 0 ||
        this.y > gameHeight ||
        this.x + this.width < 0 ||
        this.x > gameWidth) {
            this.relevant = false
        }
    }
}

class InputHandler {
    constructor(){
        this.keys = []
        let input = this
        window.addEventListener('keydown', function(e){
            if ((e.key === 'w' ||
                e.key === 's' ||
                e.key === 'a' ||
                e.key === 'd') && !input.keys.includes(e.key)
                ) {input.keys.push(e.key)}

                console.log(input.keys)
        })

        window.addEventListener('keyup', function (e) {
            if ((e.key === 'w' ||
                e.key === 's' ||
                e.key === 'a' ||
                e.key === 'd')
                ) {input.keys.splice(input.keys.indexOf(e.key), 1)}

                console.log(input.keys)

        })
    }


}

class Background {
    constructor(gameWidth, gameHeight, image){      //x === 0-2400
        this.x = 0
        this.y = 0
        this.gameWidth = gameWidth
        this.width = this.x + this.gameWidth 
        // this.naturalWidth = naturalWidth
        this.gameHeight = gameHeight
        this.image = document.getElementById(image)
        this.speed = 0
        
    }

    
    update(player, context, naturalWidth) {
        // right side soft boundary 
        if (player.x > 3 * this.gameWidth / 4 && this.speed < 2 && this.width < naturalWidth) {this.speed += .03} 
        else if (player.x < 3 * this.gameWidth / 4 && this.speed > 0) 
        {this.speed -= .03}
        // left side soft boundary
        if (player.x < this.gameWidth / 4 && this.speed > -2 && this.x > 0) {this.speed -= .03} 
        else if (player.x > this.gameWidth / 4 && this.speed < 0 ) 
        {this.speed += .03}
        // right hard boundary
        if (this.x + this.gameWidth > naturalWidth) {this.x = naturalWidth - this.gameWidth - .01}
                // left hard boundary
        if (this.x < 0) {this.x = .01}
        // if ((player.x > this.gameWidth - player.width * 3) && (this.speed < 2) && (this.width < naturalWidth)) //and boundary conditions
        //     {this.speed += .3; player.relSpeed = -this.speed; console.log(this.width) }
        // else if (player.x < player.width * 3 && this.speed > -2)
        this.x += this.speed
        this.draw(context)
    }
    
        draw(context) {
            context.drawImage(this.image, this.x, 0, this.width, this.gameHeight, 0, 0, this.gameWidth, this.gameHeight )
        }
    
    

    backgroundHandler(){

    }

}
class Player  {
    constructor (gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.width = 60
        this.height = 30
        this.x = 0
        this.y = gameHeight - this.height
        this.relSpeed = 0
        this.speed = 0
        this.lift = 0
        this.alive = true
        this.pickup = false
        this.success = false
        this.direction = "forward"
        this.sprites = [[ 50, 110, 230, 68],
        [ 50 , 170, 230, 70],
         [50, 240, 230, 70],
        [ 50, 310, 230, 68]
        ]
        this.spriteNum = 0 
        this.counter = 0
        this.imageBackward = document.getElementById("game_sprites")
        this.imageForward = document.getElementById("game_sprites_forward")
}

    update(input) {
        // speed and lift
            // lift
        if (input.keys.includes('w') && this.lift < 2) {this.lift += .03}
        if (!input.keys.includes('w') && this.lift > 0) {this.lift -= .03}
        if (input.keys.includes('s') && this.lift > -2) {this.lift -= .02}
        if (!input.keys.includes('s') && this.lift < 0) {this.lift += .03}
            // speed
        if (input.keys.includes('a') && this.speed > -3) {this.speed -= .03; this.direction = "backward"}
        if (input.keys.includes('d') && this.speed < 3) {this.speed += .03; this.direction = "forward"}
        // boundary handling
        if ((this.x > 3 * this.gameWidth / 4 ) && this.speed > 0) {this.speed -= .04}
        if ((this.x < this.gameWidth / 4) && this.speed < 0) {this.speed += .04}
        if (this.y < this.height && this.lift > 0) {this.lift -=.4}
        if (this.y > this.gameHeight - this.height) {this.lift = 0; this.y = this.gameHeight - this.height; this.speed = 0}
        //position updating        
        this.x += this.speed + this.relSpeed
        this.y -= this.lift
        //sprite cycling
        if (this.counter > 10)
        {this.spriteNum++;
        this.spriteNum = this.spriteNum % 4; this.counter = 0} else {
            this.counter++
        }
    }

    draw(ctx) {
        if (this.direction === "backward") {
        ctx.drawImage(this.imageBackward, ...this.sprites[this.spriteNum], this.x, this.y, this.width, this.height)}
        else if (this.direction ==="forward") {
            ctx.drawImage(this.imageForward, ...this.sprites[this.spriteNum], this.x, this.y, this.width, this.height)
        }
        
    }

}

function collision (player, object) {
    if (player.x < object.x + object.width &&
        player.x + player.width > object.x &&
        player.y < object.y + object.height &&
        player.y + player.height > object.y)
    // if (Math.sqrt(px * px  + py * py)) + (Math.sqrt(ox * ox + oy * oy)) < (Math.sqrt((px - ox) * (px - ox) + (py - oy) * (py - oy)))
    {player.alive = false} 
    // else {player.alive = true}
}

class EnemyHandler{
    constructor(context, timer){
        this.context = context
        this.timer = timer
    }
     
    update(background) {
        for (let i = 0; i < enemies.length; i++) {
            let currentEnemy = enemies[i]
            // currentEnemy.relX = -background.x; 
            // debugger
            if  (currentEnemy.relevant) 
                {currentEnemy.draw(this.context, background.x); collision(player, currentEnemy)}
            
            if (currentEnemy.gun === true)
                {currentEnemy.fireControl()}

            currentEnemy.isRelevant(canvas.width, canvas.height)

            // if (!currentEnemy.relevant) {
            //     enemies.splice(enemies.indexOf(currentEnemy), 1)
            //     }

            console.log(player.alive)
        }
    }
    
}

class ProjectileHandler  {
    constructor(context) {
        this.context = context
    }

    update (background){
        for (let i = 0; i < projectiles.length; i++) {
            let currentProjectile = projectiles[i]

            currentProjectile.draw(this.context, background.x)
            currentProjectile.update()
            collision(player, currentProjectile)
            currentProjectile.isRelevant(canvas.width, canvas.height)
            if (!currentProjectile.relevant) {
                projectiles.splice(projectiles.indexOf(currentProjectile), 1)
            }
        }
    }

}

function gameOver(player) {
    if (!player.alive )
    {const endGame = document.createElement("h1")
    endGame.textContent = "Game Over"}
}



class EnemySpawner {
    constructor(timer, enemiesList) {
        this.timer = timer
        this.counter = 0
        this.enemiesList = enemiesList
    }

    // spawn(){
    //     if (this.counter > this.timer)
    //     {}
    // }

}

const bullets = new ProjectileHandler(ctx)
const input = new InputHandler()
const player = new Player(canvas.width, canvas.height) 
const background = new Background(canvas.width, canvas.height, "game_background")
const backgroundWidth = background.image.naturalWidth
// player.draw(ctx)
const baddies = new EnemyHandler(ctx, 500)
const newEnemy = new Enemy(canvas.width/2 , canvas.height - 50 , 50, 50, 0, 0, true, 1, 100, [-1, 1], [4,4])
const otherEnemy = new Enemy(canvas.width/1.2, canvas.height - 50, 50, 50, 0, 0, true, 1, 200, [0, 1], [5,5])
enemies.push(otherEnemy)
enemies.push(newEnemy)

// ctx.fillStyle = "green"
// ctx.fillRect(250, 100, 50, 50)

let lastTime = 0
let counter = 0 

function animate(timeStamp) {
    const frameRate = timeStamp - lastTime
    lastTime = timeStamp
    counter += frameRate
    ctx.clearRect(0,0,canvas.width, canvas.height)
    background.update(player, ctx, backgroundWidth)
    player.update(input)
    player.draw(ctx)
    // newEnemy.draw(ctx)
    bullets.update(background)
    baddies.update(background)
    gameOver(player)
    // console.log(timeStamp)
    if (player.alive ) {requestAnimationFrame(animate)}
    // if (player.alive) {requestAnimationFrame(animate)}
    //    if (player.alive && counter > 16) {counter = 0; requestAnimationFrame(animate)}
    //    else {animate(timeStamp)}
    
}

animate(0)