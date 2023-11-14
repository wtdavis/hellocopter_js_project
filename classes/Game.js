export class Game {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.input = [];
        this.backgroundXOffset;
        this.playerXOffset;
        this.projectiles = [];
        this.enemies = [];
        this.background;
        this.enemyHandler;
        this.projectileHandler;
        this.checkPointHandler;
        this.player;
        this.canvas = document.getElementById("game_canvas")
        this.ctx = this.canvas.getContext("2d")
        this.levelDimensions = document.getElementById("game_background")
        }

        setBackgroundXOffset (num) {
            this.backgroundXOffset = this.backgroundXOffset + num
        }

        setPlayerXOffset (num) {
            this.playerXOffset = this.playerXOffset + num
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