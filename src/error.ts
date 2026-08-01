import { createWriteStream } from "node:fs";
import { mkdtemp } from "node:fs/promises";
import { join } from "node:path";
import { Writable } from "node:stream";
import { writeJson } from "./json.ts";

export class UnreachableError extends Error {
  name = "UnreachableError";

  constructor(message: string, options?: ErrorOptions) {
    super(`خطای غیر منتظره رخ داد! ${message}`, options);
  }
}

export class ApplicationError extends Error {
  name = "ApplicationError";

  async prepareString() {
    return this.message;
  }
}

export class ApiError extends ApplicationError {
  name = "ApiError";
  readonly request;
  readonly response;

  constructor(request: Request, response: Response, options?: ErrorOptions) {
    super("خطای سرور.", options);
    this.request = request;
    this.response = response;
  }

  async prepareString() {
    const dir = await mkdtemp("ttac.api_error.");

    try {
      await writeJson(join(dir, "request_header.json"), {
        method: this.request.method,
        url: this.request.url,
        headers: Object.fromEntries(this.request.headers.entries()),
      });

      await writeJson(join(dir, "response_header.json"), {
        method: this.request.method,
        url: this.request.url,
        headers: Object.fromEntries(this.request.headers.entries()),
      });

      if (this.response.body && !this.response.bodyUsed) {
        const f = Writable.toWeb(
          createWriteStream(join(dir, "response_body.bin")),
        );

        await this.response.body.pipeTo(f);
      }

      // I highly doubt that this branch will ever be taken, since API Errors are usually constructed *after* a request is sent. Plus, most requests are GET, anyway!
      if (this.request.body && !this.request.bodyUsed) {
        const f = Writable.toWeb(
          createWriteStream(join(dir, "request_body.bin")),
        );

        await this.request.body.pipeTo(f);
      }
    } catch {
      // Do nothing.
    }

    return `${await super.prepareString()} (پوشه محتوای فایل‌های اشکال زدایی ${dir} )`;
  }
}

export class RateLimitError extends ApiError {
  name = "RateLimitError";

  constructor(request: Request, response: Response, options?: ErrorOptions) {
    // oxlint-disable-next-line unicorn/custom-error-definition
    super(request, response, options);
    this.message = "سقف درخواست برای امروز به اتمام رسیده است.";
  }
}
