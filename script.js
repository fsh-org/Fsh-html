let html = document.getElementById('html');
let css = document.getElementById('css');
let js = document.getElementById('js');

function up() {
  document.querySelector('div[slot="end"]').innerHTML = '<iframe id="render" title="Rendered content" style="background-color: #fff"></iframe>';

  let iframe = document.getElementById('render');
  iframe.contentDocument.write('<style>'+css.value+'</style>')
  iframe.contentDocument.write('<script>'+js.value+'</script>')
  iframe.contentDocument.write(html.value)
}

html.onkeydown = up
html.onkeyup = up
css.onkeydown = up
css.onkeyup = up
js.onkeydown = up
js.onkeyup = up

document.onkeydown = search;
function search(evt) {
  if (!evt) evt = event;
  //console.log(evt)
  if (evt.ctrlKey && evt.key==='F') {
    alert("ss"); 
  }
}
