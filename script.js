const info_box= document.querySelector(".info_box");
const continue_btn= info_box.querySelector(".buttons .restart");
const quit_btn= info_box.querySelector(".buttons .quit");
const body = document.querySelector('body');
const quiz_box= document.querySelector(".quiz_box");
const next_btn= document.querySelector("footer .next_btn");
const time_left_txt=document.querySelector(".timer .time_left_txt");
const timer_sec=document.querySelector(".timer .timer_sec");
const time_line=document.querySelector(".time_line");
const option_list=document.querySelector(".option_list");
const que_text= document.querySelector(".que_text");
const score_text=document.querySelector(".score_text");
const result_box= document.querySelector(".result_box");
const restart=document.querySelector(".resultbuttons .restart");
const quit=document.querySelector(".resultbuttons .quit");
const result_btn=document.querySelector(".result_btn");


let question_number=0;
let question_count=1;
let timer;
let liner;
let index;
let time_close;
let userScore=0;


quit_btn.onclick=()=>{
    window.history.go(-1);
}

quit.onclick=()=>{
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
    let que_template= '<span>'+ questions[index].number+ "." + questions[index].question + '</span>';
    let option_template= '<div class="option two">'+ questions[index].options[0]+'</div>'+ '<div class="option ">'+ questions[index].options[1] +'</div>'+''+
    '<div class="option two">'+  questions[index].options[2]+'</div>'+'<div class="option ">'+  questions[index].options[3]+'</div>';
    que_text.innerHTML=que_template;
    option_list.innerHTML=option_template;

    next_btn.classList.remove("show");

    const option= option_list.querySelectorAll(".option");
   
    for(i=0 ; i<option.length ; i++){
      option[i].setAttribute("onclick","option_selected(this)");
    }
  
} 

function option_selected(choosed_answer){

  clearInterval(liner);
  clearInterval(timer);
  let users_answser=choosed_answer.textContent;
  let correct_answer=questions[question_number].answer;

  if(users_answser == correct_answer){
    userScore+=1;
    choosed_answer.classList.add("correct");
    choosed_answer.insertAdjacentHTML("beforeend", tickemoji);
  }
  else{
    choosed_answer.classList.add("incorrect");
    choosed_answer.insertAdjacentHTML("beforeend", wrongemoji);

      for(i=0;i<option_list.children.length;i++){
        let auto_answer=option_list.children[i].textContent;
        if(auto_answer==correct_answer){
          option_list.children[i].classList.add("correct");
        }
      }
  }
  console.log(question_count);
  for(i=0;i<option_list.children.length;i++){
      option_list.children[i].classList.add("disabled");
  }
   if(question_count<10){
   next_btn.classList.add("show");
   }
   else {
     showresult(userScore);
   }
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
            let correct_answer=questions[question_number].answer;
            for(i=0;i<option_list.children.length;i++){
              let auto_answer=option_list.children[i].textContent;
              if(auto_answer==correct_answer){
                option_list.children[i].classList.add("correct");
              }
            }
              for(i=0;i<option_list.children.length;i++){
                option_list.children[i].classList.add("disabled");
            }
             if(question_count<10){
             next_btn.classList.add("show");
             }
            }
             else {
               if(question_count==10 && index==0){
               result_btn.classList.add("result_show");
               }
             }
          }
    }


function start_timerline(index){
  liner=setInterval(timeline,20);
  function timeline(){
    time_line.style.width = index + "px";
    index++;
    if(index>800){
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
      showresult(userScore);
    }
}

function showresult(index){
  clearInterval(timer);
  clearInterval(liner);
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");
  let total_score= '<div>'+ "your score is"+ index;
  if(index>5){
    score_text.innerHTML=total_score + '<span>'+"You performed well in the quiz";
}
else{
  score_text.innerHTML=total_score + '<span>'+ "Better Luck Next Time";
}

 
  result_btn.classList.remove("result_show");

}

restart.onclick=()=>{
  quiz_box.classList.add("activeQuiz");
  clearInterval(liner);
  clearInterval(timer);
  start_time(15);
  start_timerline(0);
  question_count=1;
  question_number=0;
  showquestions(question_number);
  question_counter(question_count);
  result_box.classList.remove("activeResult");
  result_btn.classList.remove("result_show");
}

result_btn.onclick=()=>{
  showresult(userScore);
}



    
