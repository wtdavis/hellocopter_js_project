import { GameOver, Run, checkpoints, projectiles, enemies, gameOver } from "../utils.js"


export class Projectile{
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
export class ProjectileHandler  {
    constructor(game) {
        this.game = game
        this.context = game.context
    }

    

    update (){
        for (let i = 0; i < this.game.projectiles.length; i++) {
            let currentProjectile = this.game.projectiles[i];
            currentProjectile.update();
            currentProjectile.draw(this.context, background.x);
            this.collision(player, currentProjectile);
            currentProjectile.isRelevant(background.naturalWidth, background.naturalHeight)
            if (!currentProjectile.relevant) {
                this.game.removeProjectile(pcurrentProjectile)
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