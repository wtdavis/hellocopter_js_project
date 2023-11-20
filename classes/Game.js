export class Game {
    constructor(gameDimensions) {
        
        this.canvasWidth = gameDimensions[0]
        this.canvasHeight = gameDimensions[1]
        this.input = [];
        this.backgroundXOffset = 0
        this.playerXYOffset = [0, 0]
        this.playerXYVelocity = [0, 0]
        this.projectiles = [];
        this.enemies = [];
        this.background;
        this.player;
        this.canvas = document.getElementById("game_canvas")
        this.canvas.height = this.canvasHeight
        this.canvas.width = this.canvasWidth
        this.ctx = this.canvas.getContext("2d")
        this.backgroundDimensions = document.getElementById("game_background")
        this.testNum = 0
        }

        getBackgroundXOffset() {
            return this.backgroundXOffset
        }

        setBackgroundXOffset (num) {
            // if (this.backgroundXOffset >= 0 && this.backgroundXOffset <= this.backgroundDimensions.width - this.canvasWidth) {
            // }
            this.backgroundXOffset = this.backgroundXOffset + num
        }

        getPlayerXYOffset() {
            return this.playerXYOffset

        }

        setPlayerXYOffset (numxy) {
            this.playerXYOffset = numxy
        }


        addProjectile (projectile) {
            this.projectiles.push(projectile)
        }

        removeProjectile (projectile) {
            this.projectiles = this.projectiles.slice(this.projectiles.indexOf(projectile), 1)
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

        setTestNum(num) {
            this.testNum = num
            return this.testNum
        }

        getTestNum () {
            return this.testNum
        }
    } 