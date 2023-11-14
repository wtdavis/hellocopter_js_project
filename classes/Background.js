import { GameOver, Run, checkpoints, projectiles, enemies, gameOver } from "../utils.js"


export class Background {
    constructor(gameWidth, gameHeight, image, game){
        this.game = game      
        this.x = 0
        this.y = 0
        this.
        this.
        this.gameWidth = game.canvasWidth
        this.width = this.x + game.canvasWidth
        this.gameHeight = game.canvasHeight
        this.image = document.getElementById(image)
        this.naturalWidth = this.image.naturalWidth
        this.speed = 0
    }

    
    update() {
        let player = this.game.playerXOffset
        // right side soft boundary 
        if (player.x > 3 * this.gameWidth / 4 && this.speed < 1.5 &&
            this.width < this.naturalWidth) 
                {this.speed += .03} 
            else if (player.x < 3 * this.gameWidth / 4 && this.speed > 0) 
                {this.speed -= .03}
        // left side soft boundary
        if (player.x < this.gameWidth / 4 && this.speed > -1.5 && this.x > 0)
                {this.speed -= .03} 
            else if (player.x > this.gameWidth / 4 && this.speed < 0 ) 
                {this.speed += .03}
        //player-background inverse speed relationship
        if (this.speed > 0 && player.speed > this.speed / 3)
            {player.speed -= this.speed * .1}
        if (this.speed < 0 && player.speed < this.speed / 3) 
            {player.speed -= this.speed * .1}
        // right side hard boundary
        if (this.x + this.gameWidth > this.naturalWidth) 
            {this.x = this.naturalWidth - this.gameWidth - .01; this.speed = 0}
        // left side hard boundary
        if (this.x < 0) 
            {this.x = .01; this.speed = 0}

        this.x += this.speed
        this.draw(this.game.ctx)
    }
    
        draw(context) {
            context.drawImage(this.image, this.x, 0, this.width, this.gameHeight, 0, 0, this.gameWidth, this.gameHeight )
        }
    
    

    

}