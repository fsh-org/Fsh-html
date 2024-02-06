let textarea = document.getElementsByTagName('textarea')[0];
let iframe = document.getElementsByTagName('iframe')[0];
function up() {
  iframe.contentDocument.documentElement.innerHTML = '';
  iframe.contentDocument.documentElement.insertAdjacentHTML('afterbegin', textarea.value)
}
textarea.onkeydown = up
textarea.onkeyup = up

import { bindKey } from '@rwh/keystrokes'

bindKey('ctrl + shift + f', () => document.getElementById('search').showModal())
