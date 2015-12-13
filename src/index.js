var template = require('./../html/index.hbs');

function go () {
  return new Promise((resolve) => {
    setTimeout(resolve, 200, 'hello from userscript boilerplate');
  });
}

async function hello () {
  var message = await go();

  document.body.innerHTML = template({ message });
}

hello();
