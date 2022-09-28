var path = require('path');

function route(app,dir) {
  app.get('/', (req, res) => {
    res.sendFile(path.join(dir, 'static', 'index.html'));
  });
}

module.exports = route