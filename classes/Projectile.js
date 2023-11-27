import { GameOver, Run, checkpoints, projectiles, enemies, gameOver } from "../utils.js"


export class Projectile {
    constructor(game, x, y, width, height, speed, lift){
        this.game = game
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.lift = lift
        this.speed = speed
        this.collisionPos = 0
        this.relevant = true
    }

    draw() {
        let background = this.game.backgroundXOffset
        let ctx = this.game.ctx
        ctx.fillStyle = "yellow"
        this.collisionPos = this.x - background
        ctx.fillRect(this.collisionPos, this.y, this.width, this.height)
        // debugger
    }

    update() {
        this.x += this.speed
        this.y -= this.lift
    }

    isRelevant() {
        let gameWidth = this.game.backgroundDimensions.width
        let gameHeight = this.game.backgroundDimensions.height
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
        debugger
        if (player.playerXYOffset[0] < projectile.collisionPos + projectile.width &&
            player.playerXYOffset[0] + player.width > projectile.collisionPos &&
            player.playerXYOffset[1] < projectile.y + projectile.height &&
            player.playerXYOffset[1] + player.height > projectile.y)
        // if (Math.sqrt(px * px  + py * py)) + (Math.sqrt(ox * ox + oy * oy)) < (Math.sqrt((px - ox) * (px - ox) + (py - oy) * (py - oy)))
        {player.alive = false} 
        // else {player.alive = true}
    }

}