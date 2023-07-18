const sql = require('../../libs/database/connect.mysql');

const modelPostImage = (newImage, res) => {
  // Kiểm tra image đã tồn tại trong CSDL chưa
  const checkImageQuery = `SELECT * FROM image WHERE url = ?`;
  sql.query(checkImageQuery, [newImage.linkImage], (err, result) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ msg: 'Server error' });
      return;
    }
    if (result.length > 0) {
      res.status(400).json({ message: 'Image already exists' });
      return;
    }
    //  nếu chưa có image thì cho thêm mới
    const insertData = `INSERT INTO image SET ?`;
    sql.query(insertData, newImage, (err, result) => {
      if (err) {
        console.log(err);
        console.log(newImage);
        res.status(500).json({ msg: 'Loi server' });
        return;
      }
      res.status(200).json({ msg: 'Thêm mới Image thành công' });
    });
  });
};

module.exports = {
  modelPostImage,
};
