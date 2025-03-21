const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Board API',
      version: '1.0.0',
      description: 'API for managing freelance jobs and clients',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Development Server',
      },
      {
        url: 'https://job-board-ccym.onrender.com', 
        description: 'Production Server (Render)',
      }
    ],
    components: {
      schemas: {
        Job: {
          type: 'object',
          required: ['title', 'description', 'clientId'],
          properties: {
            title: { type: 'string', description: 'Job title' },
            description: { type: 'string', description: 'Job details and requirements' },
            budget: { type: 'number', description: 'Job budget in USD' },
            status: { type: 'string', enum: ['open', 'in progress', 'closed'], default: 'open', description: 'Job status' },
            deadline: { type: 'string', format: 'date', description: 'Application deadline' },
            clientId: { type: 'string', description: 'Reference to the client who posted the job' },
            location: { type: 'string', description: 'Job location (e.g., Remote)' },
            skillsRequired: { type: 'array', items: { type: 'string' }, description: 'List of required skills' }
          }
        },
        Client: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: { type: 'string', description: 'Client full name' },
            email: { type: 'string', description: 'Client email address' },
            company: { type: 'string', description: 'Company name' },
            website: { type: 'string', description: 'Client company or portfolio website' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;
