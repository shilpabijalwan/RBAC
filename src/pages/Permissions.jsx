import './Permissions.css';

function Permissions() {
  return (
    <div className="rbac-page rbac-permissions">
      <header className="rbac-page__header">
        <h1 className="rbac-page__title">Permissions</h1>
        <p className="rbac-page__subtitle">Manage permissions (e.g. create_user, edit_post); assign them to roles</p>
      </header>
      <div className="rbac-permissions__toolbar">
        <button type="button" className="rbac-btn rbac-btn--primary">
          Add permission
        </button>
      </div>
      <div className="rbac-permissions__table-wrap">
        <table className="rbac-table">
          <thead>
            <tr>
              <th>Permission</th>
              <th>Resource</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="rbac-table__empty">
                No permissions yet. Add a permission to get started.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Permissions;
