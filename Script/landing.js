
const navfixing = document.querySelector('.navbar-fixed-top');

window.onscroll=function(){
    var top=window.scrollY;
    if(top>=10)
    {
        navfixing.classList.add('active');
    }
    else{
        navfixing.classList.remove('active');
    }
}

