import { z } from "zod";
import type {
  generalSettingResponseSchema,
  generalSettingSchema,
} from "~/schemas";
import { generalSettingDataResponseSchema } from "../schemas/general-setting.schema";

export type GeneralSetting = z.infer<typeof generalSettingSchema>;

export type GeneralSettingResponse = z.infer<
  typeof generalSettingResponseSchema
>;

export type GeneralSettingDataResponse = z.infer<
  typeof generalSettingDataResponseSchema
>;
