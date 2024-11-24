import bcrypt from 'bcrypt';

const password = 'Achu4321';
const saltRounds = 10;

bcrypt.hash(password, saltRounds)
  .then(hash => {
    console.log('Copy this hash to your .env file:', hash);
  });
