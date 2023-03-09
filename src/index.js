import Example from "./scripts/example";


document.addEventListener("DOMContentLoaded", () => {
    //console.log("Hello, world!")
    const main = document.getElementById("main"); //grab div from index.html with id="main"
    new Example(main);
    
});

