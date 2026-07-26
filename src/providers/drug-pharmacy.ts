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

export interface TtacOptions {
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly longitude: number;
  readonly latitude: number;
  readonly drugIrc: string;
  readonly drugIndexId: number;
  readonly strict: boolean;
  /** @see {@link SEARCH_MODES} */
  readonly searchMode: number;
}

export interface TtacPharmacy {
  readonly id: number;
  readonly name: string;
  readonly ownerName: string;
  readonly technicalExpertName: null;
  readonly telNumber: string;
  readonly longitude: number;
  readonly latitude: number;
  readonly hix: string;
  readonly universityName: string;
  readonly pharmacyService1: string;
  readonly pharmacyServiceType1: number;
  readonly pharmacyType: null;
  readonly pharmacyTypeId: null;
  readonly gln: string;
  readonly city: string;
  readonly county: string;
  readonly province: string;
  readonly address: string;
}

export interface TtacDrug {
  readonly irc: string;
  readonly enBrandName: string;
  readonly faBrandName: string;
  readonly drugGenericName: null;
  readonly indexFaName: null;
  readonly indexEnName: null;
  readonly genericCode: number;
  readonly drugIndexId: number;
}

export interface TtacResult extends TtacDrug {
  readonly secondsFromLastSellDate: number;
  readonly pharmacy: TtacPharmacy;
}

export async function callTtac(options: TtacOptions) {
  const request = await fetch(
    "https://newapi.ttac.ir/irfdamobile/v1/getrecentlysolddrugpharmacy?" +
      new URLSearchParams({
        PageNumber: "" + options.pageNumber,
        PageSize: "" + options.pageSize,
        Longitude: "" + options.longitude,
        Latitude: "" + options.latitude,
        DrugIrc: "" + options.drugIrc,
        DrugIndexId: "" + options.drugIndexId,
        OnlyFilterByIrc: "" + options.strict,
        SearchMode: "" + options.searchMode,
        ClientIp: FAKE_CLIENT_IP,
      }),
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

  const json = await request.json();

  return json.results as TtacResult[];
}
