import React from "react";
import { useGetUsers } from "../hooks/useUsers";
import User from "./User";

function Users() {
  const { data: users } = useGetUsers();
  return (
    <div>
      {users?.map((user) => (
        <User {...user} key={user.id} />
      ))}
    </div>
  );
}

export default Users;
