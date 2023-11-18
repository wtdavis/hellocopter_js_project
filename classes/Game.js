export class Game {
    constructor(gameDimensions) {
        
        this.canvasWidth = gameDimensions[0]
        this.canvasHeight = gameDimensions[1]
        this.input = [];
        this.backgroundXOffset;
        this.playerXYOffset = [0, 0]
        this.playerXYVelocity = [0, 0]
        this.projectiles = [];
        this.enemies = [];
        this.background;
        this.player;
        this.canvas = document.getElementById("game_canvas")
        this.ctx = this.canvas.getContext("2d")
        this.backgroundDimensions = document.getElementById("game_background")
        }

        setBackgroundXOffset (num) {
            this.backgroundXOffset = this.backgroundXOffset + num
        }

        setPlayerOffset (numxy) {
            this.playerXOffset = this.playerXOffset + numxy[0]
            this.playerYOffset = this.playerYOffset + numxy[1]
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
    } 