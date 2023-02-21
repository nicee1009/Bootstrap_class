
//1.  변수선언
//메인메뉴 클릭시 서브가 나오게
let gnb = document.querySelectorAll('.gnb > ul > li');
let sub = document.querySelectorAll('.gnb .sub');
let m_area01 = document.querySelector('main');
let m_area02 = document.querySelector('footer');


for(let i=0;i<gnb.length;i++){
  gnb[i].addEventListener('click',()=>{
      // alert('클릭 맞아요..');
      //console.log(gnb[i]);
      const child = gnb[i].children;
      //console.log(child[1]);
      
      //li태그 안에 있는 .sub모두 숨기기
      for(let j=0;j<sub.length;j++){
        sub[j].style.display='none';
      }

      //내가 선택한 li의 sub만 나오게
      child[1].style.display='block';
      // $(this).find('.sub').show();

      //$(this).parent().siblings().find('.sub').hide();
  });
}

//메인메뉴외 영역을 클릭시 서브가 숨겨진다.
m_area01.addEventListener('click',()=>{
  for(let i=0;i<gnb.length;i++){
    sub[i].style.display='none';
  }
});
m_area02.addEventListener('click',()=>{
  for(let i=0;i<gnb.length;i++){
    sub[i].style.display='none';
  }
});

$(function(){
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

  //탭콘텐츠 나오게하기
  // $('.tcon ul li').click(function(){
  //   $(this).find('a').addClass('tab_on').parent().siblings().find('a').removeClass('tab_on');
  // });

  // 윈도우 스크롤 이벤트를 활용하여 top버튼 나오게하기
  $(window).scroll(function(){
    let spos = $(this).scrollTop();
    //console.log(spos);
    let dh = $(document).height();
    //console.log(dh);
    
    if(dh/2<=spos){//스크롤바 세로가 전체 문서의 1/2이상일 경우
    //  $('.t_btn').fadeIn(); //탑버튼 나오게
    }else{ //그렇지 않으면
      //$('.t_btn').fadeOut(); //탑버튼 숨겨지게
    }
  });

  // 탑버튼 클릭시 상단으로 부드럽게 올라가게 하기
  $('.t_btn').click(function(){
    $('html, body').animate({scrollTop:'0px'},500);
    return false; //a태그요소 #으로 인해 새로고침이 안되게 함.
  })

  // ajax메서드로 json데이터 불러오기
  $('.m_box a').click(function(){
    $(this).hide(); //더보기 버튼은 숨기고

    $.ajax({
      url:'./script/product.json',
      type:'post',
      dataType:'json',
      success:function(result){
        let t='<ul>';
        $.each(result.product,function(i,e){
          t+="<li><img src='./images/"+e.path+"' alt='"+e.tit+"'></li>";
        });
        t+="</ul>";
        //데이터를 t변수에 담아서 list박스에 내용을 출력한다.
        $('#list').html(t);
      }
    });
    return false;
  });
});

  //탭메뉴 콘텐츠 서식
  //1. 변수
  const tab_list = document.querySelectorAll('.tcon ul li a');
  const tcon = document.querySelectorAll('.tcon ul li div');

  //2. 탭메뉴 첫번째 li태그안에 있는 .cont를 보이게하기
  //$('.tcon ul li:first-child .cont').show();
  document.querySelector('.cont').style.display='block';

  for(let i=0;i<tab_list.length;i++){
    tab_list[i].addEventListener('click', (e)=>{
      e.preventDefault();
      //console.log(tab_list[i]);
      // const child = tab_list[i].children;
      //console.log(child[i]);

      //선택한 li목록의 div태그를 화면에 보이게한다.
      for(let j=0;j<=tcon.length;j++){
        tcon[j].style.display='none'; //모두 숨기기

        tcon[i].style.display="block"; //선택한 li요소의 자손 tcon나오게

        //.t_con의 높이가 750이 되도록 한다.
        // tcon[i].parentNode().parentNode().style.height="750px";
        // console.log(tcon[i]);


        tab_list[j].classList.remove('tab_on');//모두 제거
        tab_list[i].classList.add('tab_on');//선택한 a요소에 서식을 적용.
        console.log(tab_list[j]);
        //e.currentTarget.querySelector('a').classList.add('tab_on');
      }
    });
  }

//이벤트 슬라이드
//1. 변수선언
const sw = document.querySelector('.s_wrap');
const lb = document.querySelector('#event i.fa-angle-left');
const rb = document.querySelector('#event i.fa-angle-right');
let cont = 0;
let sn = document.querySelectorAll('.s_wrap figure');

const s_total = sn.length; //figure의 개수
const fig = 1200; //슬라이드 1장 가로너비
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
  sw.style.left = fig*-n+'px';
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

// 자바스크립트로 윈도우 스크롤값 구하기
window.addEventListener('scroll', ()=>{
  console.log(window.scrollY);
  let ws = window.scrollY;
  if(ws>=1500){
    document.querySelector('.t_btn').style.display='block';
  }else{
    document.querySelector('.t_btn').style.display='none';
  }
});


