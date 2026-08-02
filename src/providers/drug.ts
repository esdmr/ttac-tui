import * as v from "valibot";
import { ApiError, RateLimitError } from "../error.ts";
import type { TtacDrugExtra } from "../types/drug-extra.ts";
import type { TtacDrugsOptions } from "../types/drug-option.ts";
import { TtacDrugsResponse } from "../types/drug-response.ts";

/** Seriously? :p */
export const FAKE_CLIENT_IP = "000.000.000.000";

export async function fetchTtacDrug(options: TtacDrugsOptions) {
  const request = new Request(
    `https://newapi.ttac.ir/irfdamobile/v1/getnfisearch?${new URLSearchParams({
      Term: options.term,
      PageNumber: `${options.pageNumber}`,
      PageSize: `${options.pageSize}`,
      IP: FAKE_CLIENT_IP,
    }).toString()}`,
    {
      headers: {
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        Origin: "https://mobile.ttac.ir",
        Referer: "https://mobile.ttac.ir/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "x-ssp-api-key": "dbd69ca2-7096-4e19-ad26-74a3a33f3516",
      },
      keepalive: true,
      cache: "no-cache",
    },
  );

  const response = await fetch(request);

  if (response.status === 429) {
    throw new RateLimitError(request, response);
  }

  if (!response.ok) {
    throw new ApiError(request, response);
  }

  const json = v.parse(TtacDrugsResponse, await response.json());

  return json.data.drugLicenses.map<TtacDrugExtra>((i) => ({
    ...i,
    drugIndexId: i.indexId,
    genericCode: i.drugGenericId,
  }));
}
