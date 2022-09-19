"use strict";

const loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click",login);

function login(){

    const id = document.querySelector("#id");
    const password = document.querySelector("#pw");

    if(!id || !password){
        return alert("회원 정보를 입력해주세요");
    }
    
  // 로그인 api 요청

   const req = {
    id : id.value,
    password : password.value,
   };

   fetch("/login",{
    method : "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body : JSON.stringify(req),
   });

     //요청 성공 여부 code 값으로 확인

    //const isValidLogIn = 



}
