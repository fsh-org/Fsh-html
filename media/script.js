// Set splits
Split(['#editors', '#view']);
Split(['.render-div', '#console'], { direction: 'vertical', sizes: [75, 25] });

// Custom split
let main = document.querySelector('main');
let panes = document.querySelectorAll('main div:not(.gutter)');
let paneSizes = [33.33, 33.33, 33.34];
let FSplit = document.querySelector('main div.gutter');
let SSplit = document.querySelectorAll('main div.gutter')[1];
FSplit.onpointerdown = SSplit.onpointerdown = (evt)=>{ evt.target.setPointerCapture(evt.pointerId) };
FSplit.onpointerup = FSplit.onpointercancel = SSplit.onpointerup = SSplit.onpointercancel = (evt)=>{ evt.target.releasePointerCapture(evt.pointerId) };
FSplit.onpointermove = SSplit.onpointermove = (evt)=>{
  if (!evt.target.hasPointerCapture(evt.pointerId)) return;
  let idx = evt.target===FSplit?0:1;
  let bounds = main.getBoundingClientRect();
  let before = paneSizes[idx];
  paneSizes[idx] = Math.min(Math.max((evt.clientY-bounds.top)/bounds.height*100,0),100)-(SSplit===evt.target?paneSizes[0]:0);
  paneSizes[idx+1] = 100-paneSizes[0]-paneSizes[2-idx];
  if (paneSizes[1]<0) {
    paneSizes[2-idx*2] += paneSizes[1];
    paneSizes[1] = 0;
  }
  panes[0].style.setProperty('--h', paneSizes[0].toFixed(2)+'%');
  panes[1].style.setProperty('--h', paneSizes[1].toFixed(2)+'%');
  panes[2].style.setProperty('--h', paneSizes[2].toFixed(2)+'%');
};

/* On change */
let sval = [];
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
  iframe.contentDocument.write(`<style id="__FSH_BASE">${window.cssbases[document.querySelector('input[name="optcssbase"]:checked').value]}</style>
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
  params.forEach(param=>{
    switch(typeof param) {
      case 'object':
        let changed = ': ';
        try {
          changed += JSON.stringify(param);
        } catch(_) {
          changed = '';
        }
        if (param===null) {
          param = 'null';
          changed = '';
        }
        text.push(param.toString()+changed);
        break;
      case 'undefined':
        text.push('undefined');
        break;
      case 'bigint':
        text.push(param.toString()+'n');
        break;
      case 'boolean':
      case 'number':
      case 'symbol':
        text.push(param.toString());
        break;
      case 'function':
      case 'string':
      default:
        text.push(param.toString().replaceAll('\n', '<br>'));
        break;
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