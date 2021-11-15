
function login_check() {
    let full_name = document.getElementById("name_checkout").value;
    let phone_number = document.getElementById("phone_checkout").value;

    document.getElementById("name_checkout").style.backgroundColor = "#FFFFFF";
    document.getElementById("phone_checkout").style.backgroundColor = "#FFFFFF";
    if (full_name == "" || full_name.length < 1 || !(check_name(full_name))) {

        document.getElementById("name_checkout").style.backgroundColor = "#ff6e6c";
        alert("Make sure your name is correct");
    }

    else if (phone_number == "" || phone_number.length < 11) {

        document.getElementById("phone_checkout").style.backgroundColor = "#ff6e6c";
        alert("Insert a Valid Phone Number");
    }

}

// checks the name to be only letters
function check_name(name) {

    var letters = new RegExp(/^[A-Za-z\\ " "]+ [A-Za-z\\ " "]+$/);
    return letters.test(name);

}

// checks the phone number to be only numbers
function check_phone(phone) {

    var digits = new RegExp(/[^0-9]/gi);
    phone.value = phone.value.replace(digits, "");

}

