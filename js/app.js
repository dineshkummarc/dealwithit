!function () {
  $(init)

  var host = 'localhost:3000'
    , $container
    , $message
    , $img

  function init() {
      $img = $("img")
      $container = $("#container").hide()
      $message = $('#message').hide().text(getUrlParam('message') || 'deal with it')
      attachEvents()
      $img.attr('src', 'img/good.jpg')
  }

  function getUrlParam(name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]")
    var regexS = "[\\?&]"+name+"=([^&#]*)"
      , regex = new RegExp(regexS)
      , results = regex.exec(location.href)

    return results ? escape(results[1]) : ''
  }

  function attachEvents() {
    return $img
      .error(function () {
        return alert('sorry -- looks like your image cannot be processed :(')
      })
      .load(function () {
         $container.fadeIn(function () {
            var coords = $img.faceDetection({
              complete: function (img, coords) {
                if (!coords.length) {
                  return alert('sorry -- looks like your image cannot be processed :(')
                }
                dealWithIt(coords[0])
              },
              error: function () {
                return alert('sorry -- looks like your image cannot be processed :(')
              }
            })
         })
       })
  }

  function dealWithIt(coords) {
    $('<img id="glasses" src="img/glasses.png" />')
      .appendTo($container)
      .show()
      .css({
        'position': 'absolute'
      , 'top': -50
      , 'left': coords.offsetX - (coords.width/3)
      , 'width': coords.width + (coords.width/3)
      })
      .animate({ top: coords.offsetY + (coords.height/3) }, 5000, function () {
        $('#message').show()
      })
  }

}()