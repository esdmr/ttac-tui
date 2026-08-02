import * as v from "valibot";
import { ApiError, RateLimitError } from "../error.ts";
import { dontCare, readonlyArray, readonlyObject } from "../schema.ts";
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
  drugGenericCode: dontCare(v.number()),
  drugFamilyFaTitle: dontCare(),
  drugFamilyEnTitle: dontCare(),
  enBrandName: v.string(),
  faBrandName: v.string(),
  brandOwnerCompanyName: v.string(),
  isBulk: v.boolean(),
  licenseCode: dontCare(),
  gtin: dontCare(),
  irc: v.string(),
  producerCompanyName: dontCare(),
  producerCompanyCountryName: dontCare(),
  drugLicenseItemPackageLayoutAttachmentIds: readonlyArray(v.string()),
  appearanceAttachmentsIds: dontCare(),
  unitOfUsePackaging: v.string(),
  isO2: dontCare(),
  countryFaName: dontCare(),
  persianExpirationDate: dontCare(),
  status: dontCare(),
  packageConsumerPrice: v.nullable(v.number()),
  nameDescription: dontCare(),
  producerCountryISO2: dontCare(v.string()),
  producerCountryEnName: dontCare(v.string()),
  producerCountryFaName: dontCare(v.string()),
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
  message: dontCare(),
  statusCode: v.number(),
  errors: dontCare(),
});
type TtacDrugsResponse = v.InferOutput<typeof TtacDrugsResponse>;

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
