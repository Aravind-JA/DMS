const { Schema, model } = require('mongoose');

const fileSchema = new Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    folder: { type: Schema.Types.ObjectId, ref: 'Folder' },
});

const File = model('File', fileSchema);

module.exports = File;