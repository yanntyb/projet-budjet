let button = document.getElementById("calc");
let reset = document.getElementById("reset");
let modalActive = false;
let somme = 0;

function checkButton(){
    button.addEventListener("mouseup",function (){
        if(!modalActive) {
            somme = 0;
            modalActive = checkInputValue();
        }
    })
    reset.addEventListener("mouseup",function (){
        somme = 0;
        let inputTab = document.getElementsByTagName("input");
        for(let value of inputTab){
            value.value = "";
            value.style.border = "none"
        }
        document.getElementById("resultatSumm").innerHTML = "";
    })
}

function checkInputValue(){
    let inputTab = document.getElementsByTagName("input");
    let tabValueToPlace = [];
    for(let value of inputTab){
        if(value.value !== "" && !isNaN(parseInt(value.value))){
            if(
                value.placeholder.includes("Salaire") ||
                value.placeholder.includes("Aides") ||
                value.placeholder.includes("Rentes") ||
                value.placeholder.includes("Autres") ||
                value.placeholder.includes("Epargne")
            ){
                somme += parseFloat(value.value);
            }
            else{
                somme -= parseFloat(value.value);
            }
        }
        else if(value.value === "" || isNaN(parseInt(value.value))) {
            tabValueToPlace.push(value.placeholder)
            value.style.border = "1px solid red"
            value.value = "";
        }
    }
    if(tabValueToPlace.length !== 0){
        showBoxToPlace(tabValueToPlace);
        return true
    }
    else {
        showResult();
    }
}

function showBoxToPlace(toPlaceTab){
    let div = document.createElement("div");
    let h1 = document.createElement("h1");
    h1.innerHTML = "Element a completer";
    div.append(h1)
    div.style.width = "30vw";
    div.style.height = "min-content";
    div.style.zIndex = "10000";
    div.style.position = "absolute"
    div.style.top = "20vh";
    div.style.left = "35vw";
    div.id = "toPlace";
    for(let value of toPlaceTab){
        div.innerHTML += value + "<br>"
    }
    document.body.append(div);
    window.setTimeout(function(){
        window.addEventListener("click", checkOutModal,false);
    },1);

}

function checkOutModal(event){
    if(modalActive){
        if(!document.getElementById("toPlace").contains(event.target)){
            modalActive = false;
            window.removeEventListener("click",  checkOutModal);
            document.body.removeChild(document.getElementById("toPlace"));
        }
    }
}

function showResult(){
    let message;
    let div = document.getElementById("resultatSumm");
    if(somme < 0){
        message = "Vous etes dans le negatif ! Vous devez : "
    }
    else {
        message = "Vous avez actuelement : "
    }
    div.innerHTML = message + "<br>" + parseFloat(somme) + "€";
}

checkButton();