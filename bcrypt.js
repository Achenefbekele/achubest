// Example to hash a password
import bcrypt from 'bcrypt';

const password = 'Achu4321';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hash);
  }

  bcrypt.compare('Achu4321', hash, (err, isMatch) => {
    if (err) throw err;
    console.log("Password is valid:", isMatch); // Should log: true
  });
});

const AUTH_USERNAME = process.env.AUTH_USERNAME;
const AUTH_PASSWORD = process.env.AUTH_PASSWORD;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
