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
        this.y = game.playerXYOffset[1]
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

        // this.explosionSprites = [
        //     [46, 22, 70, 65],
        //     [150, 20, 80, 70],
        //     [260, 16, 110, 70],
        //     [370, 12, 110, 80],
        //     // first row
        //     [10, 90, 145, 90],
        //     [155, 90, 145, 90],
        //     [305, 90, 145, 90],
        //     // second row
        //     [10, 180, 145, 90],
        //     [155, 180, 145, 90],
        //     [305, 180, 145, 90],
        //     // third row
        //     [10, 275, 145, 90],
        //     [155, 275, 145, 90],
        //     [295, 275, 145, 90],
        //     // fourth row
        //     [10, 380, 145, 90],
        //     [155, 380, 145, 90],
        //     [295, 380, 145, 90]
        //     // bottom row
        // ]

        this.explosionSprites = [
            [0, 0, 150, 100],
            [0, 200, 150, 100],
            [0, 300, 150, 100],
            [0, 400, 150, 100],
            [0, 500, 150, 100],
            [0, 600, 150, 100],
            [0, 700, 150, 100],
            [0, 800, 150, 100],
            [0, 900, 150, 100],
            [0, 1000, 150, 100],
            [0, 1100, 150, 100],
            [0, 1200, 150, 100],
            [0, 1300, 150, 100],
            [0, 1400, 150, 100],
            [0, 1500, 150, 100],
            [0, 1600, 150, 100]  
        ]

        this.spriteNum = 0 
        this.counter = 0
        this.explosionCounter = 0
        this.explosionSpritesCounter = 0
        this.image = document.getElementById("game_sprites")
        this.explosions = document.getElementById("explosion_sprites")
}
    update() {
        let input = this.game.input
        this.x = this.game.playerXYOffset[0]
        this.y = this.game.playerXYOffset[1]
        // grab latest variable values from game instance 
        if (this.counter > 10)
        {this.spriteNum++;
        this.spriteNum = this.spriteNum % 4; this.counter = 0} else {
            this.counter++
        }
        // iterate sprite counter for player model
        
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
        
        this.game.setPlayerXYOffset([this.x, this.y])
        if (!this.alive) {
            this.game.alive = false
            this.explode()
        } else {
            this.draw()
        }
    }

    reset () {
        // this.game.playerXYOffset = [300, this.gameHeight - this.height - 20]
        
        this.x = this.game.playerXYOffset[0];
        this.y = this.game.playerXYOffset[1];
        this.speed = 0;
        this.lift = 0;
        this.alive = true;
        this.pickup = false;
        this.success = false;
        this.direction = "forward";

    }

    draw() {

        let game = this.game
        let playerX = game.playerXYOffset[0]
        let playerY = game.playerXYOffset[1]

        let sprites = []
        let size = []

        if (this.direction === "forward" ) {
            if (this.game.pickup) {
                size = [this.width + 10, this.height + 10]
                sprites = this.forwardCapySprites[this.spriteNum]
            } else {
                size = [this.width, this.height]
                sprites = this.forwardSprites[this.spriteNum]
            }
        } else if (this.direction === "backward") {
            if (this.game.pickup) {
                size = [this.width + 10, this.height + 10]
                sprites = this.backwardCapySprites[this.spriteNum]
            } else {
                size = [this.width, this.height]
                sprites = this.backwardSprites[this.spriteNum]
            }
        }
// produce correct sprite for forward / backward, with capy or without, correct size

    this.ctx.drawImage(this.image, ...sprites, playerX - 20, playerY - 10, size[0] + 20, size[1] + 10)        

    }

    explode () {
            this.explosionCounter++
        if (this.explosionCounter > 4) {
            this.explosionCounter = 0
            this.explosionSpritesCounter++
            if (this.explosionSpritesCounter > 15) {
                this.explosionSpritesCounter = 0
            }
        }
        let ctx = this.game.ctx
        let sprites = this.explosionSprites[this.explosionSpritesCounter]

            ctx.drawImage(this.explosions, ...sprites, this.game.playerXYOffset[0] - sprites[2]/2 + 80, this.game.playerXYOffset[1] - sprites[3]/2 + 40, sprites[2] - 20, sprites[3] - 20)
    }

   

}   

export default Player