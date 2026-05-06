"use strict";

if(!localStorage.getItem("admin_token")) {
  window.location.href = "login.html";
}