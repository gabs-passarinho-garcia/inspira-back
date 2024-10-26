import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';

import * as endpoints from './endpoints';

const app = new OpenAPIHono();

app.get('/', c => {
  return c.text('Hello Hono!');
});

// The openapi.json will be available at /doc
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Inspira API',
  },
});

// Use the middleware to serve Swagger UI at /ui
app.get('/doc-ui', swaggerUI({ url: '/doc' }));

Object.values(endpoints).forEach(endpoint => endpoint(app));

console.info('App started');

export default app;
