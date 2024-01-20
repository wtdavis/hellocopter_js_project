export default class Modal {
    constructor(status) {
        this.status = status
        this.gameModal
        this.init()
    }

    init () {
        this.gameModal = document.createElement("div");
        this.gameModal.setAttribute("class", "gameModalHidden");
        this.gameModal.setAttribute("id", "modal");
        let header = document.querySelector("header");
        header.appendChild(this.gameModal);
        // create game modal, put it in header

        for (let i = 0; i <= 4; i++) {
            let element = document.createElement("p")
            element.setAttribute("class", `modalText modalText${i}`)
            this.gameModal.appendChild(element)
        }

        this.setModalText("start")
        // create and insert modal subheaders (with null text)
    }

    delete () {
            let gameModal = document.querySelector(".gameModal");
            gameModal?.remove();
            this.gameModal = null;
        // remove modal from DOM, set GameLoop instance variable to null
    }
 
    modalHide (hide) {
        if (hide) {
            this.gameModal.setAttribute("class", "gameModalHidden")
        } else {
            this.gameModal.setAttribute("class", "gameModal")
        }
    }
    
    setModalText (status) {
        if (this.status !== status) {

            this.status = status;

            let modalText0 = document.querySelector(".modalText0")
            let modalText1 = document.querySelector(".modalText1")
            let modalText2 = document.querySelector(".modalText2")
            let modalText3 = document.querySelector(".modalText3")

            if (status === "pause"){
                    modalText0.innerText = "Paused!";
                    modalText1.innerText = "Press \"p\" to unpause";
                    modalText2.innerText = null;
                    modalText3.innerText = null
                                
            }
            if (status === "defeat") {
                    modalText0.innerText = "Defeat!";
                    modalText1.innerText = "Don't give up! Press space to restart!";
                    modalText2.innerText = null;
                    modalText3.innerText = null
                                
            }
            if (status === "success") {
                    modalText0.innerText = "Success!";
                    modalText1.innerText = "You rescued our capybara friend! Champagne!";
                    modalText2.innerText = null;
                    modalText3.innerText = null
                                
            }
            if (status === "start") {
                    modalText0.innerText = "We need your help!";
                    modalText1.innerText = "Dr. 404 kidnapped our capybara friend!";
                    modalText2.innerText = "Rescue her from the other side of the map!";
                    modalText3.innerText = "Press 'space' to begin!"
            }
        }
    }
}