const info_box= document.querySelector(".info_box");
const continue_btn= info_box.querySelector(".buttons .restart");
const quit_btn= info_box.querySelector(".buttons .quit");

quit_btn.onclick=()=>{
    window.history.go(-1);
}

// continue_btn.addEventListener('click',()=>{
    
//    document.body.style.backgroundImage = "url('download.jpg')";
//     body.classList.remove('animation')
   
// })

const button = document.querySelector('button.restart')
const body = document.querySelector('body')
button.addEventListener('click',()=>{
    body.classList.remove('abc')
    body.classList.add('bg')
})





