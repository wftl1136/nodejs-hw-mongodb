import { contactFields } from '../../db/models/contactFields.js';

export const renderContactsList = (contacts, msg) => `<html>
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
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body style="display: flex; flex-direction: column; justify-content: center; text-align: center;">
    <a href="/" style="align-self: flex-start; margin-left: 20px;">Back</a>
    <h1>Contacts</h1>
   <div style="display: flex; align-items: center; gap: 12px; margin: 20px 0;">
  <p style="margin: 0;">Total contacts: ${contacts.length}</p>
  <a href="/contacts/new" class="btn btn-success btn-sm">
    ➕ Add new
  </a>
</div>
        <table class="table table-hover table-bordered table-striped">
         <thead class="table-adark">
        <tr>
        <th>№</th>
        ${contactFields.map((field) => `<th>${field.label}</th>`).join('')}
        <th>ID</th>
        <th>Option</th>
        </tr>
        </thead>
        <tbody>
      ${contacts
        .map(
          (contact, index) => `
        <tr onclick="location.href='/contacts/${contact._id}'">
        <td>${index + 1}</td>
        ${contactFields
          .map((field) => {
            const cell = field.format(contact[field.key]);
            const emptyClass = cell === 'N/A' ? 'empty' : '';
            return `<td class='${emptyClass}'>${cell}</td>`;
          })
          .join('')}
          <td>
          <span title="Click to copy ${
            contact._id
          }" onclick ="event.stopPropagation(); navigator.clipboard.writeText('${
            contact._id
          }')">
          ${contact._id.toString().slice(0, 6)}...</span></td>
          <td>
          <a href="/contacts/${
            contact._id
          }/edit" class="btn btn-sm btn-warning" onclick="event.stopPropagation()" title="Edit" aria-label="Edit">✏️Edit</a>
         <form method="POST" action="/contacts/${
           contact._id
         }?_method=DELETE" style="display:inline;" onclick="event.stopPropagation()">
            <button type="submit" class="btn btn-sm btn-danger" title="Delete" aria-label="Delete">🗑️Delete</button>
          </form>
        </td>
        </tr>`,
        )
        .join('')}
        </tbody>
        </table>
${
  msg
    ? `
  <div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
    <div id="liveToast" class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          ${msg}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>
`
    : ''
}

        </body>
          <script>
  const params = new URLSearchParams(window.location.search);
  if (params.has('msg')) {
    const toastEl = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
    const url = new URL(window.location);
    url.searchParams.delete('msg');
    window.history.replaceState({}, '', url);
  }
</script>
    </html>`;