// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Search, X, Check } from "lucide-react";
// import axios from "axios";
// import Header from "../common/Header";

// const GymSectionCard = ({ gymSection, onStatusChange }) => {
//   const [showDetails, setShowDetails] = useState(false);

//   return (
//     <motion.div
//       className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 relative z-10"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       {/* Main Card Content */}
//       <div className="relative h-48">
//         <img
//           src={gymSection.images[0]}
//           alt={gymSection.gymId?.gymName}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute top-2 right-2">
//           <span
//             className={`px-3 py-1 rounded-full text-xs font-semibold ${
//               gymSection.isApproved
//                 ? "bg-green-500 text-white"
//                 : "bg-red-500 text-white"
//             }`}
//           >
//             {gymSection.isApproved ? "Approved" : "Pending"}
//           </span>
//         </div>
//       </div>

//       <div className="p-4 bg-gray-800">
//         <h3 className="text-lg font-semibold text-white mb-2">
//           {gymSection.gymId?.gymName || "Unknown Gym"}
//         </h3>
//         <div className="space-y-2 mb-4">
//           <p className="text-gray-300 text-sm flex items-center">
//             <span className="font-medium mr-2">Location:</span>
//             {gymSection.city}
//           </p>
//           <p className="text-gray-300 text-sm flex items-center">
//             <span className="font-medium mr-2">Rating:</span>
//             {gymSection.averageRating}/10
//           </p>
//         </div>

//         <div className="flex justify-between items-center pt-2 border-t border-gray-700">
//           <button
//             onClick={() => setShowDetails(true)}
//             className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
//           >
//             View Details
//           </button>
//           <div className="flex space-x-2">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onStatusChange(gymSection._id, true);
//               }}
//               className={`p-2 rounded-md ${
//                 gymSection.isApproved
//                   ? "bg-gray-600 cursor-not-allowed"
//                   : "bg-green-600 hover:bg-green-700"
//               } transition-colors`}
//               disabled={gymSection.isApproved}
//             >
//               <Check size={16} className="text-white" />
//             </button>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onStatusChange(gymSection._id, false);
//               }}
//               className={`p-2 rounded-md ${
//                 !gymSection.isApproved
//                   ? "bg-gray-600 cursor-not-allowed"
//                   : "bg-red-600 hover:bg-red-700"
//               } transition-colors`}
//               disabled={!gymSection.isApproved}
//             >
//               <X size={16} className="text-white" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {showDetails && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative z-50">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-white">
//                 {gymSection.gymId?.gymName}
//               </h2>
//               <button
//                 onClick={() => setShowDetails(false)}
//                 className="text-gray-400 hover:text-white"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               <img
//                 src={gymSection.images[0]}
//                 alt={gymSection.gymId?.gymName}
//                 className="w-full h-48 object-cover rounded"
//               />
//               <div>
//                 <p className="text-gray-300 mb-2">
//                   <span className="font-semibold">Location:</span>{" "}
//                   {gymSection.city}
//                 </p>
//                 <p className="text-gray-300 mb-2">
//                   <span className="font-semibold">Phone:</span>{" "}
//                   {gymSection.phoneNumber}
//                 </p>
//                 <p className="text-gray-300 mb-2">
//                   <span className="font-semibold">Rating:</span>{" "}
//                   {gymSection.averageRating}/10
//                 </p>
//                 <div className="flex space-x-2">
//                   {gymSection.facebookUrl && (
//                     <a
//                       href={gymSection.facebookUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-400 hover:text-blue-300"
//                     >
//                       Facebook
//                     </a>
//                   )}
//                   {gymSection.instagramUrl && (
//                     <a
//                       href={gymSection.instagramUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-pink-400 hover:text-pink-300"
//                     >
//                       Instagram
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="mb-4">
//               <h3 className="text-lg font-semibold text-white mb-2">
//                 Description
//               </h3>
//               <p className="text-gray-300">{gymSection.description}</p>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold text-white mb-2">
//                 Working Hours
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                 {gymSection.workingHours.map((hours, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between text-gray-300"
//                   >
//                     <span>{hours.day}:</span>
//                     <span>
//                       {hours.openTime} - {hours.closeTime}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// const GymSections = () => {
//   const [gymSections, setGymSections] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchGymSections();
//   }, []);

//   const fetchGymSections = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/gym-sections");
//       setGymSections(response.data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching gym sections:", error);
//       setError("Failed to fetch gym sections");
//       setIsLoading(false);
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/gym-sections/${id}/approval`, {
//         isApproved: newStatus,
//       });
//       fetchGymSections();
//     } catch (error) {
//       console.error("Error updating gym section status:", error);
//     }
//   };

//   const filteredGymSections = gymSections.filter(
//     (section) =>
//       section.gymId?.gymName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       section.city.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (isLoading) return <div className="text-white p-8">Loading...</div>;
//   if (error) return <div className="text-red-500 p-8">{error}</div>;

//   return (
//     <div className="flex-1 relative">
//       <Header title="Gym Sections" />
      
//       <div className="relative z-10">
//         <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <div className="mb-6 flex justify-between items-center">
//             <div className="relative w-64">
//               <input
//                 type="text"
//                 placeholder="Search gym sections..."
//                 className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//             </div>
//             <div className="text-gray-300">
//               Total Sections: {filteredGymSections.length}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredGymSections.map((gymSection) => (
//               <GymSectionCard
//                 key={gymSection._id}
//                 gymSection={gymSection}
//                 onStatusChange={handleStatusChange}
//               />
//             ))}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default GymSections; 


////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Search, X, Check } from "lucide-react";
// import axios from "axios";
// import Header from "../common/Header";

// const GymSectionCard = ({ gymSection, onStatusChange }) => {
//   const [showDetails, setShowDetails] = useState(false);

//   return (
//     <motion.div
//       className="bg-[#222] rounded-lg overflow-hidden shadow-lg border border-[#333] relative z-10"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       <div className="relative h-48">
//         <img
//           src={gymSection.images[0]}
//           alt={gymSection.gymId?.gymName}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute top-2 right-2">
//           <span
//             className={`px-3 py-1 rounded-full text-xs font-semibold ${
//               gymSection.isApproved
//                 ? "bg-[#3CB347] text-black"
//                 : "bg-[#333] text-white"
//             }`}
//           >
//             {gymSection.isApproved ? "Approved" : "Pending"}
//           </span>
//         </div>
//       </div>

//       <div className="p-4 bg-[#222]">
//         <h3 className="text-lg font-semibold text-[#3CB347] mb-2">
//           {gymSection.gymId?.gymName || "Unknown Gym"}
//         </h3>
//         <div className="space-y-2 mb-4">
//           <p className="text-gray-300 text-sm flex items-center">
//             <span className="font-medium mr-2">Location:</span>
//             {gymSection.city}
//           </p>
//           <p className="text-gray-300 text-sm flex items-center">
//             <span className="font-medium mr-2">Rating:</span>
//             {gymSection.averageRating}/10
//           </p>
//         </div>

//         <div className="flex justify-between items-center pt-2 border-t border-[#333]">
//           <button
//             onClick={() => setShowDetails(true)}
//             className="px-3 py-1 bg-[#3CB347] hover:bg-[#2ca338] text-black rounded-md text-sm transition-colors"
//           >
//             View Details
//           </button>
//           <div className="flex space-x-2">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onStatusChange(gymSection._id, true);
//               }}
//               className={`p-2 rounded-md ${
//                 gymSection.isApproved
//                   ? "bg-[#333] cursor-not-allowed"
//                   : "bg-[#3CB347] hover:bg-[#2ca338]"
//               } transition-colors`}
//               disabled={gymSection.isApproved}
//             >
//               <Check size={16} className="text-white" />
//             </button>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onStatusChange(gymSection._id, false);
//               }}
//               className={`p-2 rounded-md ${
//                 !gymSection.isApproved
//                   ? "bg-[#333] cursor-not-allowed"
//                   : "bg-[#333] hover:bg-[#444]"
//               } transition-colors`}
//               disabled={!gymSection.isApproved}
//             >
//               <X size={16} className="text-white" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {showDetails && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-[#222] rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative z-50">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-[#3CB347]">
//                 {gymSection.gymId?.gymName}
//               </h2>
//               <button
//                 onClick={() => setShowDetails(false)}
//                 className="text-gray-400 hover:text-white"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               <img
//                 src={gymSection.images[0]}
//                 alt={gymSection.gymId?.gymName}
//                 className="w-full h-48 object-cover rounded"
//               />
//               <div>
//                 <p className="text-gray-300 mb-2">
//                   <span className="font-semibold">Location:</span>{" "}
//                   {gymSection.city}
//                 </p>
//                 <p className="text-gray-300 mb-2">
//                   <span className="font-semibold">Phone:</span>{" "}
//                   {gymSection.phoneNumber}
//                 </p>
//                 <p className="text-gray-300 mb-2">
//                   <span className="font-semibold">Rating:</span>{" "}
//                   {gymSection.averageRating}/10
//                 </p>
//                 <div className="flex space-x-2">
//                   {gymSection.facebookUrl && (
//                     <a
//                       href={gymSection.facebookUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[#3CB347] hover:text-[#2ca338]"
//                     >
//                       Facebook
//                     </a>
//                   )}
//                   {gymSection.instagramUrl && (
//                     <a
//                       href={gymSection.instagramUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[#3CB347] hover:text-[#2ca338]"
//                     >
//                       Instagram
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="mb-4">
//               <h3 className="text-lg font-semibold text-[#3CB347] mb-2">
//                 Description
//               </h3>
//               <p className="text-gray-300">{gymSection.description}</p>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold text-[#3CB347] mb-2">
//                 Working Hours
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                 {gymSection.workingHours.map((hours, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between text-gray-300"
//                   >
//                     <span>{hours.day}:</span>
//                     <span>
//                       {hours.openTime} - {hours.closeTime}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// const GymSections = () => {
//   const [gymSections, setGymSections] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const cardsPerPage = 3;

//   useEffect(() => {
//     fetchGymSections();
//   }, []);

//   const fetchGymSections = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/gym-sections");
//       setGymSections(response.data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching gym sections:", error);
//       setError("Failed to fetch gym sections");
//       setIsLoading(false);
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/gym-sections/${id}/approval`, {
//         isApproved: newStatus,
//       });
//       fetchGymSections();
//     } catch (error) {
//       console.error("Error updating gym section status:", error);
//     }
//   };

//   const filteredGymSections = gymSections.filter(
//     (section) =>
//       section.gymId?.gymName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       section.city.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination logic
//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const currentCards = filteredGymSections.slice(indexOfFirstCard, indexOfLastCard);
//   const totalPages = Math.ceil(filteredGymSections.length / cardsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   if (isLoading) return <div className="text-white p-8">Loading...</div>;
//   if (error) return <div className="text-red-500 p-8">{error}</div>;

//   return (
//     <div className="flex-1 relative">
//       <Header title="Gym Sections" />
      
//       <div className="relative z-10">
//         <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
//             <div className="relative w-full sm:w-64">
//               <input
//                 type="text"
//                 placeholder="Search gym sections..."
//                 className="w-full bg-[#333] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3CB347] border border-[#333]"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//             </div>
//             <div className="text-gray-300">
//               Total Sections: {filteredGymSections.length}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {currentCards.map((gymSection) => (
//               <GymSectionCard
//                 key={gymSection._id}
//                 gymSection={gymSection}
//                 onStatusChange={handleStatusChange}
//               />
//             ))}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="mt-6 flex justify-center gap-2">
//               <button
//                 onClick={() => paginate(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className={`px-3 py-1 rounded-md ${
//                   currentPage === 1
//                     ? "bg-[#333] text-gray-500 cursor-not-allowed"
//                     : "bg-[#3CB347] text-black hover:bg-[#2ca338]"
//                 }`}
//               >
//                 Previous
//               </button>
//               {[...Array(totalPages)].map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => paginate(index + 1)}
//                   className={`px-3 py-1 rounded-md ${
//                     currentPage === index + 1
//                       ? "bg-[#3CB347] text-black"
//                       : "bg-[#333] text-white hover:bg-[#444]"
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//               ))}
//               <button
//                 onClick={() => paginate(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className={`px-3 py-1 rounded-md ${
//                   currentPage === totalPages
//                     ? "bg-[#333] text-gray-500 cursor-not-allowed"
//                     : "bg-[#3CB347] text-black hover:bg-[#2ca338]"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default GymSections;


////////////////////////////////////////////////////////////////////////////////////////////


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X, Check } from "lucide-react";
import axios from "axios";
import Header from "../common/Header";

// Separate Modal Component
const DetailsModal = ({ gymSection, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9999 }}>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="relative bg-[#222] rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#3CB347]">
            {gymSection.gymId?.gymName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <img
            src={gymSection.images[0]}
            alt={gymSection.gymId?.gymName}
            className="w-full h-48 object-cover rounded"
          />
          <div>
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Location:</span> {gymSection.city}
            </p>
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Phone:</span> {gymSection.phoneNumber}
            </p>
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Rating:</span> {gymSection.averageRating}/10
            </p>
            <div className="flex space-x-2">
              {gymSection.facebookUrl && (
                <a
                  href={gymSection.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3CB347] hover:text-[#2ca338]"
                >
                  Facebook
                </a>
              )}
              {gymSection.instagramUrl && (
                <a
                  href={gymSection.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3CB347] hover:text-[#2ca338]"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#3CB347] mb-2">Description</h3>
          <p className="text-gray-300">{gymSection.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#3CB347] mb-2">Working Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {gymSection.workingHours.map((hours, index) => (
              <div key={index} className="flex justify-between text-gray-300">
                <span>{hours.day}:</span>
                <span>{hours.openTime} - {hours.closeTime}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GymSectionCard = ({ gymSection, onStatusChange }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <motion.div
        className="bg-[#222] rounded-lg overflow-hidden shadow-lg border border-[#333]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="relative h-48">
          <img
            src={gymSection.images[0]}
            alt={gymSection.gymId?.gymName}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                gymSection.isApproved
                  ? "bg-[#3CB347] text-black"
                  : "bg-[#333] text-white"
              }`}
            >
              {gymSection.isApproved ? "Approved" : "Pending"}
            </span>
          </div>
        </div>

        <div className="p-4 bg-[#222]">
          <h3 className="text-lg font-semibold text-[#3CB347] mb-2">
            {gymSection.gymId?.gymName || "Unknown Gym"}
          </h3>
          <div className="space-y-2 mb-4">
            <p className="text-gray-300 text-sm flex items-center">
              <span className="font-medium mr-2">Location:</span>
              {gymSection.city}
            </p>
            <p className="text-gray-300 text-sm flex items-center">
              <span className="font-medium mr-2">Rating:</span>
              {gymSection.averageRating}/10
            </p>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-[#333]">
            <button
              onClick={() => setShowDetails(true)}
              className="px-3 py-1 bg-[#3CB347] hover:bg-[#2ca338] text-black rounded-md text-sm transition-colors"
            >
              View Details
            </button>
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange(gymSection._id, true);
                }}
                className={`p-2 rounded-md ${
                  gymSection.isApproved
                    ? "bg-[#333] cursor-not-allowed"
                    : "bg-[#3CB347] hover:bg-[#2ca338]"
                } transition-colors`}
                disabled={gymSection.isApproved}
              >
                <Check size={16} className="text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange(gymSection._id, false);
                }}
                className={`p-2 rounded-md ${
                  !gymSection.isApproved
                    ? "bg-[#333] cursor-not-allowed"
                    : "bg-[#333] hover:bg-[#444]"
                } transition-colors`}
                disabled={!gymSection.isApproved}
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {showDetails && (
        <DetailsModal 
          gymSection={gymSection} 
          onClose={() => setShowDetails(false)} 
        />
      )}
    </>
  );
};

const GymSections = () => {
  const [gymSections, setGymSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  useEffect(() => {
    fetchGymSections();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchGymSections = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/gym-sections");
      setGymSections(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching gym sections:", error);
      setError("Failed to fetch gym sections");
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/gym-sections/${id}/approval`, {
        isApproved: newStatus,
      });
      fetchGymSections();
    } catch (error) {
      console.error("Error updating gym section status:", error);
    }
  };

  const filteredGymSections = gymSections.filter(
    (section) =>
      section.gymId?.gymName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredGymSections.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredGymSections.length / cardsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) return <div className="text-white p-8">Loading...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <div className="flex-1 relative">
      <Header title="Gym Sections" />
      
      <div className="relative">
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search gym sections..."
                className="w-full bg-[#333] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3CB347] border border-[#333]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            <div className="text-gray-300">
              Total Sections: {filteredGymSections.length}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCards.map((gymSection) => (
              <GymSectionCard
                key={gymSection._id}
                gymSection={gymSection}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2 flex-wrap">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? "bg-[#333] text-gray-500 cursor-not-allowed"
                    : "bg-[#3CB347] text-black hover:bg-[#2ca338]"
                }`}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === index + 1
                      ? "bg-[#3CB347] text-black"
                      : "bg-[#333] text-white hover:bg-[#444]"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? "bg-[#333] text-gray-500 cursor-not-allowed"
                    : "bg-[#3CB347] text-black hover:bg-[#2ca338]"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default GymSections;