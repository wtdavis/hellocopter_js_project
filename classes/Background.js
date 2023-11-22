import { GameOver, Run, checkpoints, projectiles, enemies, gameOver } from "../utils.js"


export class Background {
    constructor(image, game){
        this.game = game      
        this.x = 0
        this.y = 0
        this.dXDY = [0, 0]
        this.canvasWidth = game.canvasWidth
        this.width = this.x + game.canvasWidth
        this.canvasHeight = game.canvasHeight
        this.image = document.getElementById(image)
        this.naturalWidth = this.image.naturalWidth
        this.speed = 0
    }


    update() {
        let ctx = this.game.ctx
        let playerX = this.game.playerXYOffset[0]
        let edgeLimit = this.canvasWidth / 4
        let rightEdgeLimit = this.canvasWidth - edgeLimit
        let backgroundX = this.game.getBackgroundXOffset()
        // 1/4 of the screen on each l/r edge is buffer
        // where player speed will be exchanged for map speed
        if (playerX < edgeLimit) {
            this.dXDY[0] = -(edgeLimit - playerX) / 50
            
            // background increases velocity "left" ie moves right 
            // to keep player on left side of screen
        } else if (playerX > rightEdgeLimit) {
            this.dXDY[0] = (playerX - rightEdgeLimit) / 50
        } else {
            this.dXDY[0] = 0
            // if player is in middle of screen, background sits still
        }

        // the reverse happens at the right side of the screen

        if (backgroundX <= 0) {
            this.game.setBackgroundXOffset(3, true)
        } else if (backgroundX > this.image.naturalWidth - this.canvasWidth) {
            this.game.setBackgroundXOffset(this.image.naturalWidth - this.canvasWidth - 1, true)
        }
        
        // when background encounters its own edges
        
        this.game.setBackgroundXOffset(this.dXDY[0])
        // console.log(this.game.getBackgroundXOffset())
        this.draw(ctx)
        // this.game.setTestNum(20)
        // console.log(this.game.getTestNum())

    }
    
    // update() {
    //     let player = this.game.playerXYOffset
    //     // right side soft boundary 
    //     if (player[0] > 3 * this.gameWidth / 4 && this.speed < 1.5 &&
    //         this.width < this.naturalWidth) 
    //             {this.speed += .03} 
    //         else if (player < 3 * this.gameWidth / 4 && this.speed > 0) 
    //             {this.speed -= .03}
    //     // left side soft boundary

    //     //this.game.playerXYVelocity = player.speed
    //     if (player < this.gameWidth / 4 && this.speed > -1.5 && this.x > 0)
    //             {this.speed -= .03} 
    //         else if (player > this.gameWidth / 4 && this.speed < 0 ) 
    //             {this.speed += .03}
    //     //player-background inverse speed relationship
    //     if (this.speed > 0 && player.speed > this.speed / 3)
    //         {player.speed -= this.speed * .1}
    //     if (this.speed < 0 && player.speed < this.speed / 3) 
    //         {player.speed -= this.speed * .1}
    //     // right side hard boundary
    //     if (this.x + this.gameWidth > this.naturalWidth) 
    //         {this.x = this.naturalWidth - this.gameWidth - .01; this.speed = 0}
    //     // left side hard boundary
    //     if (this.x < 0) 
    //         {this.x = .01; this.speed = 0}

    //     this.x += this.speed
    //     this.draw(this.game.ctx)
    //     debugger
    // }
    
        draw(ctx) {
            let image = this.image
            let imageWidth = image.naturalWidth
            let imageHeight = image.naturalHeight
            let backgroundX = this.game.getBackgroundXOffset()
            let playerXY = this.game.getPlayerXYOffset()
            // ctx.drawImage(image,    //image
            //               backgroundX,          //sourceX
            //               0,                      //sY
            //               imageWidth,          //sWidth
            //               imageHeight,          //sHeight
            //               0,          //destinationX
            //               0,          //dY
            //               this.canvasWidth,          //dWidth
            //               this.canvasHeight              //dHeight
            //                 )

            // dx, dy, dwidth, dheight

            ctx.drawImage(image, backgroundX, 0, imageWidth, imageHeight,
                            0, 0, 2400, this.canvasHeight
                        )
        }
    
    

    

}