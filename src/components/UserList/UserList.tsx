import { useState } from "react";
import useUsers from "../../hooks/useUsers";
import React from "react";

const UserList = () => {
  const pageSize = 5;
  const {
    data: users,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
  } = useUsers({ pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {users.pages.map((userPage, index) => (
          <React.Fragment key={index}>
            {userPage.map((user) => (
              <li className="list-group-item" key={user.id}>
                {user.name}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <button
        className="btn btn-primary my-3"
        disabled={isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
    </>
  );
};

export default UserList;
