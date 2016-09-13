/**
 * Created by xiangzhoumeng on 2016/9/12.
 */
function slyFunc(
  {
    loadMore = function(){console.log('loadMore')},
    refresh = function(){console.log('refresh')},
    lLeng = 0,
    bLast =false,
    bLoadMore = true,
    parataxis =1
  } = {}){
  require('./plugin')
  require('./jquery.sly')
  setTimeout(() =>{
    var $frame  = $('#frame'), // frame
      $slidee = $('#slidee'), // slidee
      $wrap = $frame.parent(), // wrap
      h1 = $frame.height(), // frame height
      h2 = $slidee.height(); // slidee height
      console.log(h1+' '+h2)
    if( h2 > h1){
      $('#scrollbar').show();
    }else{
      $('#scrollbar').hide();
      return;
    }
    $('#frame').sly(false)
    $frame.sly({
      slidee:$slidee,
      parataxis:parataxis,
      itemNav: 'basic',
      smart: 2,
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: lLeng,
      scrollBar: $wrap.find('.scrollbar'),
      scrollBy: 2,
      speed: 300,
      elasticBounds: 1,
      easing: 'easeOutExpo',
      dragHandle: 1
    });
    if(!bLoadMore){
      return;
    }
    $('#frame').sly('on', 'move', function(e){
      if(!bLast){
        var pos = this.pos;
        if(pos.end - pos.cur<=0){
          //console.log('LoadMore')
          loadMore()
          $('#frame').sly(false)
        }
      }
    });
  },200)
}
export {
  slyFunc
}