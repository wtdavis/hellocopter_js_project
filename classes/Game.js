export class Game {
    constructor(gameDimensions) {
        this.canvasWidth = gameDimensions[0]
        this.canvasHeight = gameDimensions[1]
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
        this.ctx = canvas.getContext("2d")
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

    } 