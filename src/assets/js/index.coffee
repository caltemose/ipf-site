startUp = ->
  console.log 'window.onload compiled coffeescript' 
  console.log window.outerWidth + ' x ' + window.outerHeight

window.onload = startUp
