
// import Canvas from "./canvas.js" ****modules! refactor



let enemies = []
const canvas = document.getElementById("game_canvas")
const ctx = canvas.getContext("2d")
canvas.width = 1000;
canvas.height = 500;
let guntimer = 0

class Enemy{
    constructor(x, y, width, height, lift, speed, gun, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.lift = lift;
        this.speed = speed;
        this.relevant = true;
        this.gun = gun
        // this.image = document.getElementById(image);
    }

    draw(ctx) {
        ctx.fillStyle = "white"
        ctx.fillRect(this.x, this.y, this.width, this.height)
        // context.drawImage(this.image, sx, sy, swidth, sheight, drawx, drawy, width, height)
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
        this.x += this.speed
        this.y -= this.lift
        if (this.x < 0 || this.x > gameWidth || this.y > gameHeight || this.y < 0) {
            this.relevant = false
        }
    }

    

    fire() {
        for (let i = 0; i < 3; i++) {
            setInterval(projectiles.push(new Projectile(this.x, this.y, 3, 3, 1, 1)), 2000)

        }
    }
}

let projectiles = []

class Projectile{
    constructor(x, y, width, height, lift, speed){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.lift = lift
        this.speed = speed
        this.relevant = true
    }

    draw(context) {
        context.fillStyle = "yellow"
        context.fillRect(this.x, this.y, this.width, this.height)
        // debugger
    }

    update() {
        this.x += this.speed
        this.y -= this.lift

    }

    isRelevant(gameWidth, gameHeight) {
        if (this.y + this.height < 0 ||
        this.y > gameHeight ||
        this.x + this.widhth < 0 ||
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

class Player  {
    constructor (gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.width = 60
        this.height = 30
        this.x = 0
        this.y = gameHeight - this.height
        this.speed = 0
        this.lift = 0
        this.alive = true
        this.pickup = false
        this.success = false
}

    update(input) {
        if (input.keys.includes('w') && this.lift < 2) {this.lift += .2}
        if (!input.keys.includes('w') && this.lift > 0) {this.lift -= .05}
        if (input.keys.includes('s') && this.lift > -3) {this.lift -= .2}
        if (!input.keys.includes('s') && this.lift < 0) {this.lift += .04}
        if (input.keys.includes('a') && this.speed > -3.5) {this.speed -= .1}
        if (input.keys.includes('d') && this.speed < 3.5) {this.speed += .1}
        if ((this.x > this.gameWidth - this.width * 2) && this.speed > 0) {this.speed -= .4}
        if ((this.x < this.width) && this.speed < 0) {this.speed += .4}
        if (this.y < this.height && this.lift > 0) {this.lift -=.4}
        if (this.y > this.gameHeight - this.height) {this.lift = 0; this.y = this.gameHeight - this.height; this.speed = 0}
        // if (this.y > this.gameHeight - 2 * this.height && this.lift < 0) {this.lift +=.1}

        // console.log(this.x)
        this.x += this.speed
        this.y -= this.lift
    }

    draw(ctx) {
        ctx.fillStyle = "white"
        ctx.fillRect(this.x, this.y, this.width, this.height)
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

function enemyHandler(context){
    
    for (let i = 0; i < enemies.length; i++) {
        let currentEnemy = enemies[i]
        currentEnemy.draw(context); collision(player, currentEnemy)
        // if (currentEnemy.gun === true)
        // {currentEnemy.fire()}
        currentEnemy.isRelevant(canvas.width, canvas.height)
            if (!currentEnemy.relevant) {
                enemies.splice(enemies.indexOf(currentEnemy), 1)
            }
    console.log(player.alive)

    }
    
}

function projectileHandler (context) {
    for (let i = 0; i < projectiles.length; i++) {
        let currentProjectile = projectiles[i]
        currentProjectile.draw(context)
        currentProjectile.update()
        currentProjectile.isRelevant(canvas.width, canvas.height)
        if (!currentProjectile.relevant) {
            projectiles.splice(projectiles.indexOf(currentProjectile), 1)
        }
    }
}

// let gunTimer = 0



// function enemySpawner() {
    

//     for (let i = 0; i < enemies.length; i++) {

//     }
// }

const input = new InputHandler()
const player = new Player(canvas.width, canvas.height) 
// player.draw(ctx)

const newEnemy = new Enemy(canvas.width/2 , canvas.height - 50 , 50, 50, 0, 0, true)
const otherEnemy = new Enemy(500, 250, 100, 20, 0, 0, false)
enemies.push(otherEnemy)
enemies.push(newEnemy)

ctx.fillStyle = "green"
ctx.fillRect(250, 100, 50, 50)

let lastTime = 0
let counter = 0 

function animate(timeStamp) {
    const frameRate = timeStamp - lastTime
    lastTime = timeStamp
    counter += frameRate
    ctx.clearRect(0,0,canvas.width, canvas.height)
    player.update(input)
    player.draw(ctx)
    // newEnemy.draw(ctx)
    enemyHandler(ctx)
    projectileHandler(ctx)
    // console.log(timeStamp)
    requestAnimationFrame(animate)
    // if (player.alive) {requestAnimationFrame(animate)}
    //    if (player.alive && counter > 16) {counter = 0; requestAnimationFrame(animate)}
    //    else {animate(timeStamp)}
    
}

animate(0)