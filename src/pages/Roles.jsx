import './Roles.css';

function Roles() {
  return (
    <div className="rbac-page rbac-roles">
      <header className="rbac-page__header">
        <h1 className="rbac-page__title">Roles</h1>
        <p className="rbac-page__subtitle">Define and manage roles; assign permissions to each role</p>
      </header>
      <div className="rbac-roles__toolbar">
        <button type="button" className="rbac-btn rbac-btn--primary">
          Add role
        </button>
      </div>
      <div className="rbac-roles__table-wrap">
        <table className="rbac-table">
          <thead>
            <tr>
              <th>Role name</th>
              <th>Description</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="rbac-table__empty">
                No roles yet. Add a role to get started.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Roles;
