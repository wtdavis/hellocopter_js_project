import { GameOver, Run, checkpoints, projectiles, enemies, gameOver } from "../utils.js"


export class Checkpoint {
    constructor( x, y, width, height, type, num){
        // this.context = context
        this.type = type
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.image = document.getElementById("base_sprites")
        this.collisionPos = 0
        this.sprites = [[150, 260, 210, 90], [320, 70, 140, 140], [150, 70, 140, 140]]
        this.spriteNum = num
        this.timer = 50
        this.counter = 0
    }

    update(game){
        let ctx = game.ctx
        // if (this.counter > this.timer)
        // {this.spriteNum++; this.spriteNum = this.spriteNum % 2; this.counter = 0}
        // else
        // { this.counter++}
        if (this.type === "destination" && game.pickup === true) {
            this.spriteNum = 2
        } else if (this.type === "destination" && game.pickup === false) {
            this.spriteNum = 1
        }

        this.draw(ctx, game.backgroundXOffset) 
    }

    draw(context, offset){
        this.collisionPos = this.x - offset
        // context.fillStyle = "red"
        context.drawImage(this.image, ...this.sprites[this.spriteNum], this.x - offset, this.y - this.height / 5, this.width + this.width / 5 , this.height + this.height / 5)
        // context.drawImage(this.image, sx, sy, swidth, sheight, this.x, this.y, this.width, this.height)
    }
 }

 export class CheckpointHandler {
        constructor(game){
            this.game = game
            this.ctx = game.ctx
        }

        update(){
            let checkpoints = this.game.checkpoints
            let player = this.game.player
            let game = this.game
        for (let i = 0; i < checkpoints.length; i++){
            checkpoints[i].update(this.game);
            this.collision(game, checkpoints[i])
        }
        }

        collision (game, object) {
            let xPosition = object.x - game.backgroundXOffset
            
            if (game.playerXYOffset[0] < xPosition + object.width &&
                game.playerXYOffset[0] + game.playerWidth > xPosition &&
                game.playerXYOffset[1] < object.y + object.height &&
                game.playerXYOffset[1] + game.playerHeight > object.y) { 
                    if (object.type === "destination") {
                        game.pickup = true;
                        console.log("checkpoint")
                    } else if (object.type === "origin" && game.pickup === true) {
                        game.success = true;
                        console.log("checkpoint")
                    }
            }
        }
}