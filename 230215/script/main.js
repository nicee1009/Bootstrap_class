
//////////메뉴 script///////////
//1.변수선언
//메인메뉴 클릭시 서브가 나오게
let gnb = document.querySelectorAll('.gnb > ul > li');
let sub = document.querySelectorAll('.gnb .sub');
let m_area01 = document.querySelector('main');
let m_area02 = document.querySelector('footer');



//메인메뉴외 영역을 클릭시 서브가 숨겨진다.
  for(let i=0;i<gnb.length;i++){
    gnb[i].addEventListener('click',()=>{
    //alert('클릭 맞아요..');
    // console.log(gnb[i]);
    const child = gnb[i].children;
    console.log(child[1]);

    //li태그 안에 있는 .sub모두 숨기기
    for(let j=0;j<sub.length;j++){
      sub[j].style.display='none';
    }

    //내가 선택한 li의 .sub만 나오게
    child[1].style.display='block';
    //$(this).find('.sub').show(); 제이쿼리 방식

    // parent.child[1].style.display='none';
    // $(this).parent().siblings().find('.sub').hide(); 제이쿼리 방식
  });
  }

  //메인메뉴의 영역을 클릭시 서브가 숨겨진다.
  m_area01.addEventListener('click',()=>{
    for(let i=0;i<gnb.length;i++){
      sub[i].style.display='none';
    }

    
  });


//////////좌, 우 버튼 / 컨트롤 버튼 script///////////
  $(function(){
    //헤더
      $(window).scroll(function(){
    let sPos = $(this).scrollTop();
    console.log(sPos);
//스크롤 기능을 사용하여 header, gnb에 서식을 적용하기
  if(sPos>100){
    $('header').addClass('h_on02');
    $('header .gnb a').addClass('h_on01');
    $('header i.fas').addClass('h_on01');
    $('header h1 img').attr('src','./image/logo-navy.svg');
  }else{
    $('header').removeClass('h_on02');
    $('header .gnb a').removeClass('h_on01');
    $('header i.fas').removeClass('h_on01');
    $('header h1 img').attr('src','./image/logo-white.svg');
  }
});

//header에 마우스 오버시 로고, 내비게이션, i.fas에 서식을 적용하고
$('header').hover(function(){
    $(this).addClass('h_on02');
    $('header .gnb a').addClass('h_on01');
    $('header i.fas').addClass('h_on01');
    $('header h1 img').attr('src','./image/logo-navy.svg');

//header에 마우스 아웃시 로고, 내비게이션, i.fas에 서식 제거하기
  },function(){
    $(this).removeClass('h_on02');
    $('header .gnb a').removeClass('h_on01');
    $('header i.fas').removeClass('h_on01');
    $('header h1 img').attr('src','./image/logo-white.svg');

    return false;
});


    //메인슬라이드
    let m_video = $('#visual_slide div');
    const l_btn = $('#visual_slide .s_btn li:first-child');
    const r_btn = $('#visual_slide .s_btn li:last-child');
    const c_btn = $('#visual_slide .ctrl_btn li');

    let n = c_btn.index();

    //3초마다 반복호출되는 함수 작성
    function fadeinOut(){
      // console.log('내용 반복하기');
      m_video.stop().fadeOut();
      c_btn.removeClass('on');

      if(n==1){
        n=0;
      }else{
        n++;
      }
      c_btn.eq(n).addClass('on');
      m_video.eq(n).stop().fadeIn();
    }

    //좌측버튼 클릭시 실행되는 함수
    function fadeinOut2(){
      // console.log('내용 반복하기');
      m_video.stop().fadeOut();
      c_btn.removeClass('on');

      if(n==0){
        n=1;
      }else{
        n--;
      }
      c_btn.eq(n).addClass('on');
      m_video.eq(n).stop().fadeIn();
    }


    //시간객체를 사용하여 함수호출(함수명,시간)
    let Timer = setInterval(fadeinOut,8000);

    //콘트롤 버튼 클릭시 해당 슬라이드 보이게 하기
    c_btn.hover(function(){
      clearInterval(Timer);
    },function(){
      Timer = setInterval(fadeinOut,8000);
    }); 

    //컨트롤 버튼 클릭시 해당 슬라이드 보이게하기
    c_btn.click(function(){
      n = $(this).index();//클릭한 콘트롤 목록의 인덱스값을 다시 구하고
      m_video.fadeOut();//보이는 이미지 모두 숨기고
      c_btn.removeClass('on');//콘트롤버튼 서식을 모두제거
      m_video.eq(n).fadeIn();//인덱스번호에 맞는 슬라이드가 보이게 한다.
      c_btn.eq(n).addClass('on');//해당하는 컨트롤버튼에 서식적용
    });

    //좌측, 우측방향 클릭시 시간을 제거하고 해당 함수를 호출한다.
    l_btn.click(function(){
      clearInterval(Timer);
      fadeinOut2();
    });
    r_btn.click(function(){
      clearInterval(Timer);
      fadeinOut();
    });

    //좌, 우 버튼에 마우스 아웃시 다시 시간을 생성하여 자동으로 움직이게 한다.
    $('#visual_slide .s_btn').mouseleave(function(){
      Timer = setInterval(fadeinOut,8000);
    });

    //탭 콘텐츠 나오게 하기
    $('.tcon ul li').click(function(){
      $(this).find('a').addClass('tab_on').parent().siblings().find('a').removeClass('tab_on');
    });
  });

  //////////탭메뉴 콘텐츠 script///////////
  //1.변수선언
  const tab_list = document.querySelectorAll('.tcon ul li');
  const tcon = document.querySelectorAll('.tcon ul li div');

  //2.탭메뉴 첫번째 li태그 안에 있는 .cont를 보이게 하기
  // $('.tcon ul li:first-child .cont').show();아래줄 제이쿼리 방법
  document.querySelector('.cont').style.display='block';

  for(let i=0;i<=tab_list.length;i++){
    tab_list[i].addEventListener('click',(e)=>{
      // console.log(tab_list[i]);
      const child = tab_list[i].children;
      console.log(child);
      
      //선택한 li목록의 div태그를 화면에 보이게한다.
      for(let j=0;j<=tcon.length;j++){
        tcon[j].style.display="none";//모두 숨기기
        tcon[i].style.display="block";//선택한 li요소 자손 tcon나오게
        let a = './image/season0'+(i+1)+'.jpg';
        console.log(a);
        document.querySelector('.tcon').style.backgroundImage = "url("+a+")"; 

        // e.currentTarget.querySelector('a').classList('tab_on');
        // tab_list[j].classList.remove('tab_on');//모두 제거
        // // tab_list[i].classList.add('tab_on');//a요소에 서식을 모두 제거하고 선택한 요소에만 .tab_on적용

      }
    });
  }

