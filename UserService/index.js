const express = require('express');
const connectDB = require('./config/mongo');
const multer = require('multer');
const forms = multer();
const app = express();
const port = 3001;

connectDB();

app.use(express.json());
app.use(forms.array());

app.use("/", require('./Routes/route'));

app.listen(port, () => {
    console.log(`User Service started running on ${port}`);
});