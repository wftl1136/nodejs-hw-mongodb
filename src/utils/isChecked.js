export const isChecked = (field, value) => {
  if (!field) return false;
  const values = Array.isArray(field) ? field : [field];
  return values.includes(value);
};