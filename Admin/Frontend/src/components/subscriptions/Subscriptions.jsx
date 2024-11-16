// ///////////////////////////
// import { motion } from "framer-motion";
// import {
//   Edit,
//   Search,
//   Trash2,
//   CheckCircle,
//   XCircle,
//   Upload,
//   ChevronLeft,
//   ChevronRight,
//   Plus,
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Modal from "react-modal";

// // Set the app element for accessibility
// Modal.setAppElement("#root");



// const SubscriptionModal = ({ isOpen, onClose, onSubscriptionAdded }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     totalVisits: '',
//     durationInDays: '',
//     price: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/subscriptions', {
//         ...formData,
//         totalVisits: parseInt(formData.totalVisits),
//         durationInDays: parseInt(formData.durationInDays),
//         price: parseFloat(formData.price)
//       });
//       onClose();
//       onSubscriptionAdded();
//     } catch (error) {
//       console.error('Error creating subscription:', error);
//       alert('Error creating subscription');
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel="Add Subscription"
//       className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl max-w-md w-full z-50"
//       overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
//     >
//       <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Subscription</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Total Visits
//           </label>
//           <input
//             type="number"
//             name="totalVisits"
//             value={formData.totalVisits}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Duration (days)
//           </label>
//           <input
//             type="number"
//             name="durationInDays"
//             value={formData.durationInDays}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Price
//           </label>
//           <input
//             type="number"
//             step="0.01"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div className="flex justify-end">
//           <button
//             type="button"
//             onClick={onClose}
//             className="mr-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//           >
//             Add Subscription
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// const Subscriptions = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

//   useEffect(() => {
//     fetchSubscriptions();
//   }, []);

//   const fetchSubscriptions = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/subscriptions");
//       setSubscriptions(response.data);
//     } catch (error) {
//       console.error("Error fetching subscriptions:", error);
//     }
//   };

//   return (
//     <motion.div
//       className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.2 }}
//     >
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center space-x-4">
//           <h2 className="text-xl font-semibold text-gray-100">Subscriptions</h2>
//           <button
//             onClick={() => setIsSubscriptionModalOpen(true)}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
//           >
//             <Plus size={18} />
//             <span>Add Subscription</span>
//           </button>
//         </div>
//       </div>

//       {/* Display Subscriptions */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {subscriptions.map((subscription) => (
//           <div
//             key={subscription._id}
//             className="bg-gray-700 p-4 rounded-lg"
//           >
//             <h4 className="text-lg font-semibold text-white mb-2">{subscription.name}</h4>
//             <p className="text-gray-300">Visits: {subscription.totalVisits}</p>
//             <p className="text-gray-300">Duration: {subscription.durationInDays} days</p>
//             <p className="text-gray-300">Price: ${subscription.price}</p>
//           </div>
//         ))}
//       </div>

//       <SubscriptionModal
//         isOpen={isSubscriptionModalOpen}
//         onClose={() => setIsSubscriptionModalOpen(false)}
//         onSubscriptionAdded={fetchSubscriptions}
//       />
//     </motion.div>
//   );
// };

// export default Subscriptions;



import { motion } from "framer-motion";
import {
  Edit,
  Search,
  Trash2,
  CheckCircle,
  XCircle,
  Upload,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const SubscriptionModal = ({ isOpen, onClose, onSubscriptionAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    totalVisits: '',
    durationInDays: '',
    price: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/subscriptions', {
        ...formData,
        totalVisits: parseInt(formData.totalVisits),
        durationInDays: parseInt(formData.durationInDays),
        price: parseFloat(formData.price)
      });
      onClose();
      onSubscriptionAdded();
    } catch (error) {
      console.error('Error creating subscription:', error);
      alert('Error creating subscription');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Subscription"
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#222] p-6 rounded-lg shadow-xl max-w-md w-full"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 1000
        },
        content: {
          border: '1px solid #333'
        }
      }}
    >
      <h2 className="text-xl font-bold mb-4 text-[#3CB347]">Add New Subscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-[#3CB347] text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#333] text-white border border-[#444] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#3CB347] text-sm font-bold mb-2">
            Total Visits
          </label>
          <input
            type="number"
            name="totalVisits"
            value={formData.totalVisits}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#333] text-white border border-[#444] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#3CB347] text-sm font-bold mb-2">
            Duration (days)
          </label>
          <input
            type="number"
            name="durationInDays"
            value={formData.durationInDays}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#333] text-white border border-[#444] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-[#3CB347] text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#333] text-white border border-[#444] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-4 px-4 py-2 bg-[#333] text-white rounded hover:bg-[#444] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#3CB347] text-black rounded hover:bg-[#2ca338] transition-colors"
          >
            Add Subscription
          </button>
        </div>
      </form>
    </Modal>
  );
};

const Subscriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/subscriptions");
      setSubscriptions(response.data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  return (
    <motion.div
      className="bg-[#222] shadow-lg rounded-xl p-6 border border-[#333]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-[#3CB347]">Subscriptions</h2>
          <button
            onClick={() => setIsSubscriptionModalOpen(true)}
            className="bg-[#3CB347] hover:bg-[#2ca338] text-black px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Add Subscription</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {subscriptions.map((subscription) => (
          <div
            key={subscription._id}
            className="bg-[#333] p-4 rounded-lg border border-[#444]"
          >
            <h4 className="text-lg font-semibold text-[#3CB347] mb-2">
              {subscription.name}
            </h4>
            <p className="text-gray-300">Visits: {subscription.totalVisits}</p>
            <p className="text-gray-300">Duration: {subscription.durationInDays} days</p>
            <p className="text-gray-300">Price: ${subscription.price}</p>
          </div>
        ))}
      </div>

      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        onSubscriptionAdded={fetchSubscriptions}
      />
    </motion.div>
  );
};

export default Subscriptions;