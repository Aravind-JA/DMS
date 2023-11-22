const { Schema, model } = require('mongoose');

const folderSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
});

const Folder = model('Folder', folderSchema);

module.exports = Folder;