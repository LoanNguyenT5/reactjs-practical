import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../../App.css';
import { UserData, UserDataList } from '../personal-information/data-types'

const ClientList = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [paginationData, setPaginationData] = useState<{ total: number; skip: number; limit: number }>({
    total: 0,
    skip: 0,
    limit: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const calculateSkip = (page: number) => (page - 1) * paginationData.limit;

  useEffect(() => {
    const skip = calculateSkip(currentPage);
    fetch(`https://dummyjson.com/users?skip=${skip}&limit=${paginationData.limit}`)
      .then((response) => response.json())
      .then((data: UserDataList) => {
        console.log("data.users", data.users)
        setUserData(data.users);
        setPaginationData({
          total: data.total,
          skip: data.skip,
          limit: data.limit,
        });
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, [currentPage, paginationData.limit]); 

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= Math.ceil(paginationData.total / paginationData.limit)) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="grid grid-cols-1 px-4 pt-6 xl:gap-4 dark:bg-gray-900">
      <div className="flex justify-center">
        <h1 className="text-dark-blue font-bold">List Personal Information</h1>
      </div>



      <table className="client-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Address</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => {
            const email = Array.isArray(user.email) ? user.email[0]?.email : user.email;
            const addresses = Array.isArray(user.address) ? user.address : [user.address];

            return (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{email || "N/A"}</td>
                <td>{user.role}</td>
                <td>
                  {addresses[0]?.address || "N/A"} - {addresses[0]?.city || "N/A"} - {addresses[0]?.country || "N/A"}

                </td>
                <td>
                  <Link to={`/pages/user/${user.id}/pi`} className="view-link">
                    View Details
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
        >
          Previous
        </button>

        <span className="page-number">Page {currentPage}</span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * paginationData.limit >= paginationData.total}
          className={`pagination-button ${currentPage * paginationData.limit >= paginationData.total ? 'disabled' : ''}`}
        >
          Next
        </button>
      </div>
      <div className="pagination-info">
        <p>Total Clients: {paginationData.total}</p>
        <p>Showing {paginationData.skip + 1} to {paginationData.skip + paginationData.limit} of {paginationData.total}</p>
      </div>

    </div>
  );
};

export default ClientList;
