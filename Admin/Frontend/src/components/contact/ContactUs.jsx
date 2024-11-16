
// ///////////////////////////
// import React, { useState, useEffect } from "react";
// import { Mail, Search, Trash2 } from "lucide-react";
// import axios from "axios";

// const ContactMessages = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [filteredMessages, setFilteredMessages] = useState([]);
//   const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
//   const [replyMessage, setReplyMessage] = useState("");
//   const [selectedEmail, setSelectedEmail] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/contact/contact-messages"
//       );
//       setMessages(response.data);
//       setFilteredMessages(response.data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//     const filtered = messages.filter(
//       (message) =>
//         message.name.toLowerCase().includes(term) ||
//         message.email.toLowerCase().includes(term) ||
//         message.subject.toLowerCase().includes(term)
//     );
//     setFilteredMessages(filtered);
//   };

//   const handleReply = (email, subject) => {
//     setSelectedEmail(email);
//     setSelectedSubject(subject);
//     setIsReplyDialogOpen(true);
//   };

//   const handleSendReply = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/contact/send-email", {
//         email: selectedEmail,
//         subject: selectedSubject,
//         message: replyMessage,
//       });
//       alert("Reply sent successfully!");
//       setIsReplyDialogOpen(false);
//       setReplyMessage("");
//     } catch (error) {
//       console.error("Error sending reply:", error);
//       alert("Failed to send reply. Please try again.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(
//         `http://localhost:5000/api/contact/contact-messages/${id}`
//       );
//       fetchMessages(); // Refresh the list after deletion
//     } catch (error) {
//       console.error("Error deleting message:", error);
//       alert("Failed to delete message. Please try again.");
//     }
//   };

//   return (
//     <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-100">
//           Contact Messages
//         </h2>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search messages..."
//             className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onChange={handleSearch}
//             value={searchTerm}
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-700">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Subject
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Message
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-700">
//             {filteredMessages.map((message) => (
//               <tr key={message._id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
//                   {message.name}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                   {message.email}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                   {message.subject}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-300">
//                   {message.message}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                   <button
//                     onClick={() => handleReply(message.email, message.subject)}
//                     className="text-blue-400 hover:text-blue-300 mr-2"
//                   >
//                     <Mail size={18} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(message._id)}
//                     className="text-red-400 hover:text-red-300"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isReplyDialogOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
//             <h2 className="text-xl font-semibold text-gray-100 mb-4">
//               Reply to Message
//             </h2>
//             <textarea
//               className="w-full bg-gray-700 text-white rounded-lg p-2 mb-4"
//               placeholder="Type your reply here..."
//               value={replyMessage}
//               onChange={(e) => setReplyMessage(e.target.value)}
//               rows={5}
//             />
//             <div className="flex justify-end space-x-2">
//               <button
//                 className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
//                 onClick={() => setIsReplyDialogOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
//                 onClick={handleSendReply}
//               >
//                 Send Reply
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContactMessages;



// import React, { useState, useEffect } from "react";
// import { Mail, Search, Trash2 } from "lucide-react";
// import axios from "axios";

// const ContactMessages = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [filteredMessages, setFilteredMessages] = useState([]);
//   const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
//   const [replyMessage, setReplyMessage] = useState("");
//   const [selectedEmail, setSelectedEmail] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/contact/contact-messages"
//       );
//       setMessages(response.data);
//       setFilteredMessages(response.data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//     const filtered = messages.filter(
//       (message) =>
//         message.name.toLowerCase().includes(term) ||
//         message.email.toLowerCase().includes(term) ||
//         message.subject.toLowerCase().includes(term)
//     );
//     setFilteredMessages(filtered);
//   };

//   const handleReply = (email, subject) => {
//     setSelectedEmail(email);
//     setSelectedSubject(subject);
//     setIsReplyDialogOpen(true);
//   };

//   const handleSendReply = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/contact/send-email", {
//         email: selectedEmail,
//         subject: selectedSubject,
//         message: replyMessage,
//       });
//       alert("Reply sent successfully!");
//       setIsReplyDialogOpen(false);
//       setReplyMessage("");
//     } catch (error) {
//       console.error("Error sending reply:", error);
//       alert("Failed to send reply. Please try again.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(
//         `http://localhost:5000/api/contact/contact-messages/${id}`
//       );
//       fetchMessages();
//     } catch (error) {
//       console.error("Error deleting message:", error);
//       alert("Failed to delete message. Please try again.");
//     }
//   };

//   return (
//     <div className="bg-[#222] shadow-lg rounded-xl p-6 border border-[#333] mb-8">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-[#3CB347]">
//           Contact Messages
//         </h2>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search messages..."
//             className="bg-[#333] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
//             onChange={handleSearch}
//             value={searchTerm}
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-[#333]">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-[#3CB347] uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-[#3CB347] uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-[#3CB347] uppercase tracking-wider">
//                 Subject
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-[#3CB347] uppercase tracking-wider">
//                 Message
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-[#3CB347] uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-[#333]">
//             {filteredMessages.map((message) => (
//               <tr key={message._id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
//                   {message.name}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                   {message.email}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                   {message.subject}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-300">
//                   {message.message}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                   <button
//                     onClick={() => handleReply(message.email, message.subject)}
//                     className="text-[#3CB347] hover:text-[#2ca338] mr-2"
//                   >
//                     <Mail size={18} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(message._id)}
//                     className="text-[#333] hover:text-gray-300"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isReplyDialogOpen && (
//         <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 1000 }}>
//           <div 
//             className="absolute inset-0 bg-black bg-opacity-50"
//             onClick={() => setIsReplyDialogOpen(false)}
//           />
//           <div className="bg-[#222] p-6 rounded-lg w-full max-w-md relative border border-[#333]">
//             <h2 className="text-xl font-semibold text-[#3CB347] mb-4">
//               Reply to Message
//             </h2>
//             <textarea
//               className="w-full bg-[#333] text-white rounded-lg p-2 mb-4 border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
//               placeholder="Type your reply here..."
//               value={replyMessage}
//               onChange={(e) => setReplyMessage(e.target.value)}
//               rows={5}
//             />
//             <div className="flex justify-end space-x-2">
//               <button
//                 className="px-4 py-2 bg-[#333] text-white rounded hover:bg-[#444]"
//                 onClick={() => setIsReplyDialogOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-[#3CB347] text-black rounded hover:bg-[#2ca338]"
//                 onClick={handleSendReply}
//               >
//                 Send Reply
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContactMessages;





import React, { useState, useEffect } from "react";
import { Mail, Search, Trash2, MoreVertical } from "lucide-react";
import axios from "axios";

const ActionDropdown = ({ message, onReply, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-[#333] rounded-full transition-colors"
      >
        <MoreVertical size={18} className="text-[#3CB347]" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-[#222] rounded-md shadow-lg border border-[#333] z-50">
            <ul className="py-1">
              <li>
                <button
                  onClick={() => {
                    onReply(message.email, message.subject);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-white hover:bg-[#333] flex items-center gap-2"
                >
                  <Mail size={16} className="text-[#3CB347]" />
                  Reply
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onDelete(message._id);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-white hover:bg-[#333] flex items-center gap-2"
                >
                  <Trash2 size={16} className="text-[#3CB347]" />
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

const ContactMessages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/contact/contact-messages"
      );
      setMessages(response.data);
      setFilteredMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = messages.filter(
      (message) =>
        message.name.toLowerCase().includes(term) ||
        message.email.toLowerCase().includes(term) ||
        message.subject.toLowerCase().includes(term)
    );
    setFilteredMessages(filtered);
  };

  const handleReply = (email, subject) => {
    setSelectedEmail(email);
    setSelectedSubject(subject);
    setIsReplyDialogOpen(true);
  };

  const handleSendReply = async () => {
    try {
      await axios.post("http://localhost:5000/api/contact/send-email", {
        email: selectedEmail,
        subject: selectedSubject,
        message: replyMessage,
      });
      alert("Reply sent successfully!");
      setIsReplyDialogOpen(false);
      setReplyMessage("");
    } catch (error) {
      console.error("Error sending reply:", error);
      alert("Failed to send reply. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/contact/contact-messages/${id}`
      );
      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message. Please try again.");
    }
  };

  return (
    <div className="bg-[#222] shadow-lg rounded-xl p-6 border border-[#333] mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#3CB347]">
          Contact Messages
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages..."
            className="bg-[#333] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#333]">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#3CB347] uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#3CB347] uppercase tracking-wider">
                Email
              </th>
              
              <th className="px-6 py-3 text-left text-xs font-medium text-[#3CB347] uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#3CB347] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#333]">
            {filteredMessages.map((message) => (
              <tr key={message._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {message.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {message.email}
                </td>
                
                <td className="px-6 py-4 text-sm text-gray-300">
                  {message.message}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <ActionDropdown
                    message={message}
                    onReply={handleReply}
                    onDelete={handleDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isReplyDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 1000 }}>
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsReplyDialogOpen(false)}
          />
          <div className="bg-[#222] p-6 rounded-lg w-full max-w-md relative border border-[#333]">
            <h2 className="text-xl font-semibold text-[#3CB347] mb-4">
              Reply to Message
            </h2>
            <textarea
              className="w-full bg-[#333] text-white rounded-lg p-2 mb-4 border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
              placeholder="Type your reply here..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              rows={5}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-[#333] text-white rounded hover:bg-[#444]"
                onClick={() => setIsReplyDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#3CB347] text-black rounded hover:bg-[#2ca338]"
                onClick={handleSendReply}
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
