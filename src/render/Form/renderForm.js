export const renderForm = (contact = {}, isEdit = false) => `
  <html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"/>
    <title>${isEdit ? 'Edit Contact' : 'Add Contact'}</title>
  </head>
 <body class="p-4">
   <a href="/contacts" class="btn btn-link mt-3">Back</a>
  <div class="container" style="max-width: 400px;">
    <h1>${isEdit ? 'Edit Contact' : 'Add Contact'}</h1>
<form method="POST" action="/contacts${
  isEdit ? `/${contact._id}?_method=PUT` : ''
}">
   <div class="mb-3 text-start">
    <label for="name" class="form-label" >Name:*</label>
          <input class="form-control" id="name"  type="text" name="name" required value="${
            contact.name || ''
          }" />
    </div>
    <div class="mb-3 text-start">
          <label for="phoneNumber" class="form-label">Phone number:*</label>
         <input class="form-control" id="phoneNumber" type="tel" name="phoneNumber" required value="${
           contact.phoneNumber || ''
         }" />
     </div>
    <div class="mb-3 text-start">
     <label for="email" class="form-label" >Email:</label>
          <input class="form-control" type="email" name="email" id="email"  value="${
            contact.email || ''
          }" />
    </div>
    <div class="mb-3 text-start">
          <label for='isFavourite' class="form-label">
            <input class="form-check-input" id='isFavourite' type="checkbox" name="isFavourite" ${
              contact.isFavourite ? 'checked' : ''
            } />
            Favourite
   </label>
   </div>
    <div class="mb-3 text-start">
   <label for="contactType" class="form-label">Сontact type:*
            <select name="contactType" id="contactType"  class="form-select" required>
              <option value="work" ${
                contact.contactType === 'work' ? 'selected' : ''
              }>Work</option>
              <option value="home" ${
                contact.contactType === 'home' ? 'selected' : ''
              }>Home</option>
              <option value="personal" ${
                !contact?.contactType || contact.contactType === 'personal'
                  ? 'selected'
                  : ''
              }>Personal</option>
            </select>
          </label>
    </div>
      <button type="submit" class="btn btn-primary">${
        isEdit ? 'Update Contact' : 'Create Contact'
      }</button>
  </form>
  </div>
  </body>
</html>
  `;