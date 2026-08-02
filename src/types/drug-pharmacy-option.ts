import * as v from "valibot";
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

export const TtacDrugPharmaciesOptions = readonlyObject({
  drugIndexId: v.number(),
  drugIrc: v.string(),
  latitude: v.number(),
  longitude: v.number(),
  pageNumber: v.number(),
  pageSize: v.number(),
  /** @see {@link SEARCH_MODES} */
  searchMode: v.number(),
  strict: v.boolean(),
});

export type TtacDrugPharmaciesOptions = v.InferOutput<
  typeof TtacDrugPharmaciesOptions
>;
