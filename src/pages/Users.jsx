import { useCallback, useMemo, useState } from "react";
import AddUserSideSheet from "../components/AddUserSideSheet";
import RbacRowActionsMenu from "../components/RbacRowActionsMenu";
import RbacTable from "../components/RbacTable";
import "./Users.css";
import { useCreateUserMutation, useGetUsersQuery } from "../store/services/api";

function Users() {
  const [addUserSheetOpen, setAddUserSheetOpen] = useState(false);
  const [createUser] = useCreateUserMutation();
  const { data: users, isLoading } = useGetUsersQuery();
  console.log(users);
  const handleAddUserSubmit = async (data) => {
    console.log("Add user:", data);
    await createUser(data);
    // setAddUserSheetOpen(false);
  };

  const handleEditUser = useCallback((row) => {
    console.log("Edit user", row);
  }, []);

  const handleDeleteUser = useCallback((row) => {
    console.log("Delete user", row);
  }, []);

  const userColumns = useMemo(
    () => [
      { id: "name", header: "User", accessor: "name" },
      { id: "email", header: "Email", accessor: "email" },
      {
        id: "roles",
        header: "Roles",
        render: (row) => (
          <div className="rbac-table__role-pills">
            {row.roles?.map((role) => (
              <span key={role} className="rbac-table__role-pill">
                {role}
              </span>
            ))}
          </div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        render: (row) => (
          <RbacRowActionsMenu row={row} onEdit={handleEditUser} onDelete={handleDeleteUser} />
        ),
      },
    ],
    [handleDeleteUser, handleEditUser],
  );

  return (
    <div className="rbac-page rbac-users">
      <header className="rbac-page__header">
        <h1 className="rbac-page__title">Users</h1>
        <p className="rbac-page__subtitle">Assign one or more roles to users</p>
      </header>
      <div className="rbac-users__toolbar">
        <button
          type="button"
          className="rbac-btn rbac-btn--primary"
          onClick={() => setAddUserSheetOpen(true)}
        >
          Add user
        </button>
      </div>
      <RbacTable
        columns={userColumns}
        data={users?.users ?? []}
        getRowKey={(row) => row.id}
        isLoading={isLoading}
        emptyMessage="No users yet. Add a user and assign roles."
        loadingMessage="Loading..."
      />

      <AddUserSideSheet
        open={addUserSheetOpen}
        onClose={() => setAddUserSheetOpen(false)}
        onSubmit={handleAddUserSubmit}
      />
    </div>
  );
}

export default Users;
