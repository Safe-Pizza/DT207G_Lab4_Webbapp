"use strict";

document.querySelector("#submit-button").addEventListener("click", loginUser);
document.querySelector("#register-button").addEventListener("click", createUser);

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
        requestLogin(username, password);
    }
}

function createUser() {
    const username = document.querySelector("#reg-username").value;
    const password = document.querySelector("#reg-password").value;
    const confirmPassword = document.querySelector("#reg-confirm-password").value;
    const errorsEl = document.querySelector("#errors-reg");

    errorsEl.innerHTML = "";

    const errors = [];

    if (!username || !password || !confirmPassword) {
        errors.push("Du måste fylla i både användarnamn och lösenord.");
    }

    if (password !== confirmPassword) {
        errors.push("Lösenorden matchar inte, kontrollera att du skrivit rätt och försök igen");
    }

    //Skriv ut eventuella felmeddelanden
    if (errors.length !== 0) {
        errors.forEach(error => {
            errorsEl.innerHTML += error;
        })
    } else {
        console.log("Skapar användare...");
    }
}

async function requestLogin(username, password) {
    try {
        const res = await fetch("http://localhost:5000/api/login", {
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
