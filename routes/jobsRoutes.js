const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');
const validateRequest = require('../middleware/validateRequest');
const jobSchema = require('../validation/jobValidation');

router.get('/', jobsController.getJobs);
router.post('/', validateRequest(jobSchema), jobsController.createJob);
router.put('/:id', validateRequest(jobSchema), jobsController.updateJob);
router.delete('/:id', jobsController.deleteJob);

module.exports = router;
