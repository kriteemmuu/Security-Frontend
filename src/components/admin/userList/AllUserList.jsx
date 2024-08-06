import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../../apis/Api";
import { FaEye, FaTrash } from "react-icons/fa";

const AllUserList = () => {
  const [users, setUsers] = useState([]);

  const fetchedData = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchedData();
  }, []);

  const handleDeleteProduct = (id) => {
    const confirmDialog = window.confirm("Are you sure you want to delete?");
    if (confirmDialog) {
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={() => {}}>
          Add User
        </button>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>{user.updatedAt}</td>
                <td>
                  <Link
                    to={`/admin_dashboard/single-userData/${user._id}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    <FaEye />
                  </Link>
                  <button
                    onClick={() => handleDeleteProduct(user._id)}
                    className="btn btn-danger btn-sm"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUserList;
