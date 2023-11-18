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
        this.ctx = game.ctx
    }

    

    update (){
        let projectiles = this.game.projectiles
        for (let i = 0; i < projectiles.length; i++) {
            let currentProjectile = projectiles[i];
            currentProjectile.update();
            currentProjectile.draw(this.ctx, this.game.backgroundXOffset);
            this.collision(this.game.player, currentProjectile);
            currentProjectile.isRelevant(this.game.canvasWidth, this.game.canvasHeight)
            if (!currentProjectile.relevant) {
                this.game.removeProjectile(currentProjectile)
            }
        }
    }

    collision (player, projectile) {
        if (player.playerXYOffset[0] < projectile.collisionPos + projectile.width &&
            player.playerXYOffset[0] + player.width > projectile.collisionPos &&
            player.playerXYOffset[1] < projectile.y + projectile.height &&
            player.playerXYOffset[1] + player.height > projectile.y)
        // if (Math.sqrt(px * px  + py * py)) + (Math.sqrt(ox * ox + oy * oy)) < (Math.sqrt((px - ox) * (px - ox) + (py - oy) * (py - oy)))
        {player.alive = false} 
        // else {player.alive = true}
    }

}