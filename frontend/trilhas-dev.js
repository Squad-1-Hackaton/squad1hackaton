$('.material-symbols-outlined').click(function (e) {
  e.preventDefault()
  $('#wrapper').toggleClass('toggled')
})

if (window.parent && window.parent.parent) {
  window.parent.parent.postMessage(
    [
      'resultsFrame',
      {
        height: document.body.getBoundingClientRect().height,
        slug: 'krx61hh9'
      }
    ],
    '*'
  )
}
window.name = 'result'
