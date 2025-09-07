export const renderContact = (contact) =>
  `<html>
<head>
 <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<title>${contact.name}</title>
</head>
<body style="display: flex; flex-direction: column;  align-items: center; text-align: center; padding: 12px;">
<a href="/contacts" style="align-self: flex-start; margin-left: 20px;">Back</a>
<h2>Contact card</h2>
<div>
<p>Name: ${contact.name || 'N/A'}</p>
<p>Phone number: ${contact.phoneNumber || 'N/A'}</p>
<p>Email: ${contact.email || 'N/A'}</p>
<p>Favourite: ${contact.isFavourite}</p>
<p>Contact type: ${contact.contactType || 'N/A'}</p>
<p>Created: ${contact.createdAt.toLocaleDateString() || 'N/A'}</p>
<p>Updated: ${contact.updatedAt.toLocaleDateString() || 'N/A'}</p>
<details>
<summary title='Show contacts id & autocopy' onclick=navigator.clipboard.writeText('${
    contact._id
  }') >ℹ️</summary>
<p>Contact id: ${contact._id}</p>
</details>
<div class="d-flex gap-3 justify-content-center pt-3">
  <a href="/contacts/${
    contact._id
  }/edit" class="btn btn-sm btn-warning py-2 px-3" title="Edit" aria-label="Edit">✏️Edit</a>
  <form method="POST" action = "/contacts/${
    contact.id
  }?_method=DELETE" class="m-0 py-0">
  <button type="submit" class="btn btn-sm btn-danger py-2" title="Delete" aria-label="Delete">🗑️Delete</button>
  </form>
</div>
</div>
</body>
</html>`;