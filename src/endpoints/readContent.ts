import type { Hono } from 'hono';
import { z } from 'zod';

import { PrismaHandler } from '@/shared/providers/prisma/PrismaHandler';
import { HttpStatusEnum } from '@/shared/enum/HttpStatus';

export const readContent = (app: Hono): void => {
  app.get('/content/:name', async c => {
    console.info('GET /content/:name');
    const name = z
      .string({
        message: 'Invalid name',
      })
      .parse(c.req.param('name'));

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
    return c.json({
      content: content,
    });
  });
};
