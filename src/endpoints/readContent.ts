import { type OpenAPIHono as Hono, createRoute } from '@hono/zod-openapi';
import { z } from 'zod';

import { PrismaHandler } from '@/shared/providers/prisma/PrismaHandler';
import { HttpStatusEnum } from '@/shared/enum/HttpStatus';

export const readContent = (app: Hono): void => {
  const route = createRoute({
    method: 'get',
    path: '/content/{name}',
    request: {
      params: z.object({
        name: z.string().openapi({
          param: {
            name: 'name',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The name of the content',
          },
          description: 'The name of the content',
          type: 'string',
          example: 'Narnia',
        }),
      }),
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({
              content: z.object({
                id: z.string().uuid(),
                title: z.string(),
                body: z.string(),
                createdAt: z.string().datetime(),
                updatedAt: z.string().datetime().nullable(),
              }),
            }),
          },
        },
        description: 'say hello',
      },
      404: {
        content: {
          'application/json': {
            schema: z.object({
              error: z.string(),
            }),
          },
        },
        description: 'Content not found',
      },
    },
  });

  app.openapi(route, async c => {
    console.info('GET /content/:name');
    const name = c.req.param('name');

    const content = await PrismaHandler.client.content.findFirst({
      where: {
        title: name,
      },
    });

    if (!content) {
      return c.json(
        {
          error: 'Content not found',
        },
        HttpStatusEnum.NOT_FOUND,
      );
    }
    return c.json(
      {
        content: content,
      },
      HttpStatusEnum.OK,
    );
  });
};
