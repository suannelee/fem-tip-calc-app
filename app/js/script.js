var bill = 0;
var tip;
var noOfPeople = 0;
var tipsPerPerson = document.getElementById("tip-pp");
var totalPerPerson = document.getElementById("total-pp");
var tipPercentages = document.getElementsByClassName("tip-selector__pt");

var billInput = document.getElementById("bill-amount");
var noOfPeopleInput = document.getElementById("no-of-people");
var customTip = document.getElementById("custom-tip");

var billAlert = document.getElementById("bill-alert");
var noOfPplAlert = document.getElementById("noOfPpl-alert");

var labelAlert = document.getElementsByClassName("alert");
var inputAlert = document.getElementsByClassName("input-box")


/******************************************************************
                           RESET BUTTON
 *****************************************************************/

let resetButton = document.getElementsByClassName("reset-button")[0];

resetButton.addEventListener("click", function(){
    billInput.value = "";
    noOfPeopleInput.value = "";
    customTip.value ="";
    tipsPerPerson.innerHTML = "0.00";
    totalPerPerson.innerHTML = "0.00";
    for(var i = 0; i < inputAlert.length; i++){

        if(labelAlert[i]) labelAlert[i].classList.remove("trigger-warning");
        inputAlert[i].classList.remove("warning");
    }
    
    removeActiveClass()
})



/******************************************************************
                           BILL INPUT
 *****************************************************************/


billInput.addEventListener("input", function(event) {

    var inputElem = event.target;
    bill = inputElem.value;

    if (billAlert.classList.contains("trigger-warning")){
        billAlert.classList.remove("trigger-warning");
        inputElem.classList.remove("warning");
    }

    if(!bill || bill == 0){
        zeroWarning(inputElem, billAlert);
        tipsPerPerson.innerHTML = "0.00";
        totalPerPerson.innerHTML = "0.00";
    } else if (tip && noOfPeople){
        updateTotal();
        
    }
});



/******************************************************************
                           TIPS SELECTOR
 *****************************************************************/


for (var i = 0; i < tipPercentages.length; i++){
    tipPercentages[i].addEventListener("click", function(event){
        tip = event.target.innerHTML;
        tip = parseInt(tip) * 0.01;
        if(bill && noOfPeople){
            updateTotal();
        }
        removeActiveClass();
        customTip.value ="";
        event.target.classList.add("active");

    })

}

customTip.addEventListener("click", function(event) {
    removeActiveClass();
});


customTip.addEventListener("input", function(event) {
    tip = event.target.value;
    tip = tip * 0.01;
    if(bill && tip){
        if(noOfPeople) {
            updateTotal();
        } else {

        }
    }
});

function removeActiveClass() {
    for (var j = 0; j < tipPercentages.length; j++){
        if(tipPercentages[j].classList.contains("active")){
            tipPercentages[j].classList.remove("active");
        }
    }
}


/******************************************************************
                      NO OF PEOPLE INPUT
 *****************************************************************/


noOfPeopleInput.addEventListener("input", function(event) {
    var inputElem = event.target;
    noOfPeople = inputElem.value;

    if (noOfPplAlert.classList.contains("trigger-warning")){
        noOfPplAlert.classList.remove("trigger-warning");
        inputElem.classList.remove("warning");
    }

    if(!noOfPeople || noOfPeople == 0){
        zeroWarning(inputElem, noOfPplAlert);
        tipsPerPerson.innerHTML = "0.00";
        totalPerPerson.innerHTML = "0.00";
    } else if (bill && tip){
        updateTotal();
        
    }
});


/******************************************************************
                      TRIGGER WARNING
 *****************************************************************/


function zeroWarning(input, label){
    input.classList.add("warning");
    label.classList.add("trigger-warning");
}


/******************************************************************
                      UPDATE TOTAL
 *****************************************************************/

function updateTotal(){
    tipsPerPerson.innerHTML = (bill * tip / noOfPeople).toFixed(2);
    totalPerPerson.innerHTML = (bill * (1 + tip) / noOfPeople).toFixed(2);
}

