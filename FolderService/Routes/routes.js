const router = require('express').Router();
const { GetAll, GetOne, CreateFolder, EditFolder, DeleteFolder, GetUserFolder } = require('../Controller/controller');

router.route('/').get(GetAll).post(CreateFolder);
router.route('/:id').get(GetOne).put(EditFolder).delete(DeleteFolder);
router.route('/owner/:id').get(GetUserFolder);

module.exports = router;