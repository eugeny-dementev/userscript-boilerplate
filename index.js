var template = require('./templates/index.hbs');

function go () {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000, 'hello from userscript boilerplate');
  });
}

async function hello () {
  var message = await go();

  document.write(template({ message }));
}

hello();