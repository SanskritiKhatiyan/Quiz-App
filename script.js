const info_box= document.querySelector(".info_box");
const continue_btn= info_box.querySelector(".buttons .restart");
const quit_btn= info_box.querySelector(".buttons .quit");

quit_btn.onclick=()=>{
    window.history.go(-1);
}

continue_btn.onclick=()=>{
   document.body.style.backgroundImage = "url('download.jpg')";
   body.style.removeProperty('animation');
}





