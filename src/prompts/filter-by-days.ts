import { isCancel, text } from "@clack/prompts";

export async function promptToFilterByDays(
  oldFilter: number | undefined,
): Promise<number | undefined> {
  const days = await text({
    message: "حداکثر چند روز",
    validate(value) {
      if (!value) return;
      const parsed = Number.parseInt(value, 10);
      if (!Number.isFinite(parsed)) return "لطفا یک عدد صحیح وارد کنید";
      if (parsed < 1) return "لطفا یک عدد صحیح وارد کنید";
    },
  });

  if (isCancel(days)) return oldFilter;
  return days ? +days : undefined;
}
