let sval = [];

/* On change */
function up() {
  let data = window.monaco.editor.getEditors();

  // Check if changed
  let val = [data[0].getValue(), data[1].getValue(), data[2].getValue()]
  if (sval.join('|SEPARATOR|FSH|') == val.join('|SEPARATOR|FSH|')) return;
  sval = val;

  // Set iframe
  document.querySelector('div[slot="end"] div[slot="start"]:has(iframe)').innerHTML = '<iframe id="render" title="Rendered content" style="background-color: #fff"></iframe>';
  let iframe = document.getElementById('render');

  // Help html
  iframe.contentDocument.write(`<script>
  console.log = function(...params){window.parent.window.terminal(params.join(' '))}
  console.info = function(...params){window.parent.window.terminal('Info: '+params.join(' '))}
  console.warn = function(...params){window.parent.window.terminal('Warn: '+params.join(' '))}
  console.error = function(...params){window.parent.window.terminal('Error: '+params.join(' '))}
</script>`)

  // Insert user html
  iframe.contentDocument.write('<style>'+data[1].getValue()+'</style>')
  iframe.contentDocument.write(data[0].getValue())
  iframe.contentDocument.write('<script>'+data[2].getValue()+'</script>')
}

window.addEventListener("load", function(){
  document.body.onkeyup = up;
})

/* Show on terminal */
function terminal(text) {
  document.getElementById('readout').innerHTML += text;
}
window.terminal = terminal;

/* Make editors set their size corretly */
function layout() {
  window.monaco.editor.getEditors().forEach(t => {
    t.layout({});
  })
}
