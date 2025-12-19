import { expect } from "@playwright/test";

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toBeNumber(): R;
    }
  }
}

expect.extend({
  toBeNumber(received: number) {
    const check = typeof received === "number";
    if (check) {
      return { message: () => "passed", pass: true };
    } else {
      return {
        message: () =>
          `toBeNumber() failed. Expected '${received}' to be a number but it was a '${typeof received}'`,
        pass: false,
      };
    }
  },
});
