import { contactsSchema } from './contacts.js';

export const contactFields = Object.entries(contactsSchema.obj).map(
  ([key, config]) => {
    let format;
    if (config.type === Boolean) {
      format = (val) => (val ? 'Yes' : 'No');
    }
    const label = config.required ? `${key}*` : key;
    const fallbackFormat = (val) =>
      val === undefined || val === null || val === '' ? 'N/A' : val;
    const finalFormat = format || fallbackFormat;
    return {
      key,
      label,
      format: finalFormat,
    };
  },
);
contactFields.push(
  {
    key: 'createdAt',
    label: 'Created',
    format: (val) => val?.toLocaleDateString(),
  },
  {
    key: 'updatedAt',
    label: 'Update',
    format: (val) => val?.toLocaleDateString(),
  },
);