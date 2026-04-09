import { useMemo, useState } from "react";
import AddPermissionSideSheet from "../../components/AddPermissionSideSheet";
import RbacTable from "../../components/RbacTable";
import { useCreatePermissionMutation } from "../../store/services/api";
import "./Permissions.css";

function Permissions() {
  const [addPermissionSheetOpen, setAddPermissionSheetOpen] = useState(false);
  const [createPermission] = useCreatePermissionMutation();

  const handleAddPermissionSubmit = async (payload) => {
    try {
      await createPermission(payload).unwrap();
    } catch (error) {
      console.log("create permission error", error);
    }
  };

  const permissionColumns = useMemo(
    () => [
      { id: "permission", header: "Permission", accessor: "key" },
      { id: "scope", header: "Scope", accessor: "scope" },
      { id: "description", header: "Description", accessor: "description" },
      { id: "actions", header: "Actions", render: () => "—" },
    ],
    [],
  );

  return (
    <div className="rbac-page rbac-permissions">
      <header className="rbac-page__header">
        <h1 className="rbac-page__title">Permissions</h1>
        <p className="rbac-page__subtitle">Manage permissions (e.g. create_user, edit_post); assign them to roles</p>
      </header>
      <div className="rbac-permissions__toolbar">
        <button
          type="button"
          className="rbac-btn rbac-btn--primary"
          onClick={() => setAddPermissionSheetOpen(true)}
        >
          Add permission
        </button>
      </div>
      <RbacTable
        columns={permissionColumns}
        data={[]}
        emptyMessage="No permissions yet. Add a permission to get started."
      />

      <AddPermissionSideSheet
        open={addPermissionSheetOpen}
        onClose={() => setAddPermissionSheetOpen(false)}
        onSubmit={handleAddPermissionSubmit}
      />
    </div>
  );
}

export default Permissions;
