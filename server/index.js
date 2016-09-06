const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/', express.static(`${__dirname}/../client/build`));

require('./middleware')(app);
require('./routes')(app);

app.listen(PORT, console.log(`Listening on port ${PORT}`));
