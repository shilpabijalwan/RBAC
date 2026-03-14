import { useState } from "react";
import AddUserSideSheet from "../components/AddUserSideSheet";
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
      <div className="rbac-users__table-wrap">
        <table className="rbac-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.users?.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <div className="flex gap-2">
                    {item.roles?.map((role) => (
                      <span
                        key={role}
                        className="rounded-full px-2 py-1 border border-gray-300 max-w-fit text-xs bg-blue-100 text-black"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="flex gap-10">
                  <button className="rbac-btn rbac-btn--primary">Edit</button>
                  <button className="">Delete</button>
                </td>
              </tr>
            ))}
            {isLoading && (
              <tr>
                <td colSpan={4} className="rbac-table__empty">
                  Loading...
                </td>
              </tr>
            )}
            {!users?.users?.length && (
              <tr>
                <td colSpan={4} className="rbac-table__empty">
                  No users yet. Add a user and assign roles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddUserSideSheet
        open={addUserSheetOpen}
        onClose={() => setAddUserSheetOpen(false)}
        onSubmit={handleAddUserSubmit}
      />
    </div>
  );
}

export default Users;
