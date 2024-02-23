let sval = [];

function up() {
  let data = window.monaco.editor.getEditors();
  
  let val = [data[0].getValue(), data[1].getValue(), data[2].getValue()]
  if (sval.join('|SEPARATOR|FSH|') == val.join('|SEPARATOR|FSH|')) return;
  sval = val

  document.querySelector('div[slot="end"]').innerHTML = '<iframe id="render" title="Rendered content" style="background-color: #fff"></iframe>';
  let iframe = document.getElementById('render');
  
  iframe.contentDocument.write('<style>'+data[1].getValue()+'</style>')
  iframe.contentDocument.write(data[0].getValue())
  iframe.contentDocument.write('<script>'+data[2].getValue()+'</script>')
}

window.addEventListener("load", function(){
  document.body.onkeyup = up;
})

function layout() {
  window.monaco.editor.getEditors().forEach(t => {
    t.layout({});
  })
}
