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

  $('.btn-group button').click(function(){
    $(this).toggleClass('on');

    var src=$(this).parents('.swiper-slide').find('img').attr('src');
    var name=$(this).parents('.swiper-slide').find('dt').text();
    var price=$(this).parents('.swiper-slide').find('dd').next().text();
    var key=$(this).parents('.swiper-slide').data('key');
    var count=0;
    if ($(this).hasClass('on')) {

      if($(this).hasClass('icon-heart')){

        //위시리스트 뿌리기
        // var list=$('#tab2 ul').get()
        // $('#tab2 ul').empty();
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
    }else{
      if ($(this).hasClass('icon-heart')) {
          $('#tab2 ul li').each(function(){
            if ($(this).data('key')==key) {
              $(this).remove();
            }
          })
      } else{
        if ($(this).hasClass('icon-cart')){
          $('#tab1 ul li').each(function(){
            if($(this).data('key')==key){
              $(this).remove();
            }
          })
        }
      }
    }
    $('.tab-contents-body ul').on('click','.icon-transh',function(e){
      e.preventDefault();
      var contents=$(this).parents('.wish').attr('id');
      if (contents=='wish') {
        $('.btn-group').parents('.swiper-slide').find('button').each(function(){
          if($('.swiper-wrapper div').data('key')==key) {
            $('.btn-group').find('.icon-heart').removeClass('on');
          }
        })
      } else {
        console.log('뭐를삭제하냐');
      }
      $(this).parents('li').remove();
        $(this).each(function(){
          if ($(this).data('key')==key) {
              $('.btn-group').find('.icon-heart').removeClass('on');
          }else{
              $('.btn-group').find('.icon-cart').removeClass('on');
            }
          })
          $(this).parents('li').remove();
    })
  })
  //체크박스 쇼핑카트

  $('#tab1 input[type=checkbox]').change(function(){
    var count = $('[type="checkbox"]').filter(':checked').length;
    // var ckbox = $('[type="checkbox"]'),
    //     count =0 ;
    if ($(this).prop('checked')==true) {
      // count = $('[type="checkbox"]:checked').length;
      $('.sselectall').attr('checked',true);
      console.log(count);
      $('.num').text(count);
    } else {
      $('.sselectall').attr('checked',false);
    }

  })
  // 체크박스 위시리스트
  $('#tab2 input[type=checkbox]').click(function(){
    if ($(this).prop('checked')==true) {
      $('.wselectall').attr('checked',true);
    } else {
      $('.wselectall').attr('checked',false);
    }
  })


})
