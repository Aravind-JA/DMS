const router = require('express').Router();
const forms = require('multer')();
const { PostUserFiles, GetUserFiles, DeleteFile, GetFiles, GetOneFile, MoveFile, GetFolderFiles } = require("../Controller/controller");

router.route("/").get(GetFiles).post(PostUserFiles);
router.route("/owner/:owner").get(GetUserFiles);
router.route("/folder/:id").get(GetFolderFiles);
router.route("/:id").get(GetOneFile).put(forms.array(), MoveFile).delete(DeleteFile);

module.exports = router;