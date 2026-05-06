"use strict";

document.querySelector("#submit-button").addEventListener("click", loginUser);
document.querySelector("#register-button").addEventListener("click", () => {
    console.log("Registrering");
});

function loginUser() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const errorsEl = document.querySelector("#errors");

    errorsEl.innerHTML = "";

    const errors = [];

    if (!username || !password) {
        errors.push("Du måste fylla i både användarnamn och lösenord.");
    }

    //Skriv ut eventuella felmeddelanden
    if (errors.length !== 0) {
        errors.forEach(error => {
            errorsEl.innerHTML += error;
        })
    } else {
        console.log("Inloggning lyckades");
    }
}
