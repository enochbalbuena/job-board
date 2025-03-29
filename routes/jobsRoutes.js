const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');
const validateRequest = require('../middleware/validateRequest');
const jobSchema = require('../validation/jobValidation');
const { isAuthenticated } = require('../middleware/authenticate');


/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management endpoints
 */

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of all jobs
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *     - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created
 */

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Update a job
 *     tags: [Jobs]
 *     security:
 *     - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated
 *   delete:
 *     summary: Delete a job
 *     tags: [Jobs]
 *     security:
 *     - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted
 */

router.get('/', jobsController.getJobs);
router.post('/', isAuthenticated, validateRequest(jobSchema), jobsController.createJob);
router.put('/:id', isAuthenticated, validateRequest(jobSchema), jobsController.updateJob);
router.delete('/:id', isAuthenticated, jobsController.deleteJob);

module.exports = router;