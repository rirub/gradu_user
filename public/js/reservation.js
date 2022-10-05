"use strict";

const { user } = require("../../config/secret");

const userName = document.querySelector("#name");
const userPhone = document.querySelector("#phone");
const userBirth = document.querySelector("#birth");

const reservBtn = document.querySelector("#reservation");

reservBtn.addEventListener("click",reservation);

function reservation(){

    const req = {
        userID: localStorage.userID,
        userName: userName.value,
        userPhone :userPhone.value,
        userBirth : userBirth.value,
       };
       console.log(req);
    
       fetch("/reservation",{
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(req),
       })
       .then((response) => response.json())
       .then((data) => {
           if(data.code!=200){
               return alert("아이디 비밀번호를 다시 입력하세요");
           }
           const jwt = data.result.jwt;
           localStorage.setItem("x-access-token",jwt);
           alert(data.message);
           return location.replace("/main");
        });

       
}
