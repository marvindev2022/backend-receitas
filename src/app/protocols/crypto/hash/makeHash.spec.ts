import { makeHash } from "./makeHash";

describe("Make Hash", () => {
  it("should encrypt an received param", () => {
    const request = "hello world";
    const response = makeHash(request);

    expect(response === request).toBeFalsy();
  });
});
