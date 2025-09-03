export const renderContactsList = (contacts) => `<html>
    <head>
    <link
     rel="stylesheet"
     href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      />
    <title>Contacts</title>
     <style>
      .table-hover  {
      --bs-table-hover-bg: rgb(6, 35, 61);
      --bs-table-hover-color: white !important;
    }
      td.empty {
        background-color: #ffcccc; /* light red */
      }
      tr {
        cursor: pointer;
      }
    </style>
    </head>
    <body style="display: flex; flex-direction: column; justify-content: center; text-align: center;">
    <a href="/" style="align-self: flex-start; margin-left: 20px;">Back</a>
    <h1>Contacts</h1>
        <table class="table table-hover table-bordered table-striped">
         <thead class="table-dark">
        <tr>
        <th>Name</th>
         <th>phoneNumber</th>
         <th>Email</th>
         <th>Favourite</th>
         <th>ContactType</th>
         <th>created</th>
         <th>updated</th>
         <th>ID</th>
        </tr>
        </thead>
        <tbody>
      ${contacts
        .map(
          (contact) => `
        <tr onclick="location.href='/contacts/${contact._id}'">
        <td class="${!contact.name ? 'empty' : ''}">${
            contact.name || 'N/A'
          }</td>
        <td class="${!contact.phoneNumber ? 'empty' : ''}">${
            contact.phoneNumber || 'N/A'
          }</td>
        <td class="${!contact.email ? 'empty' : ''}">${
            contact.email || 'N/A'
          }</td>
        <td class="${contact.isFavourite === undefined ? 'empty' : ''}">${
            contact.isFavourite
          }</td>
        <td class="${!contact.contactType ? 'empty' : ''}">${
            contact.contactType || 'N/A'
          }</td>
        <td class="${!contact.createdAt ? 'empty' : ''}">${
            contact.createdAt.toLocaleDateString() || 'N/A'
          }</td>
        <td class="${!contact.updatedAt ? 'empty' : ''}">${
            contact.updatedAt.toLocaleDateString() || 'N/A'
          }</td>
          <td>
          <span title="Click to copy ${
            contact._id
          }" onclick ="event.stopPropagation(); navigator.clipboard.writeText('${contact._id}')">
          ${contact._id.toString().slice(0, 6)}...</span></td>
        </tr>
        `,
        )
        .join('')}
        </tbody>
        </table>
        </body>
    </html>`;