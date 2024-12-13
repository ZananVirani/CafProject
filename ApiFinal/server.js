const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`app is listening at http://localhost${PORT}`)
});