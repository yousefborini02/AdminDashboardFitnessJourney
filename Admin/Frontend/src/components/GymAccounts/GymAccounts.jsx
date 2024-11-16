// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Search } from "lucide-react";
// import axios from "axios";

// const GymAccounts = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [gymAccounts, setGymAccounts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchGymAccounts();
//   }, []);

//   const fetchGymAccounts = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get("http://localhost:5000/api/gym-accounts");
//       if (Array.isArray(response.data)) {
//         setGymAccounts(response.data);
//       } else {
//         console.error("Unexpected data format:", response.data);
//         setError("Received unexpected data format from server");
//       }
//     } catch (error) {
//       console.error("Error fetching gym accounts:", error);
//       setError("Failed to fetch gym accounts. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/gym-accounts/${id}/approval`, {
//         isApproved: newStatus,
//       });
//       fetchGymAccounts(); // Refresh the list after updating
//     } catch (error) {
//       console.error("Error updating gym account status:", error);
//       setError("Failed to update gym account status. Please try again.");
//     }
//   };

//   const filteredAccounts = gymAccounts.filter(
//     (account) =>
//       account.gymName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       account.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (isLoading) {
//     return <div className="text-white">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   return (
//     <motion.div
//       className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.2 }}
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-100">Gym Accounts</h2>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search gym accounts..."
//             className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//         </div>
//       </div>

//       {gymAccounts.length === 0 ? (
//         <div className="text-gray-300">No gym accounts found.</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-700">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                   Gym Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                   Email
//                 </th>
//                 {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                   Commercial Register
//                 </th> */}
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-700">
//               {filteredAccounts.map((account) => (
//                 <motion.tr
//                   key={account._id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       {/* <div className="flex-shrink-0 h-10 w-10">
//                         <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
//                           {account.gymName.charAt(0)}
//                         </div>
//                       </div> */}
//                       <div >
//                         <div className="text-sm font-medium text-gray-100">
//                           {account.gymName}
//                         </div>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-300">{account.email}</div>
//                   </td>
//                   {/* <td className="px-6 py-4 whitespace-nowrap">
//                     <a
//                       href={account.commercialRegister}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-400 hover:text-blue-300"
//                     >
//                       View Document
//                     </a>
//                   </td> */}
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         account.isApproved
//                           ? "bg-green-800 text-green-100"
//                           : "bg-red-800 text-red-100"
//                       }`}
//                     >
//                       {account.isApproved ? "Active" : "Inactive"}
//                     </span>
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                     <button
//                       className={`px-3 py-1 rounded-md ${
//                         account.isApproved
//                           ? "bg-red-600 hover:bg-red-700"
//                           : "bg-green-600 hover:bg-green-700"
//                       } text-white`}
//                       onClick={() =>
//                         handleStatusChange(account._id, !account.isApproved)
//                       }
//                     >
//                       {account.isApproved ? "Deactivate" : "Activate"}
//                     </button>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default GymAccounts;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Search } from "lucide-react";
// import axios from "axios";

// const GymAccounts = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [gymAccounts, setGymAccounts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchGymAccounts();
//   }, []);

//   const fetchGymAccounts = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get("http://localhost:5000/api/gym-accounts");
//       if (Array.isArray(response.data)) {
//         setGymAccounts(response.data);
//       } else {
//         console.error("Unexpected data format:", response.data);
//         setError("Received unexpected data format from server");
//       }
//     } catch (error) {
//       console.error("Error fetching gym accounts:", error);
//       setError("Failed to fetch gym accounts. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/gym-accounts/${id}/approval`, {
//         isApproved: newStatus,
//       });
//       fetchGymAccounts();
//     } catch (error) {
//       console.error("Error updating gym account status:", error);
//       setError("Failed to update gym account status. Please try again.");
//     }
//   };

//   const filteredAccounts = gymAccounts.filter(
//     (account) =>
//       account.gymName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       account.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (isLoading) {
//     return <div className="text-white">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   return (
//     <motion.div
//       className="bg-[#222] shadow-lg rounded-xl p-6 border border-[#222]"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.2 }}
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-[#3CB347]">Gym Accounts</h2>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search gym accounts..."
//             className="bg-[#333] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//         </div>
//       </div>

//       {gymAccounts.length === 0 ? (
//         <div className="text-gray-300">No gym accounts found.</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-[#222]">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-[#3CB347] uppercase tracking-wider">
//                   Gym Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-[#3CB347] uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-[#3CB347] uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-[#3CB347] uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-black">
//               {filteredAccounts.map((account) => (
//                 <motion.tr
//                   key={account._id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div>
//                         <div className="text-sm font-medium text-white">
//                           {account.gymName}
//                         </div>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-300">{account.email}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         account.isApproved
//                           ? "bg-[#3CB347] text-black"
//                           : "bg-[#333] text-white"
//                       }`}
//                     >
//                       {account.isApproved ? "Active" : "Inactive"}
//                     </span>
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                     <button
//                       className={`px-3 py-1 rounded-md ${
//                         account.isApproved
//                           ? "bg-[#333] hover:bg-[#333]"
//                           : "bg-[#3CB347] hover:bg-[#2ca338]"
//                       } text-white`}
//                       onClick={() =>
//                         handleStatusChange(account._id, !account.isApproved)
//                       }
//                     >
//                       {account.isApproved ? "Deactivate" : "Activate"}
//                     </button>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default GymAccounts;


///////////////////////////////////////////////////////////////////////////////


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Plus, X } from "lucide-react";
import axios from "axios";

const AddGymAccountModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    gymName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/gym-accounts", formData);
      onSuccess();
      onClose();
      setFormData({ gymName: "", email: "", password: "" });
    } catch (error) {
      setError(error.response?.data?.message || "Error creating gym account");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-[#222] rounded-lg p-6 w-full max-w-md relative z-50 border border-[#333]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#3CB347]">Add Gym Account</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#333] border border-red-500 rounded text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#3CB347] text-sm font-medium mb-2">
              Gym Name
            </label>
            <input
              type="text"
              name="gymName"
              value={formData.gymName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#333] border border-[#444] rounded-md text-white 
                focus:outline-none focus:ring-2 focus:ring-[#3CB347] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-[#3CB347] text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#333] border border-[#444] rounded-md text-white 
                focus:outline-none focus:ring-2 focus:ring-[#3CB347] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-[#3CB347] text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#333] border border-[#444] rounded-md text-white 
                focus:outline-none focus:ring-2 focus:ring-[#3CB347] focus:border-transparent"
              required
              minLength={6}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#333] text-white rounded-md hover:bg-[#444] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#3CB347] text-black rounded-md hover:bg-[#2ca338] transition-colors"
            >
              Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const GymAccounts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gymAccounts, setGymAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchGymAccounts();
  }, []);

  const fetchGymAccounts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/api/gym-accounts");
      if (Array.isArray(response.data)) {
        setGymAccounts(response.data);
      } else {
        console.error("Unexpected data format:", response.data);
        setError("Received unexpected data format from server");
      }
    } catch (error) {
      console.error("Error fetching gym accounts:", error);
      setError("Failed to fetch gym accounts. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/gym-accounts/${id}/approval`, {
        isApproved: newStatus,
      });
      fetchGymAccounts();
    } catch (error) {
      console.error("Error updating gym account status:", error);
      setError("Failed to update gym account status. Please try again.");
    }
  };

  const filteredAccounts = gymAccounts.filter(
    (account) =>
      account.gymName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <motion.div
      className="bg-[#222] shadow-lg rounded-xl p-6 border border-[#222]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#3CB347]">Gym Accounts</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search gym accounts..."
              className="bg-[#333] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#3CB347] text-black rounded-lg hover:bg-[#2ca338] transition-colors"
          >
            <Plus size={18} />
            Add Gym
          </button>
        </div>
      </div>

      {gymAccounts.length === 0 ? (
        <div className="text-gray-300">No gym accounts found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#222]">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#3CB347] uppercase tracking-wider">
                  Gym Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#3CB347] uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#3CB347] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#3CB347] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-black">
              {filteredAccounts.map((account) => (
                <motion.tr
                  key={account._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-white">
                          {account.gymName}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{account.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        account.isApproved
                          ? "bg-[#3CB347] text-black"
                          : "bg-[#333] text-white"
                      }`}
                    >
                      {account.isApproved ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      className={`px-3 py-1 rounded-md ${
                        account.isApproved
                          ? "bg-[#333] hover:bg-[#333]"
                          : "bg-[#3CB347] hover:bg-[#2ca338]"
                      } text-white`}
                      onClick={() =>
                        handleStatusChange(account._id, !account.isApproved)
                      }
                    >
                      {account.isApproved ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddGymAccountModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchGymAccounts}
      />
    </motion.div>
  );
};

export default GymAccounts;