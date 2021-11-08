
function login_check(){
    let full_name = document.getElementById("name_checkout").value;
    let phone_number = document.getElementById("phone_checkout").value;
    
    
    if(full_name == "" || full_name.length < 1){

        document.getElementById("name_checkout").style.backgroundColor = "#ff6e6c";
        alert("Name Too Short");
    }

    else if(phone_number == "" || phone_number.length < 11){

        document.getElementById("phone_checkout").style.backgroundColor = "#ff6e6c";
        alert("Phone Number Not Valid");
    }

}

// checks the name to be only letters
function check_name(name) {

    var letters = /[^a-z\\" "]/gi;
    name.value = name.value.replace(letters, "");
}
// checks the phone number to be only numbers
function check_phone(phone) {

    var digits = /[^0-9]/gi;
    phone.value = phone.value.replace(digits, "");
}
