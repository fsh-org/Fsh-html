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