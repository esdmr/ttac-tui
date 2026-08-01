import * as v from "valibot";
import { readonlyArray, readonlyObject } from "../schema.ts";
import { TtacDrug } from "./drug-pharmacy.ts";

/** Seriously? :p */
const FAKE_CLIENT_IP = "000.000.000.000";

export const TtacDrugsOptions = readonlyObject({
  term: v.string(),
  pageNumber: v.number(),
  pageSize: v.number(),
});
export type TtacDrugsOptions = v.InferOutput<typeof TtacDrugsOptions>;

export const TtacDrugLicense = readonlyObject({
  id: v.number(),
  indexId: v.number(),
  indexEnName: v.string(),
  indexFaName: v.string(),
  licenseOwnerCompanyName: v.string(),
  licenseOwnerCompanyId: v.number(),
  drugGenericName: v.string(),
  drugGenericFaName: v.string(),
  drugGenericId: v.number(),
  drugFamilyFaTitle: v.optional(v.unknown()),
  drugFamilyEnTitle: v.optional(v.unknown()),
  enBrandName: v.string(),
  faBrandName: v.string(),
  brandOwnerCompanyName: v.string(),
  isBulk: v.boolean(),
  licenseCode: v.optional(v.unknown()),
  gtin: v.optional(v.unknown()),
  irc: v.string(),
  producerCompanyName: v.optional(v.unknown()),
  producerCompanyCountryName: v.optional(v.unknown()),
  drugLicenseItemPackageLayoutAttachmentIds: readonlyArray(v.string()),
  appearanceAttachmentsIds: v.optional(v.unknown()),
  unitOfUsePackaging: v.string(),
  isO2: v.optional(v.unknown()),
  countryFaName: v.optional(v.unknown()),
  persianExpirationDate: v.optional(v.unknown()),
  status: v.optional(v.unknown()),
  packageConsumerPrice: v.nullable(v.number()),
});
export type TtacDrugLicense = v.InferOutput<typeof TtacDrugLicense>;

export const TtacDrugExtra = v.intersect([TtacDrug, TtacDrugLicense]);
export type TtacDrugExtra = v.InferOutput<typeof TtacDrugExtra>;

const TtacDrugsResponse = readonlyObject({
  data: readonlyObject({
    drugLicenses: readonlyArray(TtacDrugLicense),
    suggestionDrugLicenses: readonlyArray(v.string()),
    count: v.number(),
  }),
  succeeded: v.boolean(),
  message: v.optional(v.unknown()),
  statusCode: v.number(),
  errors: v.optional(v.unknown()),
});
type TtacDrugsResponse = v.InferOutput<typeof TtacDrugsResponse>;

export async function fetchTtacDrug(options: TtacDrugsOptions) {
  const response = await fetch(
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

  if (response.status === 429) {
    throw new Error("سقف درخواست برای امروز به اتمام رسیده است");
  }

  const json = v.parse(TtacDrugsResponse, await response.json());

  return json.data.drugLicenses.map<TtacDrugExtra>((i) => ({
    ...i,
    drugIndexId: i.indexId,
    genericCode: i.drugGenericId,
  }));
}
