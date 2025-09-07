import { contactsSchema } from './contacts.js';

const LABELS_MAP = {
  name: 'Name',
  contactType: 'Type',
  email: 'Email',
  phoneNumber: 'Phone Number',
};

export const contactFields = Object.entries(contactsSchema.obj).map(
  ([key, config]) => {
    let format;
    if (config.type === Boolean) {
      format = (val) => (val ? 'Yes' : 'No');
    }

    const fallbackFormat = (val) =>
      val === undefined || val === null || val === '' ? 'N/A' : val;
    const finalFormat = format || fallbackFormat;
    return {
      key,
      label: LABELS_MAP[key] || key,
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