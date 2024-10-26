import { type OpenAPIHono as Hono, createRoute } from '@hono/zod-openapi';
import { z } from 'zod';

import { PrismaHandler } from '@/shared/providers/prisma/PrismaHandler';
import { HttpStatusEnum } from '@/shared/enum/HttpStatus';


export const readPersonal = (app: Hono): void => {
  const route = createRoute({
    method: 'get',
    path: '/personal',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({
              personal: z.array(
                z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  email: z.string().email(),
                  createdAt: z.string().datetime(),
                  updatedAt: z.string().datetime().nullable(),
                }),
              ),
            }),
          },
        },
        description: 'say hello',
      },
    },
  });

  app.openapi(route, async c => {
    console.info('GET /personal');
    const personal = await PrismaHandler.client.personal.findMany();
    return c.json(
      {
        personal: personal,
      },
      HttpStatusEnum.OK,
    );
  });
};