$(function(){
  //1. 토글버튼 변수
  let t_btn = $('.toggle');
  let gnb = $('.gnb > ul > li > a');

  t_btn.click(function(){
    $(this).find('span').first().toggleClass('act01');
    $(this).find('span').eq(1).toggleClass('act02');
    $(this).find('span').last().toggleClass('act03');

    $('.gnb').toggle();

  });

  // 메인메뉴 클릭시 서브메뉴 나오게
  gnb.click(function(){
    $(this).next().slideToggle().parent().siblings().find('.sub').slideUp();

    // 화살표 방향 돌리기
    $(this).find('i.fas').toggleClass('a_on').parent().parent().siblings().find('i.fas').removeClass('a_on');

    return false;
  });

  //메인슬라이드
  let m_img = $('#visual_slide div');
  const l_btn = $('#visual_slide .s_btn li:first-child');
  const r_btn = $('#visual_slide .s_btn li:last-child');
  const c_btn = $('#visual_slide .ctrl_btn li');

  let n = c_btn.index();

  //3초마다 반복호출되는 함수 작성
  function fadeInOut(){
    //console.log('내용 반복하기');
    m_img.stop().fadeOut();
    c_btn.removeClass('on');

    if(n==2){
      n=0;
    }else{
      n++;
    }
    c_btn.eq(n).addClass('on');
    m_img.eq(n).stop().fadeIn();
  }
  //좌측버튼 클릭시 실행되는 함수
  function fadeInOut2(){
    //console.log('내용 반복하기');
    m_img.stop().fadeOut();
    c_btn.removeClass('on');

    if(n==0){
      n=2;
    }else{
      n--;
    }
    c_btn.eq(n).addClass('on');
    m_img.eq(n).stop().fadeIn();
  }

  //시간객체를 사용하여 함수호출 setInterval(함수명, 시간);
  let Timer = setInterval(fadeInOut, 5000);

  // 콘트롤 버튼 클릭시 시간을 제거하고
  c_btn.hover(function(){
    clearInterval(Timer);
  },function(){  //마우스 아웃시 시간을 다시 생성하여 움직이게 한다.
    clearInterval(Timer);
    Timer = setInterval(fadeInOut, 5000);
  });

// 콘트롤 버튼 클릭시 해당 슬라이드 보이게하기
  c_btn.click(function(){
    n = $(this).index(); //클릭한 콘트롤 목록의 인덱스값을 다시 구하고
    m_img.fadeOut(); //보이는 이미지 모두 숨기고
    c_btn.removeClass('on'); //콘트롤버튼 서식을 모두제거
    m_img.eq(n).fadeIn(); //인덱스번호에 맞는 슬라이드가 보이게한다.
    c_btn.eq(n).addClass('on'); //해당하는 콘트롤버튼에 서식적용
  });

  // 좌측, 우측 방향버튼 클릭시 시간을 제거하고  해당 함수를 호출한다.
  l_btn.click(function(){
    clearInterval(Timer);
    fadeInOut2();
  });
  r_btn.click(function(){
    clearInterval(Timer);
    fadeInOut();
  });
  //좌, 우 버튼에 마우스 아웃시 다시 시간을 생성하여 자동으로 움직이게 한다.
  $('#visual_slide .s_btn').mouseleave(function(){
    Timer=setInterval(fadeInOut, 5000);
  });

  // 탭콘텐츠 변수선언
  let t_mnu = $('.tcon > ul > li > a');

  t_mnu.click(function(){
    // a태그에 적용되는 배경서식
    $(this).toggleClass('tab_on').parent().siblings().find('a').removeClass('tab_on');

    //a태그 자손 i.fas에 적용되는 서식
    $(this).find('i.fas').toggleClass('a_on').parent().parent().siblings().find('i.fas').removeClass('a_on');

    //a태그의 자손 .cont에 적용되는 서식
    $(this).next().slideToggle().parent().siblings().find('.cont').slideUp();
    return false;
  });


});

//이벤트 슬라이드
//1. 변수선언
const sw = document.querySelector('.s_wrap');
const lb = document.querySelector('#event i.fa-angle-left');
const rb = document.querySelector('#event i.fa-angle-right');
let cont = 0;
let sn = document.querySelectorAll('.s_wrap figure');

const s_total = sn.length; //figure의 개수
const fig = 100; //슬라이드 1장 가로너비
console.log(fig);
console.log(s_total); //3   figure의 개수

sw.style.width = fig*s_total; //슬라이드 전체 가로크기
console.log(fig*s_total); //3600

//2. 클릭시 위치이동
lb.addEventListener('click',()=>{
  clearInterval(Timer2);
  if(cont>0){//cont가 0보다 크면
    mslide(cont-1); //1씩 감소하여 1, 2가 나오게
  }else{ //그렇지 않으면
    mslide(s_total-1); // 0으로 나오게
  }
  console.log(cont);
});

lb.addEventListener('mouseleave', ()=>{
  Timer2 = setInterval(function(){
    if(cont<s_total-1){ 
      mslide(cont+1); 
    }else{ 
      mslide(0);
    }
  },3000);
});

rb.addEventListener('mouseleave', ()=>{
  Timer2 = setInterval(function(){
    if(cont<s_total-1){ 
      mslide(cont+1); 
    }else{ 
      mslide(0);
    }
  },3000);
});

rb.addEventListener('click',()=>{
  clearInterval(Timer2);
  if(cont<s_total-1){ //만약에 cont가 2보다 작으면
    mslide(cont+1); // 함수에 1을 더하여 넘겨주고
  }else{ //그렇지 않으면 
    mslide(0); //0을 넘겨준다.
  }
  console.log(cont);
});

//3. 매 시간마다 반복 호출하여 자동으로 움직이게
function mslide(n){
  sw.style.left = fig*-n+'%';
  cont = n;
  console.log(sw.style.left); //검증하기 0, 1200, 2400
}

let Timer2 = setInterval(function(){ // 3초마다 0, 1, 2를 mslide에 넘겨줌
  if(cont<s_total-1){ //만약에 cont가 2보다 작으면
    mslide(cont+1); // 함수에 1을 더하여 넘겨주고
  }else{ //그렇지 않으면 
    mslide(0); //0을 넘겨준다.
  }
},3000);