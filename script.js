let myLibrary = [];

function Book() {
  //constructor
}

function addBookToLibrary() {
  // do stuff here
}



document.addEventListener("click",e=>{

    console.log(e.target.tagName)

    //for opening and closing new book popup
    if (e.target.id == "addIcon"){
        titleInput.value = "";
        authorInput.value = "";
        readInput.checked = false;


        newPopUp.style.display = "block";
        return;
    }else if (newPopUp.style.display=="block" && newPopUp.contains(e.target)==false){
        newPopUp.style.display = "none";
        return;
    }

    //for chaging status
    if (e.target.classList.contains("fullIcon")){
        e.target.classList.remove("fullIcon");
        e.target.classList.add("emptyIcon");
    } else if (e.target.classList.contains("halfIcon")){
        e.target.classList.remove("halfIcon");
        e.target.classList.add("fullIcon");
    }else if (e.target.classList.contains("emptyIcon")){
        e.target.classList.remove("emptyIcon");
        e.target.classList.add("halfIcon");
    }
});


addBtn.addEventListener("click", e=>{
    
    newRow = mainTable.insertRow(-1);

    newTitleCell =  newRow.insertCell(0);
    newAuthorCell =  newRow.insertCell(1);
    newReadCell =  newRow.insertCell(2);

    newTitleCell.innerHTML =  '<div class="textCell">'+titleInput.value+ '</div>' ;
    newAuthorCell.innerHTML =  '<div class="textCell">'+authorInput.value+ '</div>';

    newReadCell.classList.add("lastColTd");

    if(readInput.checked){
        newReadCell.innerHTML='<div class="lastColCell"><div class="fullIcon statusIcon tableIcon"></div><div class="tableIcon deleteIcon"></div></div>';
    }else{
        newReadCell.innerHTML='<div class="lastColCell"><div class="emptyIcon statusIcon tableIcon"></div><div class="tableIcon deleteIcon"></div></div>';
    };
      
    newPopUp.style.display = "none";
})
