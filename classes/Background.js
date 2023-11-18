import { GameOver, Run, checkpoints, projectiles, enemies, gameOver } from "../utils.js"


export class Background {
    constructor(image, game){
        this.game = game      
        this.x = 0
        this.y = 0
        this.gameWidth = game.canvasWidth
        this.width = this.x + game.canvasWidth
        this.gameHeight = game.canvasHeight
        this.image = document.getElementById(image)
        this.naturalWidth = this.image.naturalWidth
        this.speed = 0
        debugger
    }

    
    update() {
        let player = this.game.playerXYOffset
        // right side soft boundary 
        if (player[0] > 3 * this.gameWidth / 4 && this.speed < 1.5 &&
            this.width < this.naturalWidth) 
                {this.speed += .03} 
            else if (player < 3 * this.gameWidth / 4 && this.speed > 0) 
                {this.speed -= .03}
        // left side soft boundary

        //this.game.playerXYVelocity = player.speed
        if (player < this.gameWidth / 4 && this.speed > -1.5 && this.x > 0)
                {this.speed -= .03} 
            else if (player > this.gameWidth / 4 && this.speed < 0 ) 
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
            context.drawImage(this.image, this.x, 0, this.naturalWidth, this.image.naturalHeight )
        }
    
    

    

}