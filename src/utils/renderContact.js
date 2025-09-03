export const renderContact = (contact) =>
  `<html>
<head>
<title>${contact.name}</title>
</head>
<body style="display: flex; flex-direction: column;  align-items: center; text-align: center; padding: 12px;">
<a href="/contacts" style="align-self: flex-start; margin-left: 20px;">Back</a>
<h2>Contact card</h2>
<div>
<p>Name: ${contact.name || "N/A"}</p>
<p>Phone number: ${contact.phoneNumber || "N/A"}</p>
<p>Email: ${contact.email || "N/A"}</p>
<p>Favourite: ${contact.isFavourite}</p>
<p>Contact type: ${contact.contactType || "N/A"}</p>
<p>Created: ${contact.createdAt.toLocaleDateString() || "N/A"}</p>
<p>Updated: ${contact.updatedAt.toLocaleDateString() || "N/A"}</p>
<details>
<summary title='Show contacts id & autocopy' onclick=navigator.clipboard.writeText('${contact._id}') >ℹ️</summary>
<p>Contact id: ${contact._id}</p>
</details>
</div>
</body>
</html>`;