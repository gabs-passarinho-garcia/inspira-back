import { Hono } from 'hono';
import * as endpoints from './endpoints';

const app = new Hono();

app.get('/', c => {
  return c.text('Hello Hono!');
});

Object.values(endpoints).forEach(endpoint => endpoint(app));

console.info('App started');

export default app;
