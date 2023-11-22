const router = require('express').Router();
const forms = require('multer')();
const { PostUserFiles, GetUserFiles, DeleteFile, GetFiles, GetOneFile, MoveFile } = require("../Controller/controller");

router.route("/").get(GetFiles);
router.route("/owner/:owner").get(GetUserFiles).post(PostUserFiles);
router.route("/:id").get(GetOneFile).put(forms.array(), MoveFile).delete(DeleteFile);

module.exports = router;