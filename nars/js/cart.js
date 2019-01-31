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
            '<label for="check2"><input type="checkbox" id="check2"><i class="icon icon-check"></i></label>'+
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
              '<label for="check2"><input type="checkbox" id="check2"><i class="icon icon-check"></i></label>'+
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
      // e.preventDefault();
      // var contents=$(this).parents('.wish').attr('id');
      // if (contents=='wish') {
      //   $('.btn-group').parents('.swiper-slide').each(function(){
      //     var key=$('.swiper-slide').data('key');
      //     console.log(key);
      //     if($('.swiper-wrapper div').data('key')==key) {
      //       console.log(key);
      //       $('.btn-group').find('.icon-heart').removeClass('on');
      //     }
      //   })
      // } else {
      //
      // }
      $(this).parents('li').remove();
      //   $(this).each(function(){
        //   if ($(this).data('key')==key) {
          //     $('.btn-group').find('.icon-heart').removeClass('on');
          //   }else{
            //     $('.btn-group').find('.icon-cart').removeClass('on');
            //   }
            // })
            // $(this).parents('li').remove();
    })
  })


})
