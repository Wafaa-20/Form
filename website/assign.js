function validateForm() {
    var regName = /^(?=.{2,20}$)[a-zA-Z]+$/; //check that entered name is only letters, and range between 2,20 letter
    var regEmail = /^\S+@\S+\.\S+$/;
    var regPhone = /^9665\d{8}$/;

    
    //firstname
    var Fullname = document.getElementById("Fullname");
    if (Fullname == " ") {
        alert("Full Name must be filled out");
        return false;
    }
    else if (!Fullname.value.match(regName))
    {
        alert("Full name should contain letters only!");
        return false;
    }

    //email validity check: not null and correct format
    var email = document.getElementById("email");
    if (email.value == " " || !email.value.match(regEmail)) {
        alert("Email is required, please check if the email is valid (CORROECT FORMAT: name@domain.com)");
        return false;
    }


    var contact = document.getElementById("contact");
    if(contact == " " )
    {
        alert("Number must be fill out..");
        return false;
    }
    else if (contact.value.length != 12 || !contact.value.match(regPhone)) {
        alert("Please enter the correct phone number");
        //alert("Length 10 numeric long, Please Try Again");
        return false;
    }

    const gender = document.getElementById("gender");
    if(gender == " "){
        alert("Please select your gender");
        return false;
    }


    let serviceList = document.getElementById("serviceList");
    if(serviceList == " "){
        alert("Please choose a service");
        return false;
    }

    //comments section chack that it's not empty
    let details = document.getElementById("details");
    if(details == " " ) {

        alert("Dedail must be fill out..");
        return false;
    }    
}


//--------------------------- THE JQUERY ---------------------------
$(document).ready(function(){
    $("#clearButton").click(function(){
      alert("font color is " + $("p").css("color"));
    });
});



//function clear will clear all inputs
function clearAll() {
document.getElementById("FirstName").value = "";
document.getElementById("gender").value ="";
document.getElementById("birthDate").value ="";
document.getElementById("myFile").value ="";
document.getElementById("email").value ="";
document.getElementById("due").value ="";
document.getElementById("mobile").value ="";
document.getElementById("details").value ="";
document.getElementById("serviceList").value ="";
}

//function start will add event listener to activate submit button and clear button
function start() {
    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", validateForm, false);

    var clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", clearAll, false);
}
window.addEventListener("load", start, false);








