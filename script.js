let html = document.getElementById('html');
let css = document.getElementById('css');
let js = document.getElementById('js');
let iframe = document.getElementById('render');

function up() {
  iframe.contentDocument.documentElement.innerHTML = '';
  
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
  if (evt.ctrlKey && evt.shiftKey && evt.key=='f') {
    alert("ss"); 
  }
}
