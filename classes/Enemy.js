import { GameOver, Run, checkpoints, projectiles, enemies, gameOver } from "../utils.js"
import { ProjectileHandler } from "./Projectile.js";

export class Enemy{
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
    }

    draw(ctx, offset) {
        this.collisionPos = this.x - offset
        if (this.gunAngle[0] === 0){
        ctx.drawImage(this.image, 0, 170, 215, 125, this.x - offset, this.y, this.width, this.height)}
        else 
        {ctx.drawImage(this.image, 220, 170, 215, 125, this.x - offset, this.y, this.width, this.height)}
        
    }
    
    isRelevant(gameWidth, gameHeight) {
        if (this.x + this.width  < 0 || 
            this.x - this.collisionPos > gameWidth ||
             this.y + this.height < 0 || 
             this.y > gameHeight ) {
                this.relevant = false      
             } else {this.relevant = true}
    }



    update(gameWidth, gameHeight) {
        this.x += this.speed
        this.y -= this.lift
        if (this.x < 0) {this.x = gameWidth } 
        if (this.x  > gameWidth) {this.x = 0 }
        if (this.y < 0 && this.y > gameHeight) {this.lift = (this.lift * -1)}
    }

    fireControl() {
        if (this.counter > this.timer) {
              { this.fire()
             this.counter = 0}
        } else {this.counter++}

    }

    fire() { 
        projectiles.push(new Projectile(this.x + this.width / 2, this.y + this.height / 2, 
            this.bulletSize[0], this.bulletSize[1],
            this.gunAngle[0], this.gunAngle[1]))
            }

}

export class EnemyHandler{
    constructor(context, ProjectileHandler){
        this.enemies = []
        this.context = context
        
    }
        
    enemiesArrayAdd (...enemies) {
        this.enemies = this.enemies.concat(...enemies)
        debugger
    }


    update(background, player) {
        debugger
        for (let i = 0; i < this.enemies.length; i++) {
            let currentEnemy = this.enemies[i];
                currentEnemy.update(background.naturalWidth, background.height); 
                    currentEnemy.draw(this.context, background.x); 
                    this.collision(player, currentEnemy)

            
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