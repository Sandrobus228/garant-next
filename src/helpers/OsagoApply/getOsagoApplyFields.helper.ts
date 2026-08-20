import { IFieldConfig } from "@/types/IFieldConfig";
import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";
import { generateYearOptions } from "../generateYearOptions";
import { carsService } from "@/services/cars.service";
import { useGetCarCategories } from "@/hooks/cars/useGetCarCategories";
import { IOptions } from "@/components/ui/CustomSelect/CustomSelect";
import useCarBrandsList from "@/stores/Cars/carBrandsList";
import { ICarBrand } from "@/types/cars.types";
import { osagoDurationOfStayOptions } from "./durationOfStay.data";
import {
  getCarBrandsFromSessionStorage,
  saveCarBrandsToSessionStorage,
} from "./saveCarBrandsToSessionStorage";

export interface ISplitFieldConfig {
  [key: string]: IFieldConfig<IOsagoApplyForm>[];
}

export default async function getOsagoApplyFields(): Promise<ISplitFieldConfig> {
  const storedCarsBrands = getCarBrandsFromSessionStorage();

  const carCategories = await carsService.getCarCategories();
  // const fetchedCarBrands = await carsService.getCarBrands();
  // const popularBrands = await carsService.getPopularCarBrands();

  const carBrands =
    (await storedCarsBrands) && storedCarsBrands.length > 0
      ? storedCarsBrands
      : (await carsService.getCarBrandsV2()).data;

  if (!storedCarsBrands || storedCarsBrands.length === 0) {
    console.log("Запись в store");
    saveCarBrandsToSessionStorage(carBrands);
  }

  let formatedPopularBrands: IOptions[] = await carBrands.map((item) => {
    return {
      label: item.name,
      value: item.name,
    };
  });

  const formatedCarCategories = await carCategories.data.data.map(
    (category) => {
      return {
        label: category.Category,
        value: category.Category,
      };
    }
  );

  let formatedCarBrands: { label: string; value: string }[] = [];

  formatedCarBrands.push({
    label: "Другое ТС",
    value: "another_vehicle",
  });

  const fetchedAndFormatedCarBrands: { label: string; value: string }[] =
    await carBrands.map((brand) => {
      return {
        label: brand.name,
        value: brand.name,
      };
    });

  formatedCarBrands = [...formatedCarBrands, ...fetchedAndFormatedCarBrands];

  formatedCarBrands = formatedCarBrands;

  const transportCategoryField: IFieldConfig<IOsagoApplyForm> = {
    type: "select",
    name: "transport_category",
    label: "Категория ТС",
    isSearchable: false,
    placeholder: "Категория ТС",
    required: true,
    options: formatedCarCategories,
  };

  // поля самого ТС без категории: на оформлении она уходит в блок тарифа,
  // а на страницах «Мои авто» остаётся в общем списке (config.vehicle)
  const vehicleDetailsFields: IFieldConfig<IOsagoApplyForm>[] = [
    {
      type: "select",
      name: "brand",
      label: "Марка",
      placeholder: "Начните вводить марку",
      required: true,
      tooltip: true,
      tooltipText:
        "Если вашего ТС нет в списке, в поле «Марка» выберите «Другое ТС»",
      options: formatedCarBrands,
      popularBrands: formatedPopularBrands,
    },
    {
      type: "input",
      name: "vehicle_refined_make",
      label: "Уточните марку",
      placeholder: "Введите марку",
      required: false,
    },
    {
      type: "select",
      name: "model",
      label: "Модель",
      placeholder: "Модель",
      tooltip: true,
      tooltipText:
        "Если вашего ТС нет в списке, в поле «Марка» выберите «Другое ТС»",
      required: true,
      options: [
        {
          label: "Сначала выберите марку",
          value: "thumbnail",
        },
      ],
    },
    {
      type: "select",
      name: "year",
      label: "Год выпуска ТС",
      placeholder: "Год выпуска ТС",
      required: true,
      options: generateYearOptions(1980),
      isSearchable: true,
    },
    {
      type: "input",
      name: "vin",
      label: "VIN",
      placeholder: "VIN",
      required: true,
    },
    {
      type: "input",
      name: "registration_plate",
      label: "Регистрационный знак",
      placeholder: "А123АА | 999",
      required: true,
      inputType: "registration_plate",
    },
    {
      type: "input",
      name: "registration_number",
      label: "Серия и номер регистрации ТС",
      placeholder: "Серия и номер регистрации ТС",
      required: true,
    },
  ];

  const fields: ISplitFieldConfig = {
    tariff: [
      {
        ...transportCategoryField,
        // копия списка: DynamicFormSection правит опции на месте
        options: formatedCarCategories.map((option) => ({ ...option })),
      },
      {
        type: "select",
        name: "duration_of_stay",
        label: "Длительность пребывания",
        placeholder: "Длительность пребывания",
        isSearchable: false,
        required: true,
        options: osagoDurationOfStayOptions.map((option) => ({ ...option })),
      },
      {
        type: "input",
        name: "date_of_start",
        label: "Дата начала",
        placeholder: "Выберите дату",
        inputType: "date",
        required: true,
        startDate: new Date(),
        limitYears: true,
      },
    ],
    vehicleDetails: vehicleDetailsFields,
    vehicle: [transportCategoryField, ...vehicleDetailsFields],
    owner: [
      {
        type: "radio",
        buttonGroupType: "small",
        name: "owner",
        label: "owner",
        buttons: ["Физ. лицо", "Юр. лицо"],
      },
      {
        type: "input",
        name: "fio",
        label: "ФИО",
        placeholder: "ФИО Собственника",
        required: true,
      },
      {
        type: "input",
        name: "passport_number",
        label: "Серия и номер паспорта",
        placeholder: "Введите серию и номер",
        required: true,
      },
    ],
    insurant: [
      {
        type: "radio",
        buttonGroupType: "small",
        name: "insurant_type",
        label: "insurant_type",
        buttons: ["Физ. лицо", "Юр. лицо"],
      },
      {
        type: "input",
        name: "insurant_fio",
        label: "ФИО",
        placeholder: "ФИО Страхователя",
        required: true,
      },
      {
        type: "input",
        name: "insurant_passport_number",
        label: "Серия и номер паспорта",
        placeholder: "Введите серию и номер",
        required: true,
      },
    ],
    promocode: [
      {
        type: "input",
        name: "promocode",
        label: "Промокод",
        placeholder: "Введите промокод",
        inputType: "promocode",
        required: false,
      },
    ],
  };
  return fields;
}
