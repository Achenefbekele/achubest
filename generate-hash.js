const bcrypt = require('bcrypt');

const password = 'Achu4321';
const saltRounds = 10;

bcrypt.hash(password, saltRounds)
  .then(hash => {
    console.log('Use this hash in your .env file:');
    console.log(hash);
    
    // Verify the hash
    return bcrypt.compare('Achu4321', hash);
  })
  .then(isMatch => {
    console.log('Verification test:', isMatch);
  })
  .catch(err => {
    console.error('Error:', err);
  }); 