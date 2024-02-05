function up() {
  //document.getElementsByTagName('iframe')[0].contentDocument.documentElement.innerHTML = "";
  document.getElementsByTagName('iframe')[0].contentDocument.documentElement.innerHTML = document.getElementsByTagName('textarea')[0].value;
}
document.getElementsByTagName('textarea')[0].onkeydown = up
document.getElementsByTagName('textarea')[0].onkeyup = up
