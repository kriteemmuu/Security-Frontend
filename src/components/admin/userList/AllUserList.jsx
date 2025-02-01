// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaEye, FaTrash } from "react-icons/fa";
// import axios from "axios";

// const AllUserList = () => {
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchedData = async () => {
//     setIsLoading(true);
//     try {
//       const config = {
//         headers: {
//           authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       const res = await axios.get(
//         `https://localhost:3001/api/user/all-adminUsers`,
//         config
//       );
//       setUsers(res.data.users);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false); // Ensure isLoading is set to false after the request completes
//     }
//   };

//   useEffect(() => {
//     fetchedData();
//   }, []);

//   const handleDeleteProduct = () => {
//     const confirmDialog = window.confirm("Are you sure you want to delete?");
//     if (confirmDialog) {
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-end mb-3">
//         <button className="btn btn-primary" onClick={() => {}}>
//           Add User
//         </button>
//       </div>

//       <table className="table table-striped table-hover">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Role</th>
//             <th>Created At</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {isLoading ? (
//             <tr>
//               <td colSpan="7" className="text-center">
//                 Loading...
//               </td>
//             </tr>
//           ) : (
//             <>
//               {users && users.length > 0 ? (
//                 users.map((user, index) => (
//                   <tr key={user._id}>
//                     <td>{index + 1}</td>
//                     <td>
//                       {user.firstName} {user.lastName}
//                     </td>
//                     <td>{user.email}</td>
//                     <td>{user.phone}</td>
//                     <td>{user.role}</td>
//                     <td>{user.updatedAt}</td>
//                     <td>
//                       <Link
//                         to={`/admin_dashboard/single-userData/${user._id}`}
//                         style={{ color: "blue" }}
//                       >
//                         <FaEye />
//                       </Link>
//                       <Link
//                         to={"#"}
//                         onClick={() => handleDeleteProduct(user._id)}
//                         style={{ color: "red" }}
//                       >
//                         <FaTrash />
//                       </Link>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="text-center">
//                     No Data Found
//                   </td>
//                 </tr>
//               )}
//             </>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllUserList;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa";
import axios from "axios";

const AllUserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchedData = async () => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await axios.get(
        `https://localhost:3001/api/user/all-adminUsers`,
        config
      );
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Ensure isLoading is set to false after the request completes
    }
  };

  useEffect(() => {
    fetchedData();
  }, []);

  const handleDeleteUser = async (userId) => {
    const confirmDialog = window.confirm("Are you sure you want to delete?");
    if (confirmDialog) {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        await axios.delete(
          `https://localhost:3001/api/user/delete/${userId}`,
          config
        );
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        console.log(error);
      }
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
          {isLoading ? (
            <tr>
              <td colSpan="7" className="text-center">
                Loading...
              </td>
            </tr>
          ) : (
            <>
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
                        style={{ color: "blue" }}
                      >
                        <FaEye />
                      </Link>
                      <Link
                        to={"#"}
                        onClick={() => handleDeleteUser(user._id)}
                        style={{ color: "red" }}
                      >
                        <FaTrash />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No Data Found
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUserList;
