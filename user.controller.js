const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../../models/user/user.model');
const checkUserPassword = require('../../common/checkUserPassword');

const KEY = process.env.SECRET_KEY;

exports.createToken = async (req, res) => {
  if (req.body && !req.body.USER_ID && !req.body.PASSWORD) {
    res.status(400).json({ error: 'Invalid user information. Please check again..' });
    return;
  }
  const checkResFormat = checkUserPassword(req, (flag, user) => {
    if (flag) {
      const token = jwt.sign(
        {
          user_id: user.USER_ID,
          phone_no: user.PHONE_NO,
          org_code: user.ORG_CODE,
        }, KEY, {
          expiresIn: process.env.TOKEN_EXPIRE,
        }
      );

      delete user.PASSWORD;
      delete user.SALT;

      res.cookie('token', token, { httpOnly: true, secure: false });
      res.status(200).json({ result: 'ok', token, user });
    } else {
      res.status(400).json({ error: 'Invalid user information. Please check again.' });
    }
  });

  User.find(req.body, checkResFormat);
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty'
    });
  }

  const userInfo = req.body;
  userInfo.USER_TYPE = userInfo.USER_TYPE || 'A';

  crypto.randomBytes(64, (randomErr, buf) => {
    const salt = buf.toString('hex');
    crypto.pbkdf2(userInfo.PASSWORD, salt, 100000, 64, 'sha512', (encryptErr, derivedKey) => {
      if (encryptErr) { throw encryptErr; }
      userInfo.PASSWORD = derivedKey.toString('hex');
      userInfo.SALT = salt;

      User.create(userInfo, (sqlErr, data) => {
        if (sqlErr) {
          res.status(sqlErr.code === 'ER_DUP_ENTRY' ? 409 : 500).send({
            message: sqlErr.message || 'Some error occurred while creating user'
          });
        } else {
          res.status(201).send(data);
  }
      });
    });
  });
};

exports.checkPassword = (req, res) => {
  if (req.body && !req.body.USER_ID && !req.body.PASSWORD) {
    res.status(400).json({ error: 'Invalid user information. Please check again..' });
    return;
  }

  const checkResFormat = checkUserPassword(req, (flag) => {
    if (flag) {
      res.status(200).json({ result: 'ok' });
    } else {
      res.status(400).json({ error: 'Invalid user password. Please check again.' });
    }
  });

  User.find(req.body, checkResFormat);
};
