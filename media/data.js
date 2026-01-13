window.presets = {
  blank: {
    html: '',
    css: '',
    js: ''
  },

  default: {
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Website</title>
    \n  </head>
  <body>
      \n  </body>
</html>`,
    css: `body {
  font-family: Arial;
  color: #ddd;
  background-color: #111;
}`,
    js: ''
  },

  seo: {
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Website</title>
    <meta property="og:title" content="Website">
    <meta name="twitter:title" content="Website">
    <meta name="description" content="DESCRIPTION">
    <meta property="og:description" content="DESCRIPTION">
    <meta name="twitter:description" content="DESCRIPTION">
    <link rel="canonical" href="URL">
    <meta property="og:url" content="URL">
    <link rel="icon" href="URL IMAGE" type="image/png">
    <meta property="og:image" content="URL IMAGE">
    <meta property="og:image:alt" content="IMAGE DESCRIPTION">
    <meta name="twitter:image" content="URL IMAGE">
    <meta name="theme-color" content="COLOR">
    <!-- ------- -->
    <meta charset="UTF-8">
    <meta name="robots" content="index, follow">
    <meta property="og:locale" content="en">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <nav>
      \n    </nav>
    <main>
      <section>
        \n      </section>
      \n    </main>
    <footer>
      \n    </footer>
  </body>
</html>`,
    css: `body {
  font-family: Arial;
  color: #ddd;
  background-color: #111;
}`,
    js: ''
  },

  bootstrap: {
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Website</title>
    \n    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
  </head>
  <body class="bg-dark">
    \n    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
  </body>
</html>`,
    css: '',
    js: ''
  },

  tailwind: {
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Website</title>
    \n    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style type="text/tailwindcss">
      \n    </style>
  </head>
  <body class="text-gray-200 bg-gray-900">
    \n  </body>
</html>`,
    css: '',
    js: ''
  }
};

window.cssbases = {
  none: '',
  /* normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */
  normalize: ` html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:#fff0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}`,
  /* v2.0 | 20110126 | Public Domain | https://meyerweb.com/eric/tools/css/reset/ */
  reset: `html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}`
}