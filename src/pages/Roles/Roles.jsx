import { useMemo, useState } from "react";
import AddRoleSideSheet from "../../components/AddRoleSideSheet";
import RbacTable from "../../components/RbacTable";
import { useCreateRoleMutation } from "../../store/services/api";
import "./Roles.css";

function Roles() {
  const [addRoleSheetOpen, setAddRoleSheetOpen] = useState(false);
  const [createRole] = useCreateRoleMutation();

  const handleAddRoleSubmit = async (payload) => {
    try {
      await createRole(payload).unwrap();
    } catch (error) {
      console.log("create role error", error);
    }
  };

  const roleColumns = useMemo(
    () => [
      { id: "name", header: "Role name", accessor: "name" },
      { id: "description", header: "Description", accessor: "description" },
      {
        id: "permissions",
        header: "Permissions",
        render: (row) => (
          <div className="rbac-table__role-pills">
            {(row.permissions ?? []).map((permission) => (
              <span key={permission} className="rbac-table__role-pill">
                {permission}
              </span>
            ))}
          </div>
        ),
      },
      { id: "actions", header: "Actions", render: () => "—" },
    ],
    [],
  );

  return (
    <div className="rbac-page rbac-roles">
      <header className="rbac-page__header">
        <h1 className="rbac-page__title">Roles</h1>
        <p className="rbac-page__subtitle">Define and manage roles; assign permissions to each role</p>
      </header>
      <div className="rbac-roles__toolbar">
        <button
          type="button"
          className="rbac-btn rbac-btn--primary"
          onClick={() => setAddRoleSheetOpen(true)}
        >
          Add role
        </button>
      </div>
      <RbacTable
        columns={roleColumns}
        data={[]}
        emptyMessage="No roles yet. Add a role to get started."
      />

      <AddRoleSideSheet
        open={addRoleSheetOpen}
        onClose={() => setAddRoleSheetOpen(false)}
        onSubmit={handleAddRoleSubmit}
      />
    </div>
  );
}

export default Roles;
