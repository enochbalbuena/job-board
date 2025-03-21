const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');
const validateRequest = require('../middleware/validateRequest');
const clientSchema = require('../validation/clientValidation');

router.get('/', clientsController.getClients);
router.get('/:id', clientsController.getClientById);
router.post('/', validateRequest(clientSchema), clientsController.createClient);
router.put('/:id', validateRequest(clientSchema), clientsController.updateClient);
router.delete('/:id', clientsController.deleteClient);

module.exports = router;
