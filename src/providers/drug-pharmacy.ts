import * as v from "valibot";
import { ApiError, RateLimitError } from "../error.ts";
import type { TtacDrugPharmaciesOptions } from "../types/drug-pharmacy-option.ts";
import { TtacDrugPharmaciesResponse } from "../types/drug-pharmacy-response.ts";

/** Seriously? :p */
const FAKE_CLIENT_IP = "000.000.000.000";

export async function fetchTtacDrugPharmacies(
  options: TtacDrugPharmaciesOptions,
) {
  const request = new Request(
    `https://newapi.ttac.ir/irfdamobile/v1/getrecentlysolddrugpharmacy?${new URLSearchParams(
      {
        PageNumber: `${options.pageNumber}`,
        PageSize: `${options.pageSize}`,
        Longitude: `${options.longitude}`,
        Latitude: `${options.latitude}`,
        DrugIrc: options.drugIrc,
        DrugIndexId: `${options.drugIndexId}`,
        OnlyFilterByIrc: `${options.strict}`,
        SearchMode: `${options.searchMode}`,
        ClientIp: FAKE_CLIENT_IP,
      },
    ).toString()}`,
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
        "x-ssp-api-key": "4098becb-b29f-48e2-8611-206e75d1a7fa",
      },
      keepalive: true,
    },
  );

  const response = await fetch(request);

  if (response.status === 429) {
    throw new RateLimitError(request, response);
  }

  if (!response.ok) {
    throw new ApiError(request, response);
  }

  const json = v.parse(TtacDrugPharmaciesResponse, await response.json());

  return json.results;
}
