const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/meet-our-team', require('./routes/meetOurTeam'));
app.use('/api/services', require('./routes/services'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/mission', require('./routes/mission'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/overview', require('./routes/overview'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
