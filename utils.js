export let GameOver = false
export let Run = false
export let checkpoints = []
export let projectiles = []
export let enemies = []
// const backgroundImage = document.getElementById("game_background")
// const canvas = document.getElementById("game_canvas")
// const ctx = canvas.getContext("2d")

export function gameOver(player) {
    if (!player.alive)
    {GameOver =  true}
    if (player.success)
    {GameOver = true}
    if (GameOver === true && player.success === false) 
        {splash ("Defeat! Press R to Restart"); window.addEventListener('keydown', function (e) {if (e.key === 'r'){ restart()}})}
        else if (GameOver === true && player.success === true)
        {splash("Victory! Press R to Restart"); window.addEventListener('keydown', function (e) {if (e.key === 'r'){ restart()}})}
    // {const endGame = document.createElement("h1")
    // endGame.textContent = "Game Over"}
}