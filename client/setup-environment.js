const fs = require('fs/promises');

const BACKEND_HOSTNAME = process.env.BACKEND_HOSTNAME || 'localhost';
const BACKEND_PORT = process.env.BACKEND_PORT || '4200';

async function setupEnvironment() {
  if (!BACKEND_HOSTNAME?.length) {
    throw new Error('Environment property BACKEND_HOSTNAME is not set');
  }

  const environments = {
    hostname: BACKEND_HOSTNAME,
  };

  const port = BACKEND_PORT && parseInt(BACKEND_PORT);

  if (isNaN(port)) {
    throw new Error('Environment property BACKEND_PORT must be a valid integer')
  }

  if (port) {
    environments.port = port;
  }

  return fs.writeFile('./src/environments.json', JSON.stringify(environments));
}

setupEnvironment();
