const bcrypt = require('bcrypt');

// Change this to your desired password
const password = 'admin123';

// Hash password
bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }
  console.log('Plain Password:', password);
  console.log('Hashed Password:', hash);
});
