const mysql = require('../../libs/database/connect.mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const secretKey = process.env.SECRET_KEY; // Thêm dòng này

class AdminController {
  async loginAdmin(req, res) {
    const { username, password } = req.body;

    try {
      // Kiểm tra thông tin đăng nhập admin trong bảng user
      const query = `SELECT * FROM user WHERE username = ? AND role = 2`;
      mysql.query(query, [username], async (err, results) => {
        if (err) {
          console.error('Error handling admin login:', err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (results.length > 0) {
          const admin = results[0];

          try {
            // So sánh mật khẩu đã mã hóa
            const isPasswordMatch = await bcrypt.compare(password, admin.password);

            if (isPasswordMatch) {
              // Tạo mã thông báo truy cập cho admin
              const accessToken = jwt.sign({ adminId: admin.idUser }, secretKey);

              return res.status(200).json({
                message: 'Admin login successful',
                accessToken,
              });
            } else {
              return res.status(401).json({ message: 'Invalid password' });
            }
          } catch (error) {
            console.error('Error handling admin login:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
          }
        } else {
          return res.status(404).json({ message: 'Admin not found' });
        }
      });
    } catch (error) {
      console.error('Error handling admin login:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new AdminController();
