$(function(){
  var shoppingCount=0;
  var wishCount=0;
  //장바구니 \위시리스트
  $('.icon-shopping').on({
    click:function(){
      $(this).toggleClass('icon-shopping icon-shopping-after');
      $('.tab-menu').toggle();
    }
  })
  // 탭 메뉴
  var flag=true;
  $('.tab-nav a').click(function(e){
    e.preventDefault();
    id=$(this).attr('href');
    $('.tab-nav a').removeClass('active');
    $(this).addClass('active');
    $('.tab-contents > div ').hide();
    $(id).show();
  })

  // swiper-slide 아이콘 버튼  클릭
  $('.btn-group button').click(function(){
    $(this).toggleClass('on');
    // 상품없습니다 문구 보이기
    var src=$(this).parents('.swiper-slide').find('img').attr('src');
    var name=$(this).parents('.swiper-slide').find('dt').text();
    var price=$(this).parents('.swiper-slide').find('dd').next().text();
    var key=$(this).parents('.swiper-slide').data('key');
    var count=0;
    //this = swiper-slide 아이콘 버튼 on 갖고있다면
    if ($(this).hasClass('on')) {
      //아이콘이 icon-heart 갖고 있다면
      if($(this).hasClass('icon-heart')){
        // 문구 숨기기
        $('.nonewish').hide();
        //위시리스트 뿌리기
        $('#tab2 ul').append(
          '<li data-key="'+key+'">'+
            '<label><input type="checkbox" class="wselectall"><i class="icon icon-check"></i></label>'+
            '<div class="wish-image products"><a href="#"><img src="'+src+'" alt="shopping"></a></div>'+
            '<dl class="cart-infos">'+
              '<dt>'+name+'</dt>'+
              // '<dd>수량<div class="count"><button class="icon icon-minus" ></button><span class="num">1</span><button class="icon icon-plus"></button></div></dd>'+
              '<dd>가격 : <span>'+price+'</span>원</dd>'+
            '</dl>'+
            '<div class="btn-group">'+
              '<button class="icon icon-cart"></button>'+
              '<button class="icon icon-transh"></button>'+
            '</div>'+
          '</li>'
        );
      }else{
        // 문구 숨기기
        $('.nonecart').hide();
        //장바구니 넣기
        $('#tab1 ul').append(
            '<li data-key="'+key+'">'+
              '<label><input type="checkbox" class="sselectall"><i class="icon icon-check"></i></label>'+
              '<div class="wish-image products"><a href="#"><img src="'+src+'" alt="shopping"></a></div>'+
              '<dl class="cart-infos">'+
                '<dt>'+name+'</dt>'+
                '<dd>수량<div class="count"><button class="icon icon-minus" ></button><span class="num">1</span><button class="icon icon-plus"></button></div></dd>'+
                '<dd>가격 : <span>'+price+'</span>원</dd>'+
              '</dl>'+
              '<div class="btn-group">'+
                '<button class="icon icon-heart"></button>'+
                '<button class="icon icon-transh"></button>'+
              '</div>'+
            '</li>'
          );
        };
    // on 갖고 있지 않다면=>실행이 안됬을때 상품들 제거하기
    }else{
      // 위시리스트
      if ($(this).hasClass('icon-heart')) {
          $('#tab2 ul li').each(function(){
            if ($(this).data('key')==key) {
              $(this).remove();
            }
          })
      } else{
        // 장바구니
        if ($(this).hasClass('icon-cart')){
          $('#tab1 ul li').each(function(){
            if($(this).data('key')==key){
              $(this).remove();
            }
          })
        }
      }
    }
    //카트 휴지통 아이콘 클릭 => 삭제
    $('.cart .icon-transh').on('click',function(){
      var popkey= $(this).parents('li').data('key');
      // var slidekey = $('.swiper-slide').data('key');
        $('.bestseller .swiper-slide').each(function(){
          var slidekey = $(this).data('key');
          console.log(slidekey);
          if (popkey == slidekey) {
            $(this).find('.icon-cart').removeClass('on');
          }
        })
      $(this).parents('li').remove();
    })
    //카트 휴지통 아이콘 클릭 => 삭제
    $('.wish .icon-transh').on('click',function(){
      var popkey= $(this).parents('li').data('key');
      // var slidekey = $('.swiper-slide').data('key');
        $('.bestseller .swiper-slide').each(function(){
          var slidekey = $(this).data('key');
          console.log(slidekey);
          if (popkey == slidekey) {
            $(this).find('.icon-heart').removeClass('on');
          }
        })
      $(this).parents('li').remove();
    })
  })
  var count=0;
  $('.cart').on('click','.icon-plus',function(){
    count = $(this).prev('.num').text();
    count++;
    if (count > 10) {
      count=10;
      alert('최대수량입니다.')
    }
    $(this).prev('.num').text(count)
  })
  $('.cart').on('click','.icon-minus',function(){
    count = $(this).next('.num').text();
    count--;
    if (count < 1) {
      count=1;
      alert('최소수량입니다.')
    }
    $(this).next('.num').text(count)
  })
  //체크박스 쇼핑카트
  $('#cart-all').change(function(){
    console.log(count);
    var count = $('.cart').find('li').length;
    // var number = $('.cart').find('li').data('key');
    if ($(this).prop('checked')==true) {
      $('.sselectall').attr('checked',true);
      $('.select-num').text(count);
      $('.cart-total a').click(function(){
        $('.cart').find('li').remove();
      })
    } else {
      $('.sselectall').attr('checked',false);
      $('.select-num').text('0');
    }
  })
  // 체크박스 위시리스트
  $('#wish-all').click(function(){
    if ($(this).prop('checked')==true) {
      $('.wselectall').prop('checked',true);
    } else {
      $('.wselectall').prop('checked',false);
    }
  })
  // 수량 더하기 빼기


})
