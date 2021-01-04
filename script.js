let button = document.getElementById("calc");
let reset = document.getElementById("reset");
let print = document.getElementById("print");

let modalActive = false;
let somme = 0;

function checkButton(){
    button.addEventListener("mouseup",function (){
        if(!modalActive) {
            somme = 0;
            modalActive = checkInputValue();
        }
    });
    reset.addEventListener("mouseup",function (){
        somme = 0;
        let inputTab = document.getElementsByTagName("input");
        for(let value of inputTab){
            value.value = "";
            value.style.border = "none";
        }
        document.getElementById("resultatSumm").innerHTML = "";
    });
    print.addEventListener("mouseup",definePdf);
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
            value.style.border = "none";
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

function definePdf(){
    let result = document.getElementById("resultatSumm").innerHTML
    if(result !== ""){
        let divGlobalDepense = document.getElementById("depense");
        let sousDivDepense = divGlobalDepense.getElementsByClassName("calcule")[0];
        let inputTab = sousDivDepense.getElementsByTagName("input");

        let divGlobalRecette = document.getElementById("recette");
        let sousDivRecette = divGlobalRecette.getElementsByClassName("calcule")[0];
        let inputTabRecette = sousDivRecette.getElementsByTagName("input");

        let divGloablEpargne = document.getElementById("epargne");
        let sousDivEpargne = divGloablEpargne.getElementsByClassName("calcule")[0];
        let inputTabEpargne = sousDivEpargne.getElementsByTagName("input");

        let docDef = {
            content: [
                "Liste dépense :",
                {
                    ul: [
                        inputTab[0].placeholder + " " + inputTab[0].value + "€",
                        inputTab[1].placeholder + " " + inputTab[1].value + "€",
                        inputTab[2].placeholder + " " + inputTab[2].value + "€",
                        inputTab[3].placeholder + " " + inputTab[3].value + "€",
                        inputTab[4].placeholder + " " + inputTab[4].value + "€",
                        inputTab[5].placeholder + " " + inputTab[5].value + "€",
                        inputTab[6].placeholder + " " + inputTab[6].value + "€",
                        inputTab[7].placeholder + " " + inputTab[7].value + "€",
                        inputTab[8].placeholder + " " + inputTab[8].value + "€",
                        inputTab[9].placeholder + " " + inputTab[9].value + "€",
                        inputTab[10].placeholder + " " + inputTab[10].value + "€",
                        inputTab[11].placeholder + " " + inputTab[11].value + "€",
                        inputTab[12].placeholder + " " + inputTab[12].value + "€",
                    ]
                },
                " ",
                "Liste gain :",
                {
                    ul:[
                        inputTabRecette[0].placeholder + " " + inputTabRecette[0].value + "€",
                        inputTabRecette[1].placeholder + " " + inputTabRecette[1].value + "€",
                        inputTabRecette[2].placeholder + " " + inputTabRecette[2].value + "€",
                        inputTabRecette[3].placeholder + " " + inputTabRecette[3].value + "€",
                        inputTabEpargne[0].placeholder + " " + inputTabEpargne[0].value + "€",
                    ]
                },
                " ",
                "Total : " + somme + "€",
            ]
        };
        pdfMake.createPdf(docDef).open();
    }
}

checkButton();