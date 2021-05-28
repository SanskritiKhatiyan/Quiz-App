const info_box= document.querySelector(".info_box");
const continue_btn= info_box.querySelector(".buttons .restart");
const quit_btn= info_box.querySelector(".buttons .quit");
const body = document.querySelector('body');
const quiz_box= document.querySelector(".quiz_box");

quit_btn.onclick=()=>{
    window.history.go(-1);
}

continue_btn.onclick=()=>{
    body.classList.remove('abc');
    body.classList.add('bg');
    quiz_box.classList.add('activeQuiz');
    info_box.classList.add('activeInfo');
}





