// composables/useGeneralSettings.ts
import { generalSettingDataResponseSchema } from "~/schemas";
import type { GeneralSettingResponse } from "~/types";

export const useGeneralSettings = async () => {
  const config = useRuntimeConfig();

  const {
    data: generalSetting,
    pending,
    error,
    refresh,
  } = await useFetch<GeneralSettingResponse | null>(
    `${config.public.apiBase}/api/general-settings/public`,
    {
      transform: (data) => {
        const response = generalSettingDataResponseSchema.safeParse(data);

        if (!response.success) {
          console.error(
            "Error de validación Zod en GeneralSettings:",
            response.error.format(),
          );
          return null;
        }

        return response.data.generalSetting;
      },
    },
  );

  const titleSection = computed(() => {
    return (section: string) => {
      return generalSetting.value?.textHeaderSections?.find(
        (item) => item.section === section,
      )?.title;
    };
  });

  const descriptionSection = computed(() => {
    return (section: string) => {
      return generalSetting.value?.textHeaderSections?.find(
        (item) => item.section === section,
      )?.description;
    };
  });
    
const getSocialUrl = computed(() => {
  return (keyName: string) => {
    const item = generalSetting.value?.socialLinks?.find(
      (item) => item?.key === keyName,
    );
    return item?.url;
  };
});

  return {
    generalSetting,
    pending,
    error,
    refresh,
    titleSection,
      descriptionSection,
    getSocialUrl
  };
};
