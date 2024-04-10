const express = require('express');
const morgan = require('morgan');
const moment = require('moment-timezone');
const { PORT, APP_NAME } = require('./utils/config');

const app = express();
app.use(express.json());
app.use(morgan('dev'))

app.use('/api/product', require('./routes/product'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/admin', require('./routes/admin'));

app.listen(PORT, () => {
  moment().tz("Asia/Calcutta").format();
  process.env.TZ = 'Asia/Calcutta';
  let date = moment().format('DD-MM-YYYY, hh:mm a');
  console.log(`${APP_NAME} is running on port ${PORT}, ${date}`);
})