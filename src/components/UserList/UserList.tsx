import { useState } from "react";
import useUsers from "../../hooks/useUsers";

const UserList = () => {
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const { data: users, isLoading, error } = useUsers({ pageSize, page });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {users?.map((user) => (
          <li className="list-group-item" key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
      <button
        className="btn btn-primary my-3"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      <button
        className="btn btn-primary my-3 ms-2"
        onClick={() => setPage(page + 1)}
        disabled={users.length < pageSize}
      >
        Next
      </button>
    </>
  );
};

export default UserList;
