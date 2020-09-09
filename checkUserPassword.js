const crypto = require('crypto');

const checkUserPassword = (req, resStep) => (err, result) => {
  if (err) {
    res.status(400).json({ error: 'Invalid user information. Please check again.' });
    return;
  }
  const [user] = result;
  console.log(`[USER] ${user} ${result}`);
  crypto.pbkdf2(req.body.PASSWORD, user.SALT, 100000, 64, 'sha512', (cryptoErr, derivedKey) => {
    resStep(derivedKey.toString('hex') === user.PASSWORD, user);
  });
};

module.exports = checkUserPassword;
