module.exports = function renderFullPage(html, initialState) {
  // <!-- Bootstrap -->
  // <!-- Latest compiled and minified CSS -->
  // <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
  // <link rel="stylesheet" href="https://rawgithub.com/mgcrea/bootstrap-additions/master/dist/bootstrap-additions.min.css">

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Jaakko study</title>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

      <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>

      <style>
        .navbar {
          background: #3F51B5;
          color:#fff;
          border:none;
          margin-bottom: 0;
        }
        @media (min-width: 768px) {
          .nav.navbar-nav {

          }
        }
        .nav.navbar-nav {
        }
      </style>
    </head>
    <body>
      <div id="app"></div>
      <script src="/lib/bundle.js"></script>
    </body>
  </html>
  `
}
