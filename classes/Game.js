export class Game {
    constructor(gameDimensions) {
        
        this.input = [];
        this.backgroundXOffset = 0
        this.backgroundDX
        this.backgroundDXStore
    // player position variables
        this.playerXYOffset = [300, 0]
        this.playerXYVelocityStore = [0, 0]
        this.playerXYVelocity = [0, 0]
        // game objects
        this.projectiles = [];
        this.enemies = [];
        this.checkpoints = []
        this.background;
        this.player;
        //  game status 
        this.success = false
        this.run = false
        // background image and canvas and canvas 2d context 
        this.canvasWidth = gameDimensions[0]
        this.canvasHeight = gameDimensions[1]
        this.canvas = document.getElementById("game_canvas")
        this.canvas.height = this.canvasHeight
        this.canvas.width = this.canvasWidth
        this.ctx = this.canvas.getContext("2d")
        this.backgroundDimensions = document.getElementById("game_background")
        
        }

        getBackgroundXOffset() {
            return this.backgroundXOffset
        }

        setBackgroundXOffset (num, absolute=false) {
            // if (this.backgroundXOffset >= 0 && this.backgroundXOffset <= this.backgroundDimensions.width - this.canvasWidth) {
            // }
            if (absolute) {
                this.backgroundXOffset = num
            } else {
                this.backgroundXOffset = this.backgroundXOffset + num
            }

            this.backgroundDX = this.backgroundDXStore - this.backgroundXOffset
            this.backgroundDXStore = this.backgroundXOffset
        }

        getPlayerXYOffset() {
            return this.playerXYOffset

        }

        setPlayerXYOffset (numxy) {


            // this.playerXYOffset = [this.playerXYOffset[0] + numxy[0], this.playerXYOffset[1] + numxy[1]]
            this.playerXYOffset = numxy
            // adjust playerXYOffset, moving player across canvas based on arg numxy
            
            // debugger 
            
            let playerVelocityX = this.playerXYOffset[0] - this.playerXYVelocityStore[0] 
            let playerVelocityY = this.playerXYOffset[1] - this.playerXYVelocityStore[1]  
            
            this.playerXYVelocity = [playerVelocityX, playerVelocityY]

            this.playerXYVelocityStore = this.playerXYOffset
        }



        addProjectile (projectile) {
            this.projectiles.push(projectile)
        }

        removeProjectile (projectile) {
            console.log(`irrelevant at ${projectile.x}`)

            this.projectiles.splice(this.projectiles.indexOf(projectile), 1)
        }

        addEnemy (enemy) {
            this.enemies.push(enemy)
        }
    
        removeEnemy (enemy) {
            this.enemies = this.enemies.slice(this.enemies.indexOf(enemy), 1)
        }

        setInput(input) {
            this.input = input
        }

        setPlayer (player) {
            this.player = player
        }

        getPlayer () {
            return this.player
        }
    } 