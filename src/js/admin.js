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
            console.log(data);
        }
    } catch (error) {
        console.error(`Något gick fel: ${error}`);
    }
}
