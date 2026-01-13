// Set splits
document.addEventListener('DOMContentLoaded', () => {
  Split(['#editors', '#view']);
  Split(['.render-div', '#console'], { direction: 'vertical', sizes: [75, 25] });
});

let sval = [];

/* On change */
function up(force='') {
  let data = window.monaco.editor.getEditors();

  // Check if changed
  let val = [data[0].getValue(), data[1].getValue(), data[2].getValue()];
  if (force!=='force' && sval.join('|SEPARATOR|FSH|') === val.join('|SEPARATOR|FSH|')) return;
  localStorage.setItem('autosave', val.join('|SEPARATOR||FSH|'));

  // Soft refresh for css
  if (force!=='force' && val[0]===sval[0]&&val[2]===sval[2] && val[1]!==sval[1]) {
    sval = val;
    document.getElementById('render').contentDocument.getElementById('__FSH_CSS').innerHTML = val[1];
    return;
  }
  sval = val;

  // Set iframe
  document.querySelector('#view div:has(iframe)').innerHTML = '<iframe id="render" title="Rendered content" style="background-color: #fff"></iframe>';
  let iframe = document.getElementById('render');

  // Help html
  if (document.getElementById('console-enabled').checked) {
    iframe.contentDocument.write(`<script>
  console.log = function(...params){window.top.terminal('log', params)}
  console.info = function(...params){window.top.terminal('info', params)}
  console.warn = function(...params){window.top.terminal('warn', params)}
  console.error = function(...params){window.top.terminal('error', params)}
  console.debug = function(...params){window.top.terminal('debug', params)}
  console.assert = function(assertion, ...params){if(!assertion){window.top.terminal('error', ['Assertion failed'])}}
  console.clear = function(){window.top.terminal('clear', ['The cleansing'])}
  window.onerror = function(errorMsg, url, lineNumber) {window.top.terminal('error', [errorMsg+'; Line '+lineNumber]);return false;}
</script>`);
    if (document.getElementById('console-clear').checked) document.getElementById('readout').innerHTML = '# Console';
  }

  function handleInfinite(code) {
    if (document.getElementById('freeze').checked) return code.replaceAll(/((for|while) *?\([^¬]*?\)[^¬]*?{)/g, 'if(!window.__c)window.__c=0;$1window.__c++;if(window.__c>1000){throw new Error("Infinite loop")};');
    return code;
  }
  // Insert user html
  iframe.contentWindow.__c = 0;
  iframe.contentDocument.write(`<style id="__FSH_BASE">${window.cssbases[document.querySelector('input[name="optcssbase"][checked]').value]}</style>
<style id="__FSH_CSS">${data[1].getValue()}</style>`);
  iframe.contentDocument.write(handleInfinite(data[0].getValue()));
  iframe.contentDocument.write('<script>'+handleInfinite(data[2].getValue())+'</script>');
}

window.addEventListener('load', ()=>{
  if (localStorage.getItem('autosave')) {
    let editors = window.monaco.editor.getEditors();
    let values = localStorage.getItem('autosave').split('|SEPARATOR||FSH|');
    editors[0].getModel().setValue(values[0]);
    editors[1].getModel().setValue(values[1]);
    editors[2].getModel().setValue(values[2]);
  }
  up();
});

/* Show on terminal */
const prefix = {
  log: '',
  info: 'Info:',
  warn: 'Warn:',
  error: 'Error:',
  debug: 'Debug:'
}
const cssType = {
  log: '',
  info: 'ci',
  warn: 'cw',
  error: 'ce',
  debug: 'cd'
}
function terminal(type, params) {
  if (type === 'clear') {
    document.getElementById('readout').innerHTML = '# Console';
    return;
  }
  let text = [prefix[type]];
  params.forEach(param => {
    if (typeof param === 'object') {
      let changed = 'failed to decode';
      try {
        changed = JSON.stringify(param);
      } catch (err) {
        // Ignore :3
      }
      text.push(param+': '+changed);
    } else {
      text.push((param??'undefined').toString().replaceAll('\n', '<br>'));
    }
  });
  text = text.join(' ');
  document.getElementById('readout').innerHTML += `<pre class="${cssType[type]}">${text}</pre>`;
}
window.terminal = terminal;

/* Make editors set their size corretly */
function layout() {
  window.monaco.editor.getEditors().forEach(t=>t.layout({}));
}

/* Presets */
function setPreset(preset) {
  let editors = window.monaco.editor.getEditors();
  if (!window.presets[preset]) {
    alert('An unknown preset was loaded.');
    throw new Error('Unknown preset: '+preset);
  }
  editors[0].getModel().setValue(window.presets[preset].html);
  editors[1].getModel().setValue(window.presets[preset].css);
  editors[2].getModel().setValue(window.presets[preset].js);
}