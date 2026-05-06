"use strict";

if (localStorage.getItem("admin_token")) {
    fetchUsers();
}

async function fetchUsers() {
    try {
        const res = await fetch("http://localhost:5000/api/users", {
            method: "GET",
            headers: {
                "authorization": `Bearer ${localStorage.getItem("admin_token")}`
            }
        })
        if (!res.ok) {
            console.log("Misslyckades att hämta användare");
        } else {
            const data = await res.json();
            writeUsers(data);
        }
    } catch (error) {
        console.error(`Något gick fel: ${error}`);
    }
}

async function requestDeleteUser(username) {
    console.log(`Försöker ta bort användare: ${username}`);
}

function writeUsers(users) {
    let resultEl = document.getElementById("api-response");

    resultEl.innerHTML = "";

    //loop för utskrift
    users.forEach(user => {
        //skapa element
        let articleEl = document.createElement("article");
        let deleteButtonEl = document.createElement("button");
        let content = `
       <p><strong>Användare: </strong>${user.username}</p>
       <p><strong>Skapad: </strong>${user.user_created}</p>
       `;

        //lägg till attribut och text
        deleteButtonEl.classList.add("delete-button");
        deleteButtonEl.innerHTML = "Ta bort";
        articleEl.innerHTML = content;
        articleEl.appendChild(deleteButtonEl);

        //skriv ut till DOM
        resultEl.appendChild(articleEl);

        //eventlyssnare för delete-knapp
        deleteButtonEl.addEventListener("click", () => {
            requestDeleteUser(user.username);
        })
    })
}