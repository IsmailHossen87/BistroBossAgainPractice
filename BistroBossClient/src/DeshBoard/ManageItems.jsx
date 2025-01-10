import React from "react";
import useMenu from "../Hooks/useMenu";
import SectionTitle from "../Shared/SectionTitle";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [menu,,refetch] = useMenu();
  const axiosSecure = useAxiosSecure();
  // delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(`/menu_delete/${id}`);
        if (data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            refetch()
        }
      }
    });
  };

  return (
    <div>
      <div>
        <SectionTitle heading="Manage item" subHeading="Hurry Up" />
      </div>
      {/* table */}
      <div className="w-5/6 mx-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">
                No
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                Item Image
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                Item Name
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                Price
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                Update
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {menu?.map((item, index) => (
              <tr key={item._id}>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-full w-16 h-16 object-cover"
                  />
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {item.name}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  ${item.price}
                </td>
                {/* update */}
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <Link to={`/dashboard/updateItem/${item._id}`}>
                  <button
                    className=" bg-orange-500 rounded-lg p-4 hover:text-white text-2xl focus:outline-none"
                  >
                    <FaEdit />
                  </button></Link>
                </td>
                {/* delete */}
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 rounded-lg p-4 hover:text-white text-2xl focus:outline-none"
                  >
                    <MdDelete></MdDelete>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
