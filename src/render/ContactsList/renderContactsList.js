import { contactFields } from '../../db/models/contactFields.js';
import { isChecked } from '../../utils/isChecked.js';
import { renderPaginationControls } from '../renderPaginationControls.js';

export const renderContactsList = (
  contacts,
  msg,
  {
    page,
    totalPages,
    totalItems,
    hasNextPage,
    hasPreviousPage,
    perPage,
    query,
  },
) => `<!DOCTYPE html>
<html>
  <head>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    />
    <title>Contacts</title>
    <style>
      .table-hover {
        --bs-table-hover-bg: rgb(6, 35, 61);
        --bs-table-hover-color: white !important;
      }
      th {
        align-content: center;
        text-align: center;
      }
      td {
        align-content: center;
        text-align: center;
      }

      .table-centered th,
      .table-centered td {
        vertical-align: middle;
        text-align: center;
      }

      td.empty {
        background-color: #ffcccc;
        align-content: center;
        text-align: center;
      }
      tr {
        cursor: pointer;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  </head>
  <body
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    "
  >
    <a href="/" style="align-self: flex-start; margin-left: 20px">Back</a>
    <h1>Contacts</h1>
    <div style="display: flex; align-items: center; gap: 12px; margin: 20px 0">
      <p style="margin: 0">Total contacts: ${contacts.length}</p>
      <a href="/contacts/new" class="btn btn-success btn-sm"> ➕ Add new </a>
    </div>
    <table
      class="table table-hover table-bordered table-striped table-centered"
    >
      <thead class="table-dark">
        <tr>
          <form method="GET" action="/contacts" id="filterForm">
            <th>Filter</th>
            <th>
              <input
                type="text"
                placeholder="Filter by name"
                name="name"
                aria-label="filter the name"
                title="filter the name"
                value="${query.name || ''}"
                class="form-control form-control-sm"
              />
              <input
                type="hidden"
                name="perPage"
                value="${query.perPage || 10}"
              />
            </th>
            <th>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Filter by phone number"
                aria-label="filter the phone Number"
                title="filter the phone Number"
                value="${query.phoneNumber || ''}"
                class="form-control form-control-sm"
              />
            </th>
            <th>
              <span
                style="display: flex; gap: 10px"
                title="To search for empty fields, enter 'empty' or 'n/a'; to search for filled fields, enter '*'"
                ><input
                  type="text"
                  name="email"
                  placeholder="Filter by email"
                  aria-label="filter the email"
                  title="filter the email"
                  value="${query.email || ''}"
                  class="form-control form-control-sm"
                />
                i</span
              >
            </th>
            <th>
              <select
                name="isFavourite"
                class="form-select form-select-sm"
                style="margin-bottom: 6px"
              >
                <option value="">All</option>
                <option value="true" ${
                  query.isFavourite === 'true' ? 'selected' : ''
                }>True</option>
                <option value="false" ${
                  query.isFavourite === 'false' ? 'selected' : ''
                }>False</option>
              </select>
            </th>
            <th style="text-align: start">
              <div style="display: flex; flex-direction: column">
                <label>
                  <input type="checkbox" name="type" value="work" ${
                    isChecked(query.type, 'work') ? 'checked' : ''
                  }/> Work
                </label>
                <label>
                  <input type="checkbox" name="type" value="home" ${
                    isChecked(query.type, 'home') ? 'checked' : ''
                  }/> Home
                </label>
                <label>
                  <input type="checkbox" name="type" value="personal" ${
                    isChecked(query.type, 'personal') ? 'checked' : ''
                  } />
                  Personal
                </label>
              </div>
            </th>
            <th>
              <label style="margin-bottom: 8px"
                >From:
                <input
                  type="date"
                  style="width: 80px"
                  aria-label="input data from"
                  name="createdFrom"
                  value="${query.createdFrom || ''}"
              /></label>
              <label>
                To:<input
                  type="date"
                  style="width: 80px; margin-left: 16px"
                  aria-label="input data To"
                  name="createdTo"
                  value="${query.createdTo || ''}"
              /></label>
            </th>
            <th>
              <label style="margin-bottom: 8px"
                >From:
                <input
                  type="date"
                  style="width: 80px"
                  aria-label="input data from"
                  name="updatedFrom"
                  value="${query.updatedFrom || ''}"
              /></label>
              <label
                >To:
                <input
                  type="date"
                  style="width: 80px; margin-left: 16px"
                  aria-label="input data To"
                  name="updatedTo"
                  value="${query.updatedTo || ''}"
              /></label>
            </th>
            <th>
              <label>
                <input
                  type="text"
                  name="contactId"
                  aria-label="id"
                  title="filter by id"
                  placeholder="Filter by id"
                  value="${query.contactId || ''}"
                  class="form-control form-control-sm"
                />
              </label>
            </th>
            <th>
              <button
                type="submit"
                name="action"
                value="apply"
                class="btn btn-sm btn-info"
                style="white-space: nowrap; margin: 4px"
              >
                🔁 Apply
              </button>
              <button
                type="submit"
                name="action"
                value="reset"
                class="btn btn-sm btn-info"
                style="white-space: nowrap; margin: 4px"
              >
                🔁 Reset
              </button>
            </th>
          </form>
        </tr>
        <tr>
          <th>№</th>
          ${contactFields
            .map(
              (field) => `
          <th>
            <div style="display: flex; gap: 8px; justify-content: space-evenly">
              <span>${field.label}</span>
              <form method="GET" action="/contacts">
                <input type="hidden" name="sortBy" value="${field.key}" />
                <input type="hidden" name="perPage" value="${
                  query.perPage || 10
                }" />
                <button
                  type="submit"
                  name="sortContacts"
                  aria-label="sort by"
                  title="sort by ${
                    query.sortContacts === 'asc' ? 'asc' : 'desc'
                  }"
                  value="${query.sortContacts === 'asc' ? 'desc' : 'asc'}"
                  class="btn btn-sm btn-outline-secondary"
                >
                  ${query.sortContacts === 'asc' ? '⬆️' : '⬇️'}
                </button>
              </form>
            </div>
          </th>
          `,
            )
            .join('')}
          <th>
            <div style="display: flex; gap: 8px; justify-content: space-evenly">
              <span>ID</span>
              <form method="GET" action="/contacts">
                <input type="hidden" name="sortBy" value="contact._id" />
                <button
                  type="submit"
                  name="sortContacts"
                  aria-label="sort by"
                  title="sort by ${
                    query.sortContacts === 'asc' ? 'asc' : 'desc'
                  }"
                  value="${query.sortContacts === 'asc' ? 'desc' : 'asc'}"
                  class="btn btn-sm btn-outline-secondary"
                >
                  ${query.sortContacts === 'asc' ? '⬆️' : '⬇️'}
                </button>
              </form>
            </div>
          </th>
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
              return `
          <td class="${emptyClass}">${cell}</td>
          `;
            })
            .join('')}
          <td>
            <span
              title="Click to copy ${contact._id}"
              onclick="event.stopPropagation(); navigator.clipboard.writeText('${
                contact._id
              }')"
              >${contact._id.toString().slice(0, 6)}...</span
            >
          </td>
          <td>
            <a
              href="/contacts/${contact._id}/edit"
              class="btn btn-sm btn-warning"
              onclick="event.stopPropagation()"
              title="Edit"
              aria-label="Edit"
              style="margin: 4px"
              >✏️Edit</a
            >
            <form
              method="POST"
              action="/contacts/${contact._id}?_method=DELETE"
              style="display: inline"
              onclick="event.stopPropagation()"
            >
              <button
                type="submit"
                class="btn btn-sm btn-danger"
                title="Delete"
                aria-label="Delete"
                style="white-space: nowrap; margin: 4px"
              >
                🗑️Delete
              </button>
            </form>
          </td>
        </tr>
        `,
          )
          .join('')}
      </tbody>
    </table>
    <div style="display: flex; justify-content: space-between">
      <form
        method="GET"
        action="/contacts"
        style="
          display: flex;
          gap: 12px;
          justify-content: center;
          align-items: center;
        "
      >
        <label
          style="display: flex; flex-direction: column; align-items: center"
        >
          Number per page
          <input
            type="number"
            name="perPage"
            min="1"
            value="${query.perPage || 10}"
            class="form-control form-control-sm"
            style="width: 80px"
          />
        </label>
        <button
          type="submit"
          class="btn btn-sm btn-info"
          style="align-self: end"
        >
          🔁 Apply
        </button>
      </form>
      ${renderPaginationControls({ page, totalPages, query })}
      <form
        method="GET"
        action="/contacts"
        style="
          display: flex;
          gap: 12px;
          justify-content: center;
          align-items: center;
        "
      >
        <label
          style="display: flex; flex-direction: column; align-items: center"
        >
          Go to page
          <input
            type="number"
            name="page"
            min="1"
            value="${query.page || 1}"
            class="form-control form-control-sm"
            style="width: 80px"
          />
        </label>
        <button
          type="submit"
          class="btn btn-sm btn-info"
          style="align-self: end"
        >
          🔁 Go
        </button>
      </form>
    </div>

    ${
      msg
        ? `
    <div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
      <div
        id="liveToast"
        class="toast align-items-center text-bg-success border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body">${msg}</div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
    `
        : ''
    }
  </body>
  <script>
    const form = document.getElementById('filterForm');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const action = e.submitter?.value || 'apply';

       if (action === 'reset') {
    const currentParams = new URLSearchParams(window.location.search);
    const savedPerPage = currentParams.get('perPage');
    const savedSortBy = currentParams.get('sortBy');
    const savedSortContacts = currentParams.get('sortContacts');

    const params = new URLSearchParams();
    if (savedPerPage) {
        params.set('perPage', savedPerPage);
      }
    if (savedSortBy) {
        params.set('sortBy', savedSortBy);
      }
      if (savedSortContacts) {
        params.set('sortContacts', savedSortContacts);
      }    

      window.location.href = '/contacts' + (params.toString() ? '?' + params.toString() : '');
      return;
    }

      const formData = new FormData(form);
      const params = new URLSearchParams();

      for (const [key, value] of formData.entries()) {
        if (value.trim() !== '') {
          params.append(key, value.trim());
        }
      }
      params.append('action', 'apply');

      const newUrl = '/contacts?' + params.toString();

      window.location.href = newUrl;
    });
  </script>
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
</html>
`;