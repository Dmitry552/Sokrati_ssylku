const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

const PORT = config.get('port') || 5000;

function start() {
  try {
    mongoose.set('useFindAndModify', false);
    mongoose.connection
      .on('error', error => console.log(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => {
        var info = mongoose.connections[0];
        console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
      });
    mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  } catch (error) {
    console.log('Server error', error.message);
    process.exit(1);
  }
}

start();

app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
