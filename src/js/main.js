"use strict";

document.addEventListener("DOMContentLoaded", () => {

  changeNav();

  //Eventlyssnare för hamburgermeny
  document.querySelector("#hamburger-menu").addEventListener("click", toggleMenu);

  const linkRegisterEl = document.querySelector(".link-register");
  if (linkRegisterEl) {
    linkRegisterEl.addEventListener("click", toggleForm);
  }
});

//togglefunktion för hamburgermeny
function toggleMenu() {
  const mainNavEl = document.querySelector("#main-nav");
  const hamMenuEl = document.querySelector("#hamburger-menu");

  if (mainNavEl.style.display === "block") {
    mainNavEl.style.display = "none";
    hamMenuEl.classList.remove("change");
  } else {
    mainNavEl.style.display = "block";
    hamMenuEl.classList.add("change");
  }
}

function toggleForm() {
  const registerForm = document.querySelector("#form-register");
  document.querySelector("#errors-reg").innerHTML = "";
  registerForm.classList.toggle("hidden");
}

function changeNav() {
  const navEl = document.querySelector("#main-nav");
  if (localStorage.getItem("admin_token")) {
    navEl.innerHTML = `        
    <ul>
    <li><a href="./index.html">Startsida</a></li>
    <li><button id="button-logout">Logga ut</button></li>
    <li><a href="./admin">Admin</a></li>
    </ul>
    `
  } else {
    navEl.innerHTML = `
    <ul>
    <li><a href="./index.html">Startsida</a></li>
    <li><a href="./login">Logga in</a></li>
    </ul>`
  }

  const logoutButton = document.querySelector("#button-logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("admin_token");
      changeNav();
      window.location.href = "login.html";
    })
  }
}