export class InputHandler {
    
    constructor(game){
        this.game = game
        this.keys = []
        let input = this
        window.addEventListener('keydown', (e) => {
            if ((e.key === 'w' ||
                e.key === 's' ||
                e.key === 'a' ||
                e.key === 'd') && !input.keys.includes(e.key)
                ) {
                    this.keys.push(e.key); 
                    this.game.setInput(this.keys)
                    
                }     
        })

        window.addEventListener('keyup', (e) => {
            if ((e.key === 'w' ||
                e.key === 's' ||
                e.key === 'a' ||
                e.key === 'd')
                ) {
                    this.keys.splice(this.keys.indexOf(e.key), 1); 
                    this.game.setInput(this.keys)
                    
                }
        })
    }
}