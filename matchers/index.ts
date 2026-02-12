import { expect as baseExpect } from "@playwright/test";
import { toBeNumber } from "./toBeNumber";

export const expect = baseExpect.extend({
  toBeNumber,
});
