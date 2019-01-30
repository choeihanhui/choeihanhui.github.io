$(function(){
  $('.icon-heart').on({
    click:function(){
      $(this).toggleClass('icon-heart icon-heart-active')
    }
  })
  $('.icon-cart').on({
    click:function(){
      $(this).toggleClass('icon-cart icon-cart-active')
    }
  })

})
