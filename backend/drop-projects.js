const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/TheContractum')
  .then(async () => {
    console.log('Connected to DB');
    await mongoose.connection.collection('projects').drop().catch(e => console.log('projects collection might not exist yet'));
    console.log('Projects collection dropped.');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
