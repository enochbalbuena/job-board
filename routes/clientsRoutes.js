const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');
const validateRequest = require('../middleware/validateRequest');
const clientSchema = require('../validation/clientValidation');
const { isAuthenticated } = require('../middleware/authenticate');


/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management endpoints
 */

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: List of all clients
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     security:
 *     - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       201:
 *         description: Client created
 */

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client found
 *   put:
 *     summary: Update a client
 *     tags: [Clients]
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
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: Client updated
 *   delete:
 *     summary: Delete a client
 *     tags: [Clients]
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
 *         description: Client deleted
 */
router.get('/', clientsController.getClients);
router.get('/:id', clientsController.getClientById);
router.post('/', isAuthenticated, validateRequest(clientSchema), clientsController.createClient);
router.put('/:id', isAuthenticated, validateRequest(clientSchema), clientsController.updateClient);
router.delete('/:id', isAuthenticated, clientsController.deleteClient);

module.exports = router;