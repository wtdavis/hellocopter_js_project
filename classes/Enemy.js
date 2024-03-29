import { GameOver, Run, checkpoints, projectiles, enemies, gameOver } from "../utils.js"
import { ProjectileHandler } from "./Projectile.js";
import { Projectile } from "./Projectile.js";

export class Enemy{
    constructor(game, x, y, width, height, lift, speed, gun, timer, gunAngle, bulletSize) {
        this.game = game
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
        this.gameWidth = this.game.backgroundDimensions.width
        this.gameHeight = this.game.backgroundDimensions.height
        this.backwardSprites = [[0, 170, 220, 130], [230, 170, 220, 130]]
        this.forwardSprites  = [[460, 170, 230, 130], [690, 170, 220, 130]]
        this.stats = [this.x, this.y, this.speed]
    }

    draw() {
        let ctx = this.game.ctx
        this.collisionPos = this.x - this.game.backgroundXOffset
        let sprite = []
        if (this.speed > 0) {
            if (this.gunAngle[0] > 0) {
                sprite = this.forwardSprites[0]
            } else {
                sprite = this.forwardSprites[1]
            }
        } else {
            if (this.gunAngle[0] < 0) {
                sprite = this.backwardSprites[1]
            } else {
                sprite = this.backwardSprites[0]
            }

        }

        ctx.drawImage(this.image, ...sprite, this.x - this.game.backgroundXOffset, this.y - 10, this.width, this.height)
        
    }
    
    isRelevant() {
        if (this.x + this.width  < 0 || 
            this.x - this.collisionPos > this.gameWidth ||
             this.y + this.height < 0 || 
             this.y > this.gameHeight ) {
                this.relevant = false;
             } else {
                this.relevant = true; 
            }
    }

    

    update() {

        this.x += this.speed
        this.y -= this.lift
        if (this.x < 0) {this.x = this.gameWidth } 
        if (this.x  > this.gameWidth) {this.x = 0 }
        if (this.y < 0 && this.y > this.gameHeight) {this.lift = (this.lift * -1)}
    }

    fireControl() {
        if (this.counter > this.timer) {
              { this.fire()
             this.counter = 0}
        } else {this.counter++}

    }

    fire() { 
        // console.log(`fire at ${this.x}`)
        this.game.addProjectile(new Projectile(this.game, this.x + this.width / 2, this.y + this.height / 2, 
            this.bulletSize[0], this.bulletSize[1],
            this.gunAngle[0], this.gunAngle[1]))
            }

    
    reset () {
        this.x = this.stats[0]
    }

}

export class EnemyHandler{
    constructor(game){
        this.game = game
        this.enemies = []
        this.ctx = game.ctx
        
    }

    reset () {
        let enemies = this.game.enemies;
        for (let i=0; i<enemies.length;i++){
            enemies[i].reset()
        }
    }

    update() {
        let enemies = this.game.enemies
        for (let i = 0; i < enemies.length; i++) {
            let currentEnemy = enemies[i];
                currentEnemy.update(); 
                    currentEnemy.draw(); 
                    // debugger
                    this.collision(this.game.player, currentEnemy)

            
            if (currentEnemy.gun === true)
                {currentEnemy.fireControl()};

        }
    }
    
    collision (player, object) {
        if (player.x < object.collisionPos + object.width &&
            player.x + player.width > object.collisionPos &&
            player.y < object.y + object.height &&
            player.y + player.height > object.y)
        {player.alive = false} 
    }

    
}