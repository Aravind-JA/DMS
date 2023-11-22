const express = require('express');
const forms = require('multer')();
const app = express();
const connectDB = require('./Config/mongo');
const port = 3003;

connectDB();

app.use(express.json());
app.use(forms.array());

app.use('/', require('./Routes/routes'));

app.listen(port, () => {
    console.log(`Folder Service started running on ${port}`);
});