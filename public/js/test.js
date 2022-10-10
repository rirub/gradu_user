"use strict";
var c = 1;

function selectDay(event){
    var date = document.getElementById('date');
    var text = document.getElementById('selectday');

    text.innerHTML = date.value;
    return true;
}

// 날짜 오늘 이전은 선택 안되도록
var now_utc = Date.now()
var timeOff = new Date().getTimezoneOffset()*60000;
var today = new Date(now_utc-timeOff).toISOString().split("T")[0];
document.getElementById("date").setAttribute("min", today);

function select(){
    var date = document.getElementById('selectday');
    var time = document.getElementById('bu2');

    console.log(typeof(date.innerHTML));
    if((date.innerHTML).includes('선택')){
        alert('날짜를 선택해주세요');
        return false;
    }
    else if((time.innerHTML).includes('선택')){
        alert("시간을 선택해주세요");
        return false;
    }
    else{
        var sdate = date.innerHTML;
        var stime = time.innerHTML;
        c = 2;

        window.localStorage.setItem('date',sdate);
        window.localStorage.setItem('time',stime);
        window.localStorage.setItem('num',c);

        return true;
    }

    
}

$(document).on('click','.nickname',function(){
    let content = `<div>예약 한 내용</div>`

    $('#mypage').html(content);
    $("#mypage").bPopup({
        modalClose : true,
        opacity : 0.3,
        position: [$(document).width()*0.75,175]
    });
})

$(function() {
    $("#bu2").timepicker({
        timeFormat: 'h:mm p',
        interval: 30,
        startTime: '00:00',
        defaultTime: '11',
        dynamic: false,
        dropdown: true,
        scrollbar: false
    });
});

$(document).on("click",".ui-menu-item",function(event){
    
    var time = event.target;
    var text = document.getElementById('bu2');

    text.innerHTML = time.innerHTML;
    return true;
});