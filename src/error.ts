export class UnreachableError extends Error {
  name = "UnreachableError";

  constructor(message: string, options?: ErrorOptions) {
    super(`خطای غیر منتظره رخ داد! ${message}`, options);
  }
}

export class ApplicationError extends Error {
  name = "ApplicationError";
}

export class RateLimitError extends Error {
  name = "RateLimitError";
  readonly response;

  constructor(response: Response, options?: ErrorOptions) {
    super("سقف درخواست برای امروز به اتمام رسیده است", options);
    this.response = response;
  }
}
