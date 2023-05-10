import { validateForm } from "../client/components/AddSupplierForm";

test("empty strings are not allowed", () => {
  const errors = validateForm({
    name: "",
  });
  expect(errors.name).toBe("This is required");
});

test("isActive and address2 keys are skipped", () => {
  const errors = validateForm({
    isActive: "",
    address2: "",
  });
  expect(Object.keys(errors).length).toBe(0);
});
