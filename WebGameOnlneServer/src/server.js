const app = require('./app/app');
const PORT = 3000;
app.listen(PORT, async () => {
  try {
    console.log(`Server Express running at http://localhost:${PORT}`);
  } catch (error) {
    console.log('err', error);
  }
});
