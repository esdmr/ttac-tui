import { isCancel, text } from "@clack/prompts";

export async function promptToFilterByDays(
  oldFilter: number | undefined,
): Promise<number | undefined> {
  const days = await text({
    message: "حداکثر چند روز",
    validate(value) {
      // oxlint-disable-next-line typescript/strict-boolean-expressions
      if (!value) return undefined;
      const parsed = Number.parseInt(value, 10);
      if (!Number.isFinite(parsed)) return "لطفا یک عدد صحیح وارد کنید";
      if (parsed < 1) return "لطفا یک عدد صحیح وارد کنید";
      return undefined;
    },
  });

  if (isCancel(days)) return oldFilter;
  return days ? +days : undefined;
}
