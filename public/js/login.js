"use strict";
const userID = document.querySelector("#id");
const password = document.querySelector("#pw");
const loginBtn = document.querySelector("#loginBtn");

loginBtn.addEventListener("click",login);

function login(){

    if(!id || !password){
        return alert("회원 정보를 입력해주세요");
    }
    
    // 로그인 api 요청
    console.log(id.value, password.value);

    const req = {
        userID : userID.value,
        password :password.value,
       };
       console.log(req);
    
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
