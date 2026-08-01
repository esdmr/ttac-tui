import * as v from "valibot";
import { ApiError, RateLimitError } from "../error.ts";
import { readonlyObject } from "../schema.ts";

/** @see {@link https://mobile.ttac.ir/static/js/model/DrugShortagePharmacyInventoryListSearchMode.js DrugShortagePharmacyInventoryListSearchMode} */
export const SEARCH_MODES = {
  ORDER_BY_DISTANCE: { value: 1, text: "جستجو بر اساس فاصله" },
  ORDER_BY_LAST_UPDATE_TIME: {
    value: 2,
    text: "جستجو بر اساس آخرین زمان فروش",
  },
  ORDER_BY_PARETO_FUNCTION: { value: 3, text: "جستجوی هوشمند" },
} as const;

/** Seriously? :p */
const FAKE_CLIENT_IP = "000.000.000.000";

export const TtacDrugPharmaciesOptions = readonlyObject({
  pageNumber: v.number(),
  pageSize: v.number(),
  longitude: v.number(),
  latitude: v.number(),
  drugIrc: v.string(),
  drugIndexId: v.number(),
  strict: v.boolean(),
  /** @see {@link SEARCH_MODES} */
  searchMode: v.number(),
});

export type TtacDrugPharmaciesOptions = v.InferOutput<
  typeof TtacDrugPharmaciesOptions
>;

export const TtacPharmacy = readonlyObject({
  id: v.number(),
  name: v.string(),
  ownerName: v.string(),
  technicalExpertName: v.optional(v.unknown()),
  telNumber: v.string(),
  longitude: v.number(),
  latitude: v.number(),
  hix: v.string(),
  universityName: v.string(),
  pharmacyService1: v.string(),
  pharmacyServiceType1: v.number(),
  pharmacyType: v.optional(v.unknown()),
  pharmacyTypeId: v.optional(v.unknown()),
  gln: v.string(),
  city: v.string(),
  county: v.string(),
  province: v.string(),
  address: v.string(),
});

export type TtacPharmacy = v.InferOutput<typeof TtacPharmacy>;

export const TtacDrug = readonlyObject({
  irc: v.string(),
  enBrandName: v.string(),
  faBrandName: v.string(),
  drugGenericName: v.optional(v.unknown()),
  indexFaName: v.optional(v.unknown()),
  indexEnName: v.optional(v.unknown()),
  genericCode: v.number(),
  drugIndexId: v.number(),
});

export type TtacDrug = v.InferOutput<typeof TtacDrug>;

export const TtacDrugPharmacy = v.intersect([
  TtacDrug,
  readonlyObject({
    secondsFromLastSellDate: v.number(),
    pharmacy: TtacPharmacy,
  }),
]);

export type TtacDrugPharmacy = v.InferOutput<typeof TtacDrugPharmacy>;

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

  const json = v.parse(
    v.object({
      results: v.array(TtacDrugPharmacy),
    }),
    await response.json(),
  );

  return json.results;
}
