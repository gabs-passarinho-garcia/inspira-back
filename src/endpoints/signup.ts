import { type OpenAPIHono as Hono, createRoute } from '@hono/zod-openapi';
import { z } from 'zod';
import { HttpStatusEnum } from '@/shared/enum/HttpStatus';
import { SignupInput, SignupInputSchema, SignupService } from '@/services';
import { UserOutputSchema } from '@/models/user';
import { ContentOutputSchema } from '@/models/content';
import { FundingOutputSchema } from '@/models/funding';

export const signup = (app: Hono): void => {
  const route = createRoute({
    method: 'post',
    path: '/signup',
    request: {
      body: {
        content: {
          'application/json': {
            schema: SignupInputSchema,
          },
        },
      },
    },
    responses: {
      201: {
        content: {
          'application/json': {
            schema: z.object({
              user: UserOutputSchema.shape.user,
              content: ContentOutputSchema.shape.content,
              funding: FundingOutputSchema.shape.funding,
              approved: z.boolean(),
            }),
          },
        },
        description: 'User, content and funding created successfully',
      },
      500: {
        content: {
          'application/json': {
            schema: z.object({
              error: z.string(),
            }),
          },
        },
        description: 'Internal server error',
      },
    },
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app.openapi(route, async c => {
    console.info('POST /signup');

    try {
      const data = (await c.req.json()) as SignupInput;

      const result = await SignupService.execute(data);

      return c.json(result, HttpStatusEnum.CREATED);
    } catch (error) {
      console.error(error);
      return c.json(
        {
          error: 'Internal server error',
        },
        {
          status: HttpStatusEnum.INTERNAL_SERVER_ERROR,
        },
      );
    }
  });
};
