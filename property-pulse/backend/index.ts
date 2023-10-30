const myapp = require('./app')

const PORT = 8080;

myapp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the Express API
module.exports = myapp;