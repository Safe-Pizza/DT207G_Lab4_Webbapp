"use strict";

//eventlyssnare för login och register knappar
document.querySelector("#submit-button").addEventListener("click", loginUser);
document.querySelector("#register-button").addEventListener("click", createUser);

//funktion för login, validera input och skicka till funktion som anropar webbtjänst
function loginUser() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const errorsEl = document.querySelector("#errors");

    errorsEl.innerHTML = "";

    const errors = [];

    //kontrollera att både användarnamn och lösenord är ifyllt
    if (!username || !password) {
        errors.push(`<li>Du måste fylla i både användarnamn och lösenord</li>`);
    }

    //Skriv ut eventuella felmeddelanden
    if (errors.length !== 0) {
        errors.forEach(error => {
            errorsEl.innerHTML += error;
        })
    } else {
        requestLogin(username, password);
    }
}

//funktion för att skapa användare, validerar input och skicka till funktion som anropar webbtjänst
function createUser() {
    const username = document.querySelector("#reg-username").value;
    const password = document.querySelector("#reg-password").value;
    const confirmPassword = document.querySelector("#reg-confirm-password").value;
    const errorsEl = document.querySelector("#errors-reg");

    errorsEl.innerHTML = "";

    const errors = [];

    //kontrollera att både användarnamn, lösenord och bekräftelse av lösenord är ifyllt
    if (!username || !password || !confirmPassword) {
        errors.push(`<li>Du måste fylla i både användarnamn och lösenord</li>`);
    }

    //kontrollera att lösenord och bekräftelse av lösenord matchar
    if (password !== confirmPassword) {
        errors.push(`<li>Lösenorden matchar inte, kontrollera att du skrivit rätt och försök igen</li>`);
    }

    //Skriv ut eventuella felmeddelanden
    if (errors.length !== 0) {
        errors.forEach(error => {
            errorsEl.innerHTML += error;
        })
    } else {
        requestCreateUser(username, password);
    }
}

//funktion för loginförsök till webbtjänst, sparar token vid lyckat login, skickar användare till admin.html
async function requestLogin(username, password) {
    try {
        const res = await fetch("https://dt207g-laboration4.onrender.com/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        if (!res.ok) {
            throw new Error("Misslyckades att logga in");
        } else {
            const data = await res.json();
            localStorage.setItem("admin_token", data.token);
            window.location.href = "admin.html";
        }
    } catch (error) {
        console.error(`Något gick fel: ${error}`);
    };
}

//funktion för att skapa användare i webbtjänst
async function requestCreateUser(username, password) {
    try {
        const res = await fetch("https://dt207g-laboration4.onrender.com/api/register", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await res.json();
        if (!res.ok) {
            console.log("Misslyckades att skapa användare");
        } else { //om användare skapats, göm formulär och visa meddelande
            document.querySelector("#form-register").classList.add("hidden");
            const messageEl = document.querySelector("#message-register");
            messageEl.innerHTML = `<strong>Användare skapad,<br> du kan nu logga in!</strong>`;
            window.scrollTo(0, 0);
        }
    } catch (error) {
        console.error(`Något gick fel: ${error}`);
    }
}
