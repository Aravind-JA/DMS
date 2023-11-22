const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { single } = require('../config/multer');
const File = require('../Model/model');


async function GetFiles(req, res) {
    try {
        const data = await File.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function GetOneFile(req, res) {
    try {
        const id = req.params.id;
        const file = await File.findById(id);
        res.status(200).json(file);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function GetUserFiles(req, res) {
    try {
        const owner = req.params.owner;
        const files = await File.find({ owner });
        res.status(200).json(files)
    } catch (error) {
        res.status(400).json(error);
    }
}

async function PostUserFiles(req, res) {
    single.single('content')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            res.status(400).json({ error: "Multer Error...", err });
        } else if (err) {
            res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } });
        } else {
            try {
                const owner = req.params.owner;
                const { name, folder } = req.body;

                if (!name || !owner) {
                    return res.status(409).json({ message: "All fields are mandatory" });
                }

                const content = req.file.path;
                const Body = { name, content, owner, folder };
                const newFile = await File.create(Body);
                res.status(200).json(newFile);

            } catch (error) {
                res.status(400).json(error);
            }
        }
    });
}

async function MoveFile(req, res) {
    try {
        const id = req.params.id;
        const body = req.body;
        const updatedFile = await File.findByIdAndUpdate(id, body, { new: true });

        if (!updatedFile) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.status(200).json({ message: 'File moved successfully', file: updatedFile });
    } catch (error) {
        res.status(400).json(error);
    }
}

async function DeleteFile(req, res) {
    try {
        const id = req.params.id;
        const file = await File.findById(id);
        deleteFiles(file.content);
        await File.findByIdAndDelete(id);
        res.status(200).json({ message: "Successfully Deleted..." });
    } catch (error) {
        res.status(400).json(error);
    }
}

function deleteFiles(file) {
    const pathsegments = __dirname.split('\\');
    const dirname = pathsegments.slice(0, -1).join('/');
    const absolutePath = path.join(dirname, file);
    if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
    }
}

module.exports = { GetFiles, GetOneFile, GetUserFiles, PostUserFiles, DeleteFile, MoveFile };