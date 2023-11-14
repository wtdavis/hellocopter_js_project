export class InputHandler {
    
    constructor(game){
        this.game = game
        this.keys = []
        let input = this
        window.addEventListener('keydown', function(e){
            if ((e.key === 'w' ||
                e.key === 's' ||
                e.key === 'a' ||
                e.key === 'd') && !input.keys.includes(e.key)
                ) {this.game.setInput(keys.push(e.key))}     
        })

        window.addEventListener('keyup', function (e) {
            if ((e.key === 'w' ||
                e.key === 's' ||
                e.key === 'a' ||
                e.key === 'd')
                ) {this.game.setInput(this.keys.splice(this.keys.indexOf(e.key), 1))}
        })
    }
}