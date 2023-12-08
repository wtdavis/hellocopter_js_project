import { GameOver, Run, checkpoints, projectiles, enemies, gameOver } from "../utils.js"


class Player  {
    constructor (game) {
        this.game = game
        this.ctx = game.ctx
        this.gameWidth = game.canvasWidth
        this.gameHeight = game.canvasHeight
        this.width = 60
        this.height = 30
        this.x = game.playerXYOffset[0]
        this.y = this.gameHeight - this.height
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
        this.backwardCapySprites = [[ 20, 370, 230, 100],
                            [260, 370, 230, 100],
                            [500, 370, 230, 100],  
                            [750, 370, 230, 100]
                            ]
        this.forwardCapySprites = [[ 20, 480, 230, 120],
                            [ 260 , 480, 230, 120],
                            [500, 480, 230, 120],
                            [750, 480, 230, 120]
                            ]
        this.spriteNum = 0 
        this.counter = 0
        this.image = document.getElementById("game_sprites")
}
    update() {
        let input = this.game.input
        if (input.includes('w') && this.lift < 2) {this.lift += .03}
        if (!input.includes('w') && this.lift > 0) {this.lift -= .03}
        if (input.includes('s') && this.lift > -2) {this.lift -= .02}
        if (!input.includes('s') && this.lift < 0) {this.lift += .03}
            // speed
        if (input.includes('a') && this.speed > -3) {this.speed -= .03; this.direction = "backward"}
        if (input.includes('d') && this.speed < 3) {this.speed += .03; this.direction = "forward"}

        //boundary handling
        if ((this.x > this.gameWidth - this.width * 3 ) && this.speed > 0) {this.speed -= this.speed / 30}
        if ((this.x < this.width * 3) && this.speed < 0) {this.speed += -this.speed/30}
        if (this.x > this.gameWidth - this.width) {this.speed = -.01; this.x = this.gameWidth - this.width - .01}
        if (this.x < this.width) {this.speed = .01; this.x = this.width + .01}
        if (this.y < 0) {this.lift = .01; this.y = 1}
        if (this.y > this.game.canvasHeight - this.height) {this.lift = -.01; this.y = this.game.canvasHeight - this.height - 1}

        this.x += this.speed + this.game.backgroundDX
        this.y -= this.lift
        //sprite cycling
        if (this.counter > 10)
        {this.spriteNum++;
        this.spriteNum = this.spriteNum % 4; this.counter = 0} else {
            this.counter++
        }
        this.game.setPlayerXYOffset([this.x, this.y])
        this.draw()
    }

    

    draw() {

        let game = this.game
        let playerX = game.playerXYOffset[0]
        let playerY = game.playerXYOffset[1]
        let sprites = []
        if (this.direction === "forward" ) {
            if (this.pickup) {
                sprites = this.forwardCapySprites[this.spriteNum]
            } else {
                sprites = this.forwardSprites[this.spriteNum]
            }
        } else if (this.direction === "backward") {
            if (this.pickup) {
                sprites = this.backwardCapySprites[this.spriteNum]
            } else {
                sprites = this.backwardSprites[this.spriteNum]
            }
        }

        // if (this.pickup = false) { 
        //     if (this.direction === "backward") {
        //         this.ctx.drawImage(this.image, ...this.backwardSprites[this.spriteNum], playerX - 20,  playerY - 10, this.width + 20, this.height + 10)}
        //         else if (this.direction ==="forward") {
        //             this.ctx.drawImage(this.image, ...this.forwardSprites[this.spriteNum], playerX - 20 , playerY - 10, this.width + 20, this.height + 10)
        //         }
        // } else {
        //     if (this.direction === "backward") {
        //     this.ctx.drawImage(this.image, ...this.backwardCapySprites[this.spriteNum], playerX - 20,  playerY - 10, this.width + 20, this.height + 10)}
        //     else if (this.direction ==="forward") {
        //         this.ctx.drawImage(this.image, ...this.forwardCapySprites[this.spriteNum], playerX - 20 , playerY - 10, this.width + 20, this.height + 10)
        //     }
        // }
    this.ctx.drawImage(this.image, ...sprites, playerX - 20, playerY - 10, this.width + 20, this.height + 10)        

    }


}   

export default Player