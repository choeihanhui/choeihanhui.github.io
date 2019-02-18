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
            '<label><input type="checkbox" class="select-wish"><i class="icon icon-check"></i></label>'+
            '<div class="wish-image products"><a href="#"><img src="'+src+'" alt="shopping"></a></div>'+
            '<dl class="cart-infos">'+
              '<dt>'+name+'</dt>'+
              // '<dd>수량<div class="count"><button class="icon icon-minus" ></button><span class="num">1</span><button class="icon icon-plus"></button></div></dd>'+
              '<dd>가격 : <span class="price">'+price+'</span>원</dd>'+
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
              '<label><input type="checkbox" class="select-cart"><i class="icon icon-check"></i></label>'+
              '<div class="wish-image products"><a href="#"><img src="'+src+'" alt="shopping"></a></div>'+
              '<dl class="cart-infos">'+
                '<dt>'+name+'</dt>'+
                '<dd>수량<div class="count">'+
                  '<button class="icon icon-minus"><span class="blind">minus</span></button>'+
                  '<span class="num">1</span>'+
                  '<button class="icon icon-plus"><span class="blind">plus</span></button></div>'+
                '</dd>'+
                '<dd>가격 : <span class="price">'+price+'</span>원</dd>'+
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
          totalPrice();
        }
      }
    }
  })

  //카트 휴지통 아이콘 클릭 => 삭제
  $('.cart').on('click', '.icon-transh',function(){
    var popkey= $(this).parents('li').data('key');
    // var slidekey = $('.swiper-slide').data('key');
      $('.bestseller .swiper-slide').each(function(){
        var slidekey = $(this).data('key');
        // console.log(slidekey);
        if (popkey == slidekey) {
          $(this).find('.icon-cart').removeClass('on');
        }
      })
    $(this).parents('li').remove();

    var count=0;
    $('#tab1 .select-cart').each(function(){
      if($(this).prop('checked')){
        count++;
      }
    })

    $('#tab1 .select-num').text(count);
    totalPrice();
  })

  //카트 휴지통 아이콘 클릭 => 삭제
  $('.wish').on('click','.icon-transh',function(){
    var popkey= $(this).parents('li').data('key');
    // var slidekey = $('.swiper-slide').data('key');
      $('.bestseller .swiper-slide').each(function(){
        var slidekey = $(this).data('key');

        if (popkey == slidekey) {
          $(this).find('.icon-heart').removeClass('on');
        }
      })
    $(this).parents('li').remove();
  })

  $('.cart').on('click','.count button',function(){
    var count = $(this).parent('.count').find('.num').text();
    if($(this).text()=='plus'){
      count++;
      if (count > 10) {
        count=10;
        alert('최대수량입니다.')
      }
    }else{
      count--;
      if (count < 1) {
        count=1;
        alert('최소수량입니다.')
      }
    }

    $(this).parent('.count').find('.num').text(count);

    totalPrice();
  })

  function totalPrice(){
    //체크된것만 총금액에 합산하기
    var totalprice=0;
    $('.cart li').each(function(){
      if($(this).find('[type="checkbox"]').prop('checked')){
        var num = $(this).find('.num').text();
        var price = $(this).find('.price').text().replace(/[^0-9]/g,'');
        totalprice+=price*num;
        console.log(totalprice);
      }
    })
    $('.totalprice').text(numberWithCommas(totalprice));
  }

  //3자리씩 끊어서 쉼표붙이는 함수
  function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //체크박스 쇼핑카트
  $('#cart-all').change(function(){
    var count = $('.cart').find('li').length;
    if ($(this).prop('checked')==true) {
      $('.select-cart').prop('checked',true);
      $('#tab1 .select-num').text(count);
    } else {
      $('.select-cart').prop('checked',false);
      $('.select-num').text('0');
      $('.cart').find('li').show();
    }
    totalPrice();
  })

  // 체크박스 위시리스트
  $('#wish-all').change(function(){
    var countW = $('.wish').find('li').length;
    if ($(this).prop('checked')==true) {
      $('.select-wish').prop('checked',true);
      $('#tab2 .select-num').text(countW);
    } else {
      $('.select-wish').prop('checked',false);
      $('.select-num').text('0');
    }
  })

  //리스트 체크박스
  $('.tab-contents-body').on('change','[type="checkbox"]',function(){
    var id=$(this).parents('.tab-content').attr('id');
    var count=0;
    if(id=='tab1'){
      $('#cart-all').prop('checked',false);
      $('#'+id).find('li').each(function(){
        if($(this).find('[type="checkbox"]').prop('checked')){
            count++;
        }
      })
      $('#'+id).find('.select-num').text(count);
    }else{
      $('#wish-all').prop('checked',false);
    }
    totalPrice();
  })

  //선택상품삭제
  $('.select-del').click(function(e){
    e.preventDefault();
    console.log('선택삭제누름');
    var id=$(this).parents('.tab-content').attr('id');
    $('.select-num').text(0);
    if(id=='tab1'){//카트삭제
      $('#cart-all').prop('checked',false);
      $('.cart li').each(function(){
        if($(this).find('[type="checkbox"]').prop('checked')){
          var key=$(this).data('key');
          $('.bestseller .swiper-slide').each(function(){
            if(key==$(this).data('key')){
              $(this).find('.icon-cart').removeClass('on');
            }
          })
          $(this).remove();
        }
      })
      totalPrice();
      if($('.cart li').length==0){
        $('.nonecart').show();
      }
    }else{//위시리스트삭제
      console.log('위시삭제');
      $('#wish-all').prop('checked',false);
      $('.wish li').each(function(){
        if($(this).find('[type="checkbox"]').prop('checked')){
          var key=$(this).data('key');
          $('.bestseller .swiper-slide').each(function(){
            if(key==$(this).data('key')){
              $(this).find('.icon-heart').removeClass('on');
            }
          })
          $(this).remove();
        }
      })

      if($('.wish li').length==0){
        $('.nonewish').show();
      }
    }
  })





})
