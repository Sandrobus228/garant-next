import { PAGES } from "@/config/pages-url.config";
import { MAX_INSURED_COUNT } from "@/constants/insured.constants";
import { durationOfStayListItems } from "@/components/entities/NsApplyStaticFields/fields.data";
import { osagoDurationOfStayOptions } from "@/helpers/OsagoApply/durationOfStay.data";

export type TSearchParams = { [key: string]: string | string[] | undefined };

export interface IOsagoApplyPrefill {
  transport_category: string;
  duration_of_stay: string;
}

export interface INsApplyPrefill {
  duration_of_stay: string;
  quantity: number;
}

const CATEGORY_PARAM = "category";
const DURATION_PARAM = "duration";
const PEOPLE_PARAM = "people";

function getParam(params: TSearchParams, name: string): string {
  const value = params[name];
  return typeof value === "string" ? value : "";
}

export function buildOsagoApplyHref(
  transportCategory?: string,
  durationOfStay?: string
): string {
  const query = new URLSearchParams();

  if (transportCategory) query.set(CATEGORY_PARAM, transportCategory);
  if (durationOfStay) query.set(DURATION_PARAM, durationOfStay);

  const queryString = query.toString();

  return queryString ? `${PAGES.OSAGO_APPLY}?${queryString}` : PAGES.OSAGO_APPLY;
}

export function buildNsApplyHref(
  durationOfStay?: string,
  quantity?: number
): string {
  const query = new URLSearchParams();

  if (durationOfStay) query.set(DURATION_PARAM, durationOfStay);
  if (quantity && quantity > 1) query.set(PEOPLE_PARAM, quantity.toString());

  const queryString = query.toString();

  return queryString ? `${PAGES.NS_APPLY}?${queryString}` : PAGES.NS_APPLY;
}

/**
 * Категорию ТС здесь не проверяем: список приходит с бэкенда,
 * значение сверяется с загруженными опциями уже в самой форме.
 */
export function parseOsagoApplyPrefill(
  params: TSearchParams
): IOsagoApplyPrefill {
  const duration = getParam(params, DURATION_PARAM);

  return {
    transport_category: getParam(params, CATEGORY_PARAM),
    duration_of_stay: osagoDurationOfStayOptions.some(
      (option) => option.value === duration
    )
      ? duration
      : "",
  };
}

export function parseNsApplyPrefill(params: TSearchParams): INsApplyPrefill {
  const duration = getParam(params, DURATION_PARAM);
  const quantity = Number(getParam(params, PEOPLE_PARAM));

  return {
    duration_of_stay: durationOfStayListItems.some(
      (option) => option.value === duration
    )
      ? duration
      : "",
    quantity:
      Number.isInteger(quantity) &&
      quantity >= 1 &&
      quantity <= MAX_INSURED_COUNT
        ? quantity
        : 1,
  };
}
