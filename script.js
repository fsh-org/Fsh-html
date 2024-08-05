// Set splits
document.addEventListener("DOMContentLoaded", () => {
  Split(['#editors', '#view'])
});

let sval = [];

/* On change */
function up() {
  let data = window.monaco.editor.getEditors();

  // Check if changed
  let val = [data[0].getValue(), data[1].getValue(), data[2].getValue()]
  if (sval.join('|SEPARATOR|FSH|') == val.join('|SEPARATOR|FSH|')) return;
  localStorage.setItem('autosave', val.join('|SEPARATOR||FSH|'))
  sval = val;

  // Set iframe
  document.querySelector('#view div:has(iframe)').innerHTML = '<iframe id="render" title="Rendered content" style="background-color: #fff"></iframe>';
  let iframe = document.getElementById('render');

  // Help html
  iframe.contentDocument.write(`<script>
  console.log = function(...params){window.parent.window.terminal(params.join(' '))}
  console.info = function(...params){window.parent.window.terminal('Info: '+params.join(' '))}
  console.warn = function(...params){window.parent.window.terminal('Warn: '+params.join(' '))}
  console.error = function(...params){window.parent.window.terminal('Error: '+params.join(' '))}
  console.clear = function(){window.parent.window.terminal('CLEAR MY TERMINAL')}
  window.onerror = function(errorMsg, url, lineNumber) {window.parent.window.terminal('Error: '+errorMsg+'; Line '+lineNumber);return false;}
</script>`)

  // Insert user html
  iframe.contentDocument.write('<style>'+data[1].getValue()+'</style>')
  iframe.contentDocument.write(data[0].getValue())
  iframe.contentDocument.write('<script>'+data[2].getValue()+'</script>')
}

window.addEventListener("load", function(){
  if (localStorage.getItem('autosave')) {
    let editors = window.monaco.editor.getEditors();
    let values = localStorage.getItem('autosave').split('|SEPARATOR||FSH|');
    editors[0].getModel().setValue(values[0]);
    editors[1].getModel().setValue(values[1]);
    editors[2].getModel().setValue(values[2]);
  } else {
    up()
  }
  document.body.onkeyup = up;
})

/* Show on terminal */
function terminal(text) {
  if (text == 'CLEAR MY TERMINAL') {
    document.getElementById('readout').innerHTML = '# Console'
    return;
  }
  if (text instanceof Object) {
    let changed = 'failed to decode';
    try {
      changed = JSON.stringify(text);
    } catch (err) {
      // ignore
    }
    text = text + ': ' + changed
  }
  document.getElementById('readout').innerHTML += '<br><label class="'+(text.startsWith('Info:') ? 'ci' : (text.startsWith('Warn:') ? 'cw' : (text.startsWith('Error:') ? 'ce': '')))+'">'+text+'</label>';
}
window.terminal = terminal;

/* Make editors set their size corretly */
function layout() {
  window.monaco.editor.getEditors().forEach(t => {
    t.layout({});
  })
}

/* Presets */
function setPreset(preset) {
  let editors = window.monaco.editor.getEditors();
  switch (preset) {
    case 'blank':
      editors[0].getModel().setValue('');
      editors[1].getModel().setValue('');
      editors[2].getModel().setValue('');
      break;
    case 'default':
      editors[0].getModel().setValue(`<!DOCTYPE html>\n<html lang="en">\n  <head>\n    \n  </head>\n  <body>\n    \n  </body>\n</html>`);
      editors[1].getModel().setValue(`body {\n  background-color: black;\n  color: white;\n  font-family: Arial;\n}`);
      editors[2].getModel().setValue('');
      break;
    default:
      alert('An unknown preset was attempted to be loaded')
      throw new Error('Unknown preset: '+preset)
  }
}
