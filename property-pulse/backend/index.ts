const myapp = require('./app')
//const config = require('./utils/config')
//const logger = require('./utils/logger')

const PORT = 8080;

myapp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});