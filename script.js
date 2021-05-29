const info_box= document.querySelector(".info_box");
const continue_btn= info_box.querySelector(".buttons .restart");
const quit_btn= info_box.querySelector(".buttons .quit");
const body = document.querySelector('body');
const quiz_box= document.querySelector(".quiz_box");
const next_btn= document.querySelector("footer .next_btn");
const time_left_txt=document.querySelector(".timer .time_left_txt");
const timer_sec=document.querySelector(".timer .timer_sec");
const time_line=document.querySelector(".time_line");


let question_number=0;
let question_count=1;
let timer;
let liner;
let index;
let userScore=0;


quit_btn.onclick=()=>{
    window.history.go(-1);
}

continue_btn.onclick=()=>{
    body.classList.remove('abc');
    body.classList.add('bg');
    quiz_box.classList.add('activeQuiz');
    info_box.classList.add('activeInfo');
    showquestions(question_number);
    question_counter(question_count);
    start_time(15);
    start_timerline(0);

}

function showquestions(index){
    const que_text= document.querySelector(".que_text");
    const option_list=document.querySelector(".option_list");
    let que_template= '<span>'+ questions[index].number+ "." + questions[index].question + '</span>';
    let option_template= '<div class="option">'+ questions[index].options[0]+'</div>'+ '<div class="option">'+ questions[index].options[1] +'</div>'+
    '<div class="option">'+  questions[index].options[2]+'</div>'+'<div class="option">'+  questions[index].options[3]+'</div>';
    que_text.innerHTML=que_template;
    option_list.innerHTML=option_template;

    const option= option_list.querySelectorAll(".option");
   
    for(i=0 ; i<option.length ; i++){
      option[i].setAttribute("onclick","option_selected(this)");
    }
  
} 

function option_selected(choosed_answer){
  clearInterval("liner");
  clearInterval("timer");
  let users_answser=choosed_answer.textContent;
  let correct_answer=questions[question_number].answer;
  let allOptions = option_list.children.length;

  if(users_answser == correct_answer){
    userScore += 1;
    console.log("Answer is correct");
  }
  else{
    choosed_answer.classList.add("incorrect")
      console.log("Answer is wrong")
  }

    
    
  

  next_btn.classList.add(".show");
 
}



function question_counter(index){
    const total_que= document.querySelector("footer .total_que");
    let que_count= '<span>'+ index + " of 10"+'</span>';
    total_que.innerHTML=que_count;
}

function start_time(index){
    timer=setInterval(time,1000);
    function time(){
        timer_sec.innerHTML=index;
        index--;
        if(index<0){
            clearInterval(timer);
        }
    }
}

function start_timerline(index){
  liner=setInterval(timeline,65);
  function timeline(){
    time_line.style.width = index + "px";
    index++;
    if(index>250){
      clearInterval(liner);
    }
  }
}

next_btn.onclick=()=>{
  if(question_number<=10){
    showquestions(question_number+=1);
    question_counter(question_count+=1);
    clearInterval(timer);
    start_time(15);
    clearInterval(liner);
    start_timerline(0);
  }
  else{

    }
}




