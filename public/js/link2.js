
const eyeBtn = document.querySelector("#eyeBtn");
const hbBtn = document.querySelector("#hbBtn");
const skBtn = document.querySelector("#skBtn");
const jhBtn = document.querySelector("#jhBtn");
const nBtn = document.querySelector("#nBtn");
const noBtn = document.querySelector("#noBtn");
const skinBtn = document.querySelector("#skinBtn");
const tBtn = document.querySelector("#tBtn");




eyeBtn.addEventListener("click", function(){
    return location.replace("/hospital_eye");
});

hbBtn.addEventListener("click", function(){
    return location.replace("/hospital_hb");
});

skBtn.addEventListener("click", function(){
    return location.replace("/hospital_sk");
});


jhBtn.addEventListener("click", function(){
    return location.replace("/hospital_jh");
});

nBtn.addEventListener("click", function(){
    return location.replace("/hospital_n");
});

noBtn.addEventListener("click", function(){
    return location.replace("/hospital_no");
});


skinBtn.addEventListener("click", function(){
    return location.replace("/hospital_skin");
});

tBtn.addEventListener("click", function(){
    return location.replace("/hospital_t");
});

