const Folder = require('../Model/model');

async function GetAll(req, res) {
    try {
        const folders = await Folder.find();
        res.status(200).json(folders);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function GetOne(req, res) {
    try {
        const id = req.params.id;
        const folder = await Folder.findById(id);
        res.status(200).json(folder);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function GetUserFolder(req, res) {
    try {
        const owner = req.params.id;
        const folders = await Folder.find({ owner });
        res.status(200).json(folders);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function DeleteFolder(req, res) {
    try {
        const id = req.params.id;
        const folder = await Folder.findByIdAndDelete(id);
        res.status(200).json({ message: "Successfully deleted..." });
    } catch (error) {
        res.status(400).json(error);
    }
}

async function EditFolder(req, res) {
    try {
        console.log(req.body);
        const id = req.params.id;
        const body = req.body;
        const updatedFolder = await Folder.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json({ message: "Successfully updated", updatedFolder });
    } catch (error) {
        res.status(400).json(error);
    }
}

async function CreateFolder(req, res) {
    try {
        const { name, owner } = req.body;
        if (!name || !owner) {
            return res.status(409).json({ message: "All fields are mandatory" });
        }
        const newFolder = await Folder.create({ name, owner });
        res.status(200).json(newFolder);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { GetAll, GetOne, GetUserFolder, EditFolder, DeleteFolder, CreateFolder };