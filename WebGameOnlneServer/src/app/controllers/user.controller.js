const jwt = require('jsonwebtoken');
const sceretKey = require('../../configs/jwt.config');
const bcrypt = require('bcryptjs');
const sql = require('../../libs/database/connect.mysql');

class UserController {
  handleRegister(req, res) {
    const { username, password } = req.body;
    console.log(111, username);

    sql.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
      if (err) {
        console.error('Error handling register:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ msg: 'Username already exists' });
      }

      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          console.error('Error handling register:', err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        bcrypt.hash(password, salt, (err, hashedPassword) => {
          if (err) {
            console.error('Error handling register:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
          }

          sql.query(
            'INSERT INTO user (username, password) VALUES (?, ?)',
            [username, hashedPassword], // Use hashedPassword instead of password
            (err, results) => {
              if (err) {
                console.error('Error handling register:', err);
                return res.status(500).json({ message: 'Internal Server Error 2' });
              }

              return res.status(200).json({ msg: 'Register Successfully' });
            }
          );
        });
      });
    });
  }
  // login user
  async handleLogin(req, res) {
    const { username, password } = req.body;

    sql.query(`SELECT * FROM user WHERE username = '${username}'`, async (err, results) => {
      if (err) {
        console.error('Error handling login:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (results.length > 0) {
        const user = results[0];

        try {
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          console.log('true hay false', isPasswordMatch);

          if (isPasswordMatch) {
            const accessToken = jwt.sign(user, sceretKey);
            return res.status(200).json({
              data: user,
              accessToken,
            });
          }
        } catch (error) {
          console.error('Error handling login:', error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
      }

      res.status(404).json({ msg: 'User not found' });
    });
  }

  async handleGetUser(req, res) {
    try {
      sql.query('SELECT * FROM user', (err, results) => {
        if (err) {
          console.error('Error handling get users:', err);
          return res.status(500).json({ msg: 'Server error' });
        }

        res.status(200).json({ data: results });
      });
    } catch (error) {
      console.error('Error handling get users:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  }

  // khoá user trang admin
  blockLockUser(req, res) {
    const { idUser } = req.params;
    const isLocked = req.body;
    console.log(idUser, req.body);
    try {
      const query = `UPDATE user SET isLocked = ${isLocked.isLocked} WHERE idUser = ${idUser}`;
      sql.query(query, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Lỗi server' });
        }
        res.status(200).json({ message: 'Tài khoản đã được khoá' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Lỗi server' });
    }
  }

 
}

module.exports = new UserController();
