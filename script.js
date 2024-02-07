function up() {
  document.querySelector('div[slot="end"]').innerHTML = '<iframe id="render" title="Rendered content" style="background-color: #fff"></iframe>';

  let iframe = document.getElementById('render');
  let data = window.monaco.editor.getEditors();
  iframe.contentDocument.write('<style>'+data[1].getValue()+'</style>')
  iframe.contentDocument.write('<script>'+data[2].getValue()+'</script>')
  iframe.contentDocument.write(data[0].getValue())
}

document.getElementById('html').onkeyup = up;
document.getElementById('css').onkeyup = up;
document.getElementById('js').onkeyup = up;
