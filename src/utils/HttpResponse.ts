type ErrorParams = {
  message: string;
};

export default class HttpResponse {
  static badRequest({ message }: ErrorParams) {
    return {
      statusCode: 400,
      body: {
        message: message,
      },
    };
  }

  static serverError() {
    return {
      statusCode: 500,
      body: {
        message: 'INTERNAL_ERROR',
      },
    };
  }

  static unauthorized({ message }: ErrorParams) {
    return {
      statusCode: 401,
      body: {
        message,
      },
    };
  }

  static ok<T>(data: T) {
    return {
      statusCode: 200,
      body: data,
    };
  }

  static created<T>(data: T) {
    return {
      statusCode: 201,
      body: data,
    };
  }

  static noContent() {
    return {
      statusCode: 204,
      body: null,
    };
  }

  static notFound({ message }: ErrorParams) {
    return {
      statusCode: 404,
      body: {
        message,
      },
    };
  }

  static forbidden({ message }: ErrorParams) {
    return {
      statusCode: 403,
      body: {
        message,
      },
    };
  }

  static conflict({ message }: ErrorParams) {
    return {
      statusCode: 409,
      body: {
        message,
      },
    };
  }
}

/**
 * @openapi
 * components:
 *   responses:
 *     BadRequest:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *     ServerError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *     Unauthorized:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *     Ok:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *     Created:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *     NotFound:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *     Forbidden:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *     Conflict:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */
