
// import Canvas from "./canvas.js" ****modules! refactor


// let gunTimer = 0

class Enemy{
    constructor(x, y, width, height, lift, speed, gun, timer, gunAngle, bulletSize) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.lift = lift;
        this.speed = speed;
        this.collisionPos = 0
        this.relevant = true;
        this.gun = gun
        // this.bullets = bullets
        this.timer = timer
        this.counter = 0
        this.gunAngle = gunAngle
        this.bulletSize = bulletSize
        this.image = document.getElementById("game_sprites")
        // this.image = document.getElementById(image);d
    }

    draw(ctx, offset) {
        this.collisionPos = this.x - offset
        if (this.gunAngle[0] === 0){
        ctx.drawImage(this.image, 0, 170, 215, 125, this.x - offset, this.y, this.width, this.height)}
        else if (this.gunAngle[0] < 0)
        {ctx.drawImage(this.image, 220, 170, 215, 125, this.x - offset, this.y, this.width, this.height)}
        
        // ctx.fillStyle = "red"
        // ctx.fillRect(this.x - offset, this.y, this.width, this.height)
        // ctx.drawImage(this.image, sx, sy, swidth, sheight, drawx, drawy, width, height)
    }
    
    isRelevant(gameWidth, gameHeight) {
        if (this.x + this.width  < 0 || 
            this.x > gameWidth ||
             this.y + this.height < 0 || 
             this.y > gameHeight ) {
                this.relevant = false      
             } else {this.relevant = true}
    }

    // fire(bulletCount, width, height, speed, lift) {
    //     let gun = this
    //     for (let i = bulletCount; i > 0; i--){
    //     enemies.push(new Enemy(gun.x, gun.y, width, height, lift, speed))}
    // }

    update(gameWidth, gameHeight) {
        this.x += this.speed
        this.y -= this.lift
        // if (this.x < 0 + this.collisionPos ) {this.x = gameWidth } 
        // if (this.x > gameWidth) {this.x = 0 + this.collisionPos}
        // if (this.y < 0 && this.y > gameHeight) {this.lift = (this.lift * -1)}
    }

    fireControl() {
        // let that = this
        if (this.counter > this.timer) {
            
              { this.fire()
             this.counter = 0}
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
        this.collisionPos = 0
        this.relevant = true
    }

    draw(context, offset) {
        context.fillStyle = "yellow"
        this.collisionPos = this.x - offset
        context.fillRect(this.collisionPos, this.y, this.width, this.height)
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
    // debugger
    constructor(){
        this.keys = []
        let input = this
        window.addEventListener('keydown', function(e){
            if ((e.key === 'w' ||
                e.key === 's' ||
                e.key === 'a' ||
                e.key === 'd') && !input.keys.includes(e.key)
                ) {input.keys.push(e.key)}

                // console.log(input.keys)
        })

        window.addEventListener('keyup', function (e) {
            if ((e.key === 'w' ||
                e.key === 's' ||
                e.key === 'a' ||
                e.key === 'd')
                ) {input.keys.splice(input.keys.indexOf(e.key), 1)}

                // console.log(input.keys)

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
    
    

    // backgroundHandler(){

    // }

}

class Player  {
    constructor (gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.width = 60
        this.height = 30
        this.x = 50
        this.y = gameHeight - this.height
        this.relSpeed = 0
        this.speed = 0
        this.lift = 0
        this.alive = true
        this.pickup = false
        this.success = false
        this.direction = "forward"
        this.forwardSprites = [[ 0, 80, 230, 80],
        [ 250 , 80, 230, 80],
         [500, 80, 230, 80],
        [725, 80, 230, 80]
        ]
        this.backwardSprites = [[ 20, 0, 230, 80],
        [ 250 , 0, 230, 80],
         [500, 0, 230, 80],
        [750, 0, 230, 80]
        ]
        this.spriteNum = 0 
        this.counter = 0
        this.image = document.getElementById("game_sprites")
        // this.imageForward = document.getElementById("game_sprites_forward")
}

    update(input, context) {
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
        if ((this.x > this.gameWidth - this.width * 3 ) && this.speed > 0) {this.speed -= this.speed / 30}
        if ((this.x < this.width * 3) && this.speed < 0) {this.speed += -this.speed/30}
        if (this.x > this.gameWidth - this.width) {this.speed = -.01; this.x = this.gameWidth - this.width - .01}
        if (this.x < this.width) {this.speed = .01; this.x = this.width + .01}

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
        this.draw(context)
    }

    draw(ctx) {
        if (this.direction === "backward") {
        ctx.drawImage(this.image, ...this.backwardSprites[this.spriteNum], this.x, this.y, this.width, this.height)}
        else if (this.direction ==="forward") {
            ctx.drawImage(this.image, ...this.forwardSprites[this.spriteNum], this.x, this.y, this.width, this.height)
        }
        
    }


}

function collision (player, object) {
    if (player.x < object.collisionPos + object.width &&
        player.x + player.width > object.collisionPos &&
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
     
    update(background, player) {
        for (let i = 0; i < enemies.length; i++) {
            let currentEnemy = enemies[i];
            if  (currentEnemy.relevant)
                {currentEnemy.update(background.width, background.height); 
                    currentEnemy.draw(this.context, background.x); 
                    this.collision(player, currentEnemy)
                    };
            
            if (currentEnemy.gun === true)
                {currentEnemy.fireControl()};

            currentEnemy.isRelevant(canvas.width, canvas.height)

            // console.log(player.alive)
        }
    }
    
    collision (player, object) {
        if (player.x < object.collisionPos + object.width &&
            player.x + player.width > object.collisionPos &&
            player.y < object.y + object.height &&
            player.y + player.height > object.y)
        // if (Math.sqrt(px * px  + py * py)) + (Math.sqrt(ox * ox + oy * oy)) < (Math.sqrt((px - ox) * (px - ox) + (py - oy) * (py - oy)))
        {player.alive = false} 
        // else {player.alive = true}
    }
}

class ProjectileHandler  {
    constructor(context) {
        this.context = context
    }

    update (background, player){
        for (let i = 0; i < projectiles.length; i++) {
            let currentProjectile = projectiles[i];
            currentProjectile.update();
            currentProjectile.draw(this.context, background.x);
            this.collision(player, currentProjectile);
            currentProjectile.isRelevant(canvas.width, canvas.height)
            if (!currentProjectile.relevant) {
                projectiles.splice(projectiles.indexOf(currentProjectile), 1)
            }
        }
    }

    collision (player, object) {
        if (player.x < object.collisionPos + object.width &&
            player.x + player.width > object.collisionPos &&
            player.y < object.y + object.height &&
            player.y + player.height > object.y)
        // if (Math.sqrt(px * px  + py * py)) + (Math.sqrt(ox * ox + oy * oy)) < (Math.sqrt((px - ox) * (px - ox) + (py - oy) * (py - oy)))
        {player.alive = false} 
        // else {player.alive = true}
    }

}

function gameOver(player) {
    if (!player.alive )
    {const endGame = document.createElement("h1")
    endGame.textContent = "Game Over"}
}



// class EnemySpawner {
//     constructor(timer, enemiesList) {
//         this.timer = timer
//         this.counter = 0
//         this.enemiesList = enemiesList
//     }

 class Checkpoint {
    constructor( x, y, width, height, type){
        // this.context = context
        this.type = type
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.image = document.getElementById("game_sprites")
        this.collisionPos = 0
        this.sprites = [[655, 200, 150, 130], [820, 200, 150, 130]]
        this.spriteNum = 0
        this.timer = 50
        this.counter = 0

    }

    update(context, background, player){
        if (this.counter > this.timer)
        {this.spriteNum++; this.spriteNum = this.spriteNum % 2; this.counter = 0}
        else
        { this.counter++}
        this.draw(context, background.x)
            console.log(player.pickup)
            console.log(player.success)
    }

    draw(context, offset){
        this.collisionPos = this.x - offset
        // context.fillStyle = "red"
        context.drawImage(this.image, ...this.sprites[this.spriteNum], this.x - offset, this.y, this.width, this.height)
        // context.drawImage(this.image, sx, sy, swidth, sheight, this.x, this.y, this.width, this.height)
    }

    
 }

 class CheckpointHandler {
        constructor(){
            
        }

        update(context, background, player){
        for (let i = 0; i < checkpoints.length; i++){
            checkpoints[i].update(context, background, player);
            this.collision(player, checkpoints[i])
            // console.log(player.pickup)
            // console.log(player.success)

        }}

        collision (player, object) {
            if ((player.x < object.collisionPos + object.width &&
                player.x + player.width > object.collisionPos &&
                player.y < object.y + object.height &&
                player.y + player.height > object.y) ) 
                    {if (object.type === "destination") {player.pickup = true} 
                     else if (object.type === "origin" && player.pickup === true)
                        {player.success = true}
        }
 }
}

const input = new InputHandler()


let checkpoints = []
let projectiles = []
let enemies = []
const backgroundImage = document.getElementById("game_background")
const canvas = document.getElementById("game_canvas")
const ctx = canvas.getContext("2d")

canvas.width = (window.innerWidth - 20)
canvas.height = backgroundImage.naturalHeight
const background = new Background(canvas.width, canvas.height, "game_background")
const player = new Player(canvas.width, canvas.height) 

const start = new Checkpoint( 50, canvas.height - 100, 100, 100, "origin")
const end = new Checkpoint( 2200 , canvas.height - 100, 100, 100, "destination")




const bullets = new ProjectileHandler(ctx)
 const baddies = new EnemyHandler(ctx, 500)
 const bases = new CheckpointHandler(ctx, background, player)
 
 const newEnemy = new Enemy(canvas.width/2 , canvas.height - 50 , 50, 50, 0, 0, true, 100, [-1, 1], [4,4])
 const otherEnemy = new Enemy(canvas.width/1.2, canvas.height - 50, 50, 50, 0, 0, true, 200, [0, 1], [5,5])
 const skyEnemy = new Enemy(canvas.width/1.2, canvas.height - 50, 50, 50, 0, 0, true, 200, [0, 1], [5,5])

 enemies.push(otherEnemy)
 enemies.push(newEnemy)
 checkpoints.push(start, end)

//  const start = new Checkpoint( canvas.width/24, canvas.height - canvas.height/20, canvas.width/ 240, canvas.height/20, "origin")
//  const end = new Checkpoint( 23 * canvas.width/24, canvas.height - canvas.height/20, canvas.width/ 240, canvas.height/20, "destination")
//  checkpoints.push(...[start, end])
 

let lastTime = 0
let counter = 0 

function animate(timeStamp) {
    // const frameRate = timeStamp - lastTime
    // lastTime = timeStamp
    // counter += frameRate
    ctx.clearRect(0,0,canvas.width, canvas.height)
    background.update(player, ctx, background.image.naturalWidth)
    bases.update(ctx, background, player)
    player.update(input, ctx)
    bullets.update(background, player)
    baddies.update(background, player)
    gameOver(player)
    if (player.alive ) {requestAnimationFrame(animate)}    
}

animate(0)