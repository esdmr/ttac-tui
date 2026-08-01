import { spinner } from "@clack/prompts";

export async function spin<T = void>(
  msg: string | undefined,
  fn: () => Promise<T>,
  signal?: AbortSignal,
) {
  const s = spinner();
  s.start(msg);

  try {
    const value = await fn();

    s.stop();

    return value;
  } catch (error) {
    if (signal?.aborted === true) {
      s.cancel();
    } else {
      s.error(String(error));
    }

    throw error;
  }
}
