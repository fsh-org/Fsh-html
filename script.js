// Set splits
document.addEventListener("DOMContentLoaded", () => {
  Split(['#editors', '#view']);
  Split(['.render-div', '#console'], { direction: 'vertical', sizes: [75, 25] });
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
  console.log = function(...params){window.parent.window.terminal('log', params)}
  console.info = function(...params){window.parent.window.terminal('info', params)}
  console.warn = function(...params){window.parent.window.terminal('warn', params)}
  console.error = function(...params){window.parent.window.terminal('error', params)}
  console.debug = function(...params){window.parent.window.terminal('debug', params)}
  console.assert = function(assertion, ...params){if (!assertion) {window.parent.window.terminal('error', ['Assertion failed'])}}
  console.clear = function(){window.parent.window.terminal('clear', ['The cleansing'])}
  window.onerror = function(errorMsg, url, lineNumber) {window.parent.window.terminal('error', [errorMsg+'; Line '+lineNumber]);return false;}
</script>`);

  function handleInfinite(code) {
    if (document.getElementById('freeze').checked) {
      return code.replaceAll(/((for|while) *?\([^¬]*?\)[^¬]*?{)/g, 'if(!window.__c)window.__c=0;$1window.__c++;if(window.__c>1000){throw new Error("Infinite loop")};');
    } else {
      return code;
    }
  }
  // Insert user html
  iframe.contentDocument.write('<style>'+data[1].getValue()+'</style>');
  iframe.contentDocument.write(handleInfinite(data[0].getValue()));
  iframe.contentDocument.write('<script>'+handleInfinite(data[2].getValue())+'</script>');
}

window.addEventListener("load", function(){
  if (localStorage.getItem('autosave')) {
    let editors = window.monaco.editor.getEditors();
    let values = localStorage.getItem('autosave').split('|SEPARATOR||FSH|');
    editors[0].getModel().setValue(values[0]);
    editors[1].getModel().setValue(values[1]);
    editors[2].getModel().setValue(values[2]);
    up();
  } else {
    up();
  }
})

/* Show on terminal */
const prefix = {
  log: '',
  info: 'Info: ',
  warn: 'Warn: ',
  error: 'Error: ',
  debug: 'Debug: '
}
const cssType = {
  log: '',
  info: 'ci',
  warn: 'cw',
  error: 'ce',
  debug: 'cd'
}
function terminal(type, params) {
  if (type == 'clear') {
    document.getElementById('readout').innerHTML = '# Console'
    return;
  }
  let text = [prefix[type]];
  params.forEach(param => {
    if (typeof param === 'object') {
      let changed = 'failed to decode';
      try {
        changed = JSON.stringify(param);
      } catch (err) {
        // ignore
      }
      text.push(param + ': ' + changed);
    } else {
      text.push(param.toString().replaceAll('\n', '<br>'));
    }
  })
  text = text.join(' ')
  document.getElementById('readout').innerHTML += `<br><label class="${cssType[type]}">${text}</label>`;
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
