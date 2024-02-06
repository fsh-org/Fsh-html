let textarea = document.getElementsByTagName('textarea')[0];
let iframe = document.getElementsByTagName('iframe')[0];
function up() {
  iframe.contentDocument.documentElement.innerHTML = '';
  iframe.contentDocument.documentElement.insertAdjacentHTML('afterbegin', textarea.value)
}
textarea.onkeydown = up
textarea.onkeyup = up

/*window.addEventListener("keydown",function (e) {
  if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
    e.preventDefault();
    document.getElementById('search').showModal();
  }
})*/
