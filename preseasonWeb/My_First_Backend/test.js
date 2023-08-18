const express = require('express');
const basicAuth = require('express-basic-auth')
const app = express();

app.use(basicAuth({
    users: { 'admin': 'supersecret' }
}))
app.get('/', (req, res) => {
  res.send('authorized');
});
app.listen(3000, () => console.log('server started'));