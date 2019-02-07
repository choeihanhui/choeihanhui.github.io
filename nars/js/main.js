$(function(){
  $(window).resize(function(){
    var windowW=$(window).width();
    //네비게이션
    $('.gnb > li').off('mouseenter mouseleave');
    $('.gnb > li >a').off('click');
    if(windowW>767){
      $('.gnb > li').on({
        mouseenter:function(){
          var i=$(this).index();
          $('.subnav').eq(i).stop().slideDown();
        },
        mouseleave:function(){
          $('.subnav').stop().slideUp();
        }
      });
    }else{
      $('.gnb > li > a').on({
        click:function(){
          $(this).find('i').toggleClass('icon-arrow-down icon-arrow-up');
          $(this).next('.subnav').stop().slideToggle();
        }       
      })
    }
  }).resize();

  $('.icon-bar').on({
    click:function(){
      $('nav.center').show();
      $('nav.center').stop().animate({'left':'0'},800);
      $('.search').hide();
    }
  });
  $('.top-area button').on({
    click:function(){
      $('nav.center').fadeOut();
      $('nav.center').stop().animate({'left':'-100%'},800);
    }
  });
  // 검색창
  $('.icon-search').on({
    click:function(){
      $(this).toggleClass('icon-search icon-search-after');
      $('.search').slideToggle();
    }
  });
  // 로그인 팝업창
  $('.icon-login').on({
    click:function(){
      $(this).addClass('icon-login-after');
      $('.login-popup').fadeIn();
    }
  })

  $('#btn-login').click(function(){
    var id=$('#id').val();
    var password=$('#password').val();
    // console.log(id,password);
    $('.message').remove();

    if(id==''){
      $('#id').after('<p class="message">아이디를 입력하세요</p>').focus();
    }else if(password==''){
      $('#password').after('<p class="message">비밀번호를 입력하세요</p>').focus();
    }else{
      $('.login-popup').fadeOut(1000,function(){
        $('.user-info b').text(id);
        $('.user-info').show();
      });
    }
  })
  //로그아웃하기
  $('#btn-logout').click(function(){
    $('.user-info').hide();
    $('.icon-login').removeClass('icon-login-after');
    $('.input-group input').val('');
  })
  $('.input-group input').keyup(function(){
    var lenght=$(this).val().length;
    if(lenght !=0){
      $(this).next('.message').remove();
    }
  })


  $('.btn-close').on({
    click:function(){
      $('.login-popup').fadeOut();
      $('.icon-login').removeClass('icon-login-after');
    }
  })


  var swiper = new Swiper('.main-ad .swiper-container', {
        spaceBetween: 30,
        effect: 'fade',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        loop:true,
        autoplay:{
        delay:2000
      }
      });

    var swiper2 = new Swiper('.bestseller .swiper-container', {
      slidesPerView: 3,
      spaceBetween: 50,
      slidesPerGroup: 3,
      loop: true,
      navigation: {
        nextEl: '.bestseller .swiper-button-next',
        prevEl: '.bestseller .swiper-button-prev',
      },
      breakpoints: {
        1240: {
          slidesPerGroup: 2,
          slidesPerView: 2,
          spaceBetween: 40,
        },
        768: {
          slidesPerGroup: 1,
          slidesPerView: 1,
          spaceBetween: 40,
        }
      }
    });
    // 베스트 셀러

    //기프트
    $(window).resize(function(){
      imgW=$('.gift-bg4').width();
      $('.img-box').height(imgW);
      // $('.text-box').height(imgW);
    }).resize();

    //스토어 탭메뉴
    $('.result-list ul').click(function(e){
      e.preventDefault();
      // id=$(this).attr('href');
      $('.result-list ul').removeClass('active');
      $(this).addClass('active');
      // $('.tab-contents > div ').hide();
      // $(id).show();
    })

    // 스토어 모바일
    $('#btn-store').click(function(){
      $(this).find('i').toggleClass('icon-arrow-up icon-arrow-down-w');
      $('.store .title').slideToggle();
      $('.store .row').slideToggle();
    })

});
function initMap() {
  var uluru = {lat: 37.517711, lng: 126.905229};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: uluru
  });

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">신세계 영등포점</h1>'+
      '<div id="bodyContent">'+
      '<p><b>주소:</b>서울특별시 영등포구 영등포동 영중로 9</p>'+
      '<p><b>영업시간:</b>영업 중 ⋅ 오후 8:00에 영업 종료</p>'+
      '<p><b>연락처:</b>1588-1234</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    title: '신세계영등포점'
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
