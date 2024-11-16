// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { AnimatePresence, motion } from "framer-motion";
// import {
//   BarChart2,
//   Contact,
//   LogOut,
//   Menu,
//   ShoppingBag,
//   User,
//   Users,
//   Dumbbell ,
// } from "lucide-react";
// import { logout } from "../../store/authSlice"; // Adjust this import path as needed

// const SIDEBAR_ITEMS = [
//   { name: "Overview", icon: BarChart2, color: "#6366f1", href: "/" },
//   { name: "Users", icon: User, color: "#EC4899", href: "/users" },
//   {
//     name: "Gym Accounts",
//     icon: Users,
//     color: "#EC4899",
//     href: "/GymAccounts",
//   },
//   /////
//   { name: "Gym Sections", icon: Dumbbell , color: "#10B981", href: "/gymsections" },
//   { name: "Subscriptions", icon: ShoppingBag, color: "#8B5CF6", href: "/Subscriptions" },
//   { name: "Contact", icon: Contact, color: "#10B981", href: "/Contact" },



  
// ];

// const Sidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     dispatch(logout()); // Dispatch the logout action
//     navigate("/"); // Navigate to the home page
//   };

//   return (
//     <motion.div
//       className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
//         isSidebarOpen ? "w-64" : "w-20"
//       }`}
//       animate={{ width: isSidebarOpen ? 256 : 80 }}
//     >
//       <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
//         >
//           <Menu size={24} />
//         </motion.button>
//         <nav className="mt-8 flex-grow">
//           {SIDEBAR_ITEMS.map((item) => (
//             <Link key={item.href} to={item.href}>
//               <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
//                 <item.icon
//                   size={20}
//                   style={{ color: item.color, minWidth: "20px" }}
//                 />
//                 <AnimatePresence>
//                   {isSidebarOpen && (
//                     <motion.span
//                       className="ml-4 whitespace-nowrap"
//                       initial={{ opacity: 0, width: 0 }}
//                       animate={{ opacity: 1, width: "auto" }}
//                       exit={{ opacity: 0, width: 0 }}
//                       transition={{ duration: 0.2, delay: 0.3 }}
//                     >
//                       {item.name}
//                     </motion.span>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             </Link>
//           ))}
//           <div
//             className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 cursor-pointer"
//             onClick={handleLogout}
//           >
//             <LogOut size={20} style={{ color: "#6EE7B7", minWidth: "20px" }} />
//             <AnimatePresence>
//               {isSidebarOpen && (
//                 <motion.span
//                   className="ml-4 whitespace-nowrap"
//                   initial={{ opacity: 0, width: 0 }}
//                   animate={{ opacity: 1, width: "auto" }}
//                   exit={{ opacity: 0, width: 0 }}
//                   transition={{ duration: 0.2, delay: 0.3 }}
//                 >
//                   Logout
//                 </motion.span>
//               )}
//             </AnimatePresence>
//           </div>
//         </nav>
//       </div>
//     </motion.div>
//   );
// };

// export default Sidebar;



////////////////////////////////////////////////


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart2,
  Contact,
  LogOut,
  Menu,
  ShoppingBag,
  User,
  Users,
  Dumbbell,
} from "lucide-react";
import { logout } from "../../store/authSlice";

const SIDEBAR_ITEMS = [
  // { name: "Overview", icon: BarChart2, href: "/" },
  { name: "Users", icon: User, href: "/users" },
  {
    name: "Gym Accounts",
    icon: Users,
    href: "/GymAccounts",
  },
  { name: "Gym Sections", icon: Dumbbell, href: "/gymsections" },
  { name: "Subscriptions", icon: ShoppingBag, href: "/Subscriptions" },
  { name: "Contact", icon: Contact, href: "/Contact" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-[#222] p-4 flex flex-col border-r border-[#333]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-[#333] transition-colors max-w-fit text-[#3CB347]"
        >
          <Menu size={24} />
        </motion.button>
        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div 
                className="flex items-center p-4 text-sm font-medium rounded-lg transition-colors mb-2 text-white hover:bg-[#333] group"
                whileHover={{ backgroundColor: '#333' }}
              >
                <item.icon
                  size={20}
                  className="text-[#3CB347] group-hover:text-[#2ca338] min-w-[20px]"
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
          <div
            className="flex items-center p-4 text-sm font-medium rounded-lg transition-colors mb-2 cursor-pointer text-white hover:bg-[#333] group"
            onClick={handleLogout}
          >
            <LogOut 
              size={20} 
              className="text-[#3CB347] group-hover:text-[#2ca338] min-w-[20px]" 
            />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  className="ml-4 whitespace-nowrap"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;