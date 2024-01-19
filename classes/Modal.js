export default class Modal {
    constructor(status) {
        this.status = status
        this.gameModal
        this.modalTextObj = {modalText0: null,
                            modalText1: null,
                            modalText2: null,
                            modalText3: null}

        this.init()
    }

    init () {
        // debugger

        this.gameModal = document.createElement("div");
        this.gameModal.setAttribute("class", "gameModalHidden");
        this.gameModal.setAttribute("id", "modal");
        let header = document.querySelector("header");
        header.appendChild(this.gameModal);
        // create game modal, put it in header

        for (let i=0;i<4;i++) {
            let element = document.createElement("p")
            // this.modalTextList[i] = element
            element.setAttribute("class", `modalText modalText${i}`)
            this.gameModal.appendChild(element)
            this.setModalText("start")
        }
        // create and insert modal subheaders (with null text)

    }

    delete () {
            let gameModal = document.querySelector(".gameModal");
            gameModal?.remove();
            this.gameModal = null;

        // remove modal from DOM, set GameLoop instance variable to null
    }

    // modalToggle (on) {
    //     // "on" paramater should be true or null, to add or remove modal
    //     if (on) {
    //         this.gameModal = document.createElement("div");
    //         this.gameModal.setAttribute("class", "gameModal");
    //         this.gameModal.setAttribute("id", "modal");
    //         let header = document.querySelector("header");
    //         header.appendChild(this.gameModal);
    //         // create game modal, put it in header
    //     }
    //     else {
    //         let gameModal = document.querySelector(".gameModal");
    //         gameModal?.remove();
    //         this.gameModal = null;
    //         // remove modal from DOM, set GameLoop instance variable to null
    //     }
    
    // }
    
    modalHide (hide) {
        if (hide) {
            this.gameModal.setAttribute("class", "gameModalHidden")
        } else {
            this.gameModal.setAttribute("class", "gameModal")
        }
    }
    
    setModalText (status) {
        debugger
        if (this.status !== status) {

            this.status = status;

            let modalText0 = document.getSelection(".modalText0")
            let modalText1 = document.getSelection(".modalText1")
            let modalText2 = document.getSelection(".modalText2")
            let modalText3 = document.getSelection(".modalText3")

            let modalTextList = [
                                modalText0,
                                modalText1,
                                modalText2,
                                modalText3
                                ]

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
                    modalText0.innerText = "Welcome to HelloCopter! We at CapyCorp need you to rescue a capybara!";
                    modalText1.innerText = "The evil Dr. 404 kidnapped her for experiments! Hurry!";
                    modalText2.innerText = "Fly to the other side of the map, rescue her from Dr 404's Evil Tower of Science,";
                    modalText3.innerText = "and fly her back here!"
                
            }
            // debugger
            // for (let i=0;i<modalTextList.length;i++) {
            //     this.modalTextList[i].innerText = modalTextList[i]
            // }
        }
    }

    test () {
        let modalTest = document.getSelection(".modalText0")
        modalTest.innerText = "fart"
        console.log("fart")
    }

    
}