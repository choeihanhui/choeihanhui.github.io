$(document).ready(function(){
  //비디오객체
  var player=$('video')[0]

  //재생/일시정지
  $('#btn-play-pause').click(function(){
    // console.log(player.paused);
    if(player.paused){//일시정지상태일때
      player.play();
      $(this).find('i').text('pause');
    }else{//재생중일때
      player.pause();
      $(this).find('i').text('play_arrow');
    }
  })

  //다시시작
  $('#btn-replay').click(function(){
    player.currentTime=0;
    player.play();
    $('#btn-play-pause i').text('pause');
  })

  //음소거
  $('#btn-volume').click(function(){
    if(player.muted){//음소거상태일때
      player.muted=false;
      $(this).find('i').text('volume_up');
    }else{//소리가 나오고있을 때
      player.muted=true;
      $(this).find('i').text('volume_off');
    }
  })

  //풀스크린
  $('#btn-fullscreen').click(function(){
    // console.log($(this).text());
    if($(this).find('i').text()=='fullscreen'){
      $('body').addClass('fullscreen');
      $(this).find('i').text('fullscreen_exit');
    }else{
      $('body').removeClass('fullscreen');
      $(this).find('i').text('fullscreen');
    }
  })
});
