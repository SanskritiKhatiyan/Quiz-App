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

let questions = [
    {
    number: 1,
    question: "What does xyz means",
    answer: "xyz",
    options: [
      "abc",
      "def",
      "xyz",
      "xyq"
    ]
  },
    
  {
    number: 2,
    question: "What does xyz means",
    answer: "xyz",
    options: [
      "abc",
      "def",
      "xyz",
      "xyq"
    ]
  },

  {
    number: 3,
    question: "What does xyz means",
    answer: "xyz",
    options: [
      "abc",
      "def",
      "xyz",
      "xyq"
    ]
  },

  {
    number: 4,
    question: "What does xyz means",
    answer: "xyz",
    options: [
      "abc",
      "def",
      "xyz",
      "xyq"
    ]
  },

  {
    number: 5,
    question: "What does xyz means",
    answer: "xyz",
    options: [
      "abc",
      "def",
      "xyz",
      "xyq"
    ]
  },

  {
    number: 6,
    question: "What does xyz means",
    answer: "xyz",
    options: [
      "abc",
      "def",
      "xyz",
      "xyq"
    ]
  },

  {
    number: 7,
    question: "What does xyz means",
    answer: "xyz",
    options: [
      "abc",
      "def",
      "xyz",
      "xyq"
    ]
  },

  {
    number: 8,
    question: "What does xyz means",
    answer: "xyz",
    options: [
      "abc",
      "def",
      "xyz",
      "xyq"
    ]
  },

  {
    number: 9,
    question: "What does xyz means",
    answer: "xyz",
    options: [
      "abc",
      "def",
      "xyz",
      "xyq"
    ]
  },

  {
    number: 10,
    question: "What does xyz means",
    answer: "xyz",
    options: [
      "abc",
      "def",
      "xyz",
      "xyq"
    ]
  },
];

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

}

function showquestions(index){
    const que_text= document.querySelector(".que_text");
    const option_list=document.querySelector(".option_list");
    let que_template= '<span>'+ questions[index].number+ "." + questions[index].question + '</span>';
    let option_template= '<div>'+ questions[index].options[0]+'</div>'+ '<div>'+ questions[index].options[1] +'</div>'+
    '<div>'+  questions[index].options[2]+'</div>'+'<div>'+  questions[index].options[3]+'</div>';
    que_text.innerHTML=que_template;
    option_list.innerHTML=option_template;
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

next_btn.onclick=()=>{
    if(question_number<=10){
   showquestions(question_number++);
   question_counter(question_count++);
   clearInterval(timer);
   start_time(15);

    }
    else{

    }
}




