const express = require('express');
const connectDB = require('./config/mongo');
const app = express();
const port = 3002;

connectDB();

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use("/", require('./Routes/routes'));

app.listen(port, () => {
    console.log(`File Service started running on ${port}`);
});