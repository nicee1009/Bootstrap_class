

//////////좌, 우 버튼 / 컨트롤 버튼 script///////////
  $(function(){

    //1.토글버튼 변수
    let t_btn = $('.toggle');
    let gnb = $('.gnb>ul>li>a');

    t_btn.click(function(){
      $(this).find('span').first().toggleClass('act01');
      $(this).find('span').eq(1).toggleClass('act02');
      $(this).find('span').last().toggleClass('act03');

      $('.gnb').toggle();
    });

    //메인메뉴 클릭시 서브메뉴 나오게
    gnb.click(function(){
      $(this).next().slideToggle().parent().siblings().find('.sub').slideUp();
      $(this).find('i.fas').toggleClass('act04').parents().siblings().find('i.fas').removeClass('act04');
      return false;
    });

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
    
    // 탭메뉴 script
    // 1.변수선언
    let t_mnu = $('.tcon > ul > li > a');

    t_mnu.click(function(){
      //a태그에 적용되는 배경서식
      $(this).toggleClass('tab_on').parent().siblings().find('a').removeClass('tab_on');

      //a태그 자손 i.fas에 적용되는 서식
      $(this).find('i.fas').toggleClass('act04').parents().siblings().find('i.fas').removeClass('act04');

      //a태그의 자손 .cont에 적용되는 서식
      $(this).next().slideToggle().parent().siblings().find('.cont').slideUp();

       // 탭메뉴 클릭시 인덱스값 1,2,3을 구한다.
        let i = $(this).parent().index()+1;
        console.log(i);

       // 인덱스 값을 해당하는 이미지파일명에 대입하여 사진이 변경되게 한다.
        $('.tcon').css('background-image','url("./image/season0'+i+'.jpg")');
        // background-image: url("../image/season01.jpg")
        return false;
    });
    
    });
    


    