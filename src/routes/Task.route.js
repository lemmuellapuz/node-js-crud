const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/Task.controller');

const validateRequest = require('../middlewares/ValidateRequest.middleware')

const schema = require('../validations/task/TaskSchema.validation');

router.get('/', TaskController.index);

router.get('/:taskid', TaskController.show);

router.post('/', validateRequest(schema.storeSchema), TaskController.store);

router.put('/:taskid', validateRequest(schema.updateSchema), TaskController.update);

router.delete('/:taskid', TaskController.destroy);

module.exports = router;