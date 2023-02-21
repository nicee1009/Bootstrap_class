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
    $(this).find('i.fas').toggleClass('a_on');
    return false;
  });



});