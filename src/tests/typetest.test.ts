test("if 3 is equal to 3", () => {
  expect(5).not.toBe("5");
});

// eslint-disable-next-line jest/no-identical-title
test("if 3 is equal to 3", () => {
  expect(0).toBeFalsy();
});
// eslint-disable-next-line jest/no-identical-title
test("if 3 is equal to 3", () => {
  expect(5).toBeLessThan(6);
});

// eslint-disable-next-line jest/no-identical-title
test("if 3 is equal to 3", () => {
  expect(5).toBeGreaterThanOrEqual(5);
});

// eslint-disable-next-line jest/no-identical-title
test("if 3 is equal to 3", () => {
  // strict checking
  expect(["cat", 5]).toContain("cat");
});

// eslint-disable-next-line jest/no-identical-title
test("if 3 is equal to 3", () => {
  expect(4).not.toBe(3);
});
