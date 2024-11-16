// import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
// import { motion } from "framer-motion";

// import Header from "../components/common/Header";
// import StatCard from "../components/common/StatCard";
// import Users from "../components/Users/Users";


// const userStats = {
//   totalUsers: 152845,
//   newUsersToday: 243,
//   activeUsers: 98520,
//   churnRate: "2.4%",
// };

// const UsersPage = () => {
//   return (
//     <div className="flex-1 overflow-auto relative z-10">
//       <Header title="Users" />

//       <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
//         {/* STATS */}
//         <motion.div
//           className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <StatCard
//             name="Total Users"
//             icon={UsersIcon}
//             value={userStats.totalUsers.toLocaleString()}
//             color="#6366F1"
//           />
//           <StatCard
//             name="New Users Today"
//             icon={UserPlus}
//             value={userStats.newUsersToday}
//             color="#10B981"
//           />
//           <StatCard
//             name="Active Users"
//             icon={UserCheck}
//             value={userStats.activeUsers.toLocaleString()}
//             color="#F59E0B"
//           />
//           <StatCard
//             name="Churn Rate"
//             icon={UserX}
//             value={userStats.churnRate}
//             color="#EF4444"
//           />
//         </motion.div>

//         <Users />

        
//       </main>
//     </div>
//   );
// };
// export default UsersPage;




import { useState, useEffect } from "react";
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import Users from "../components/Users/Users";

const UsersPage = () => {
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    inactiveRate: "0%"
  });

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      const users = response.data;
      
      const totalUsers = users.length;
      const activeUsers = users.filter(user => user.isActive).length;
      const inactiveUsers = totalUsers - activeUsers;
      const inactiveRate = totalUsers > 0 
        ? ((inactiveUsers / totalUsers) * 100).toFixed(1) + "%" 
        : "0%";

      setUserStats({
        totalUsers,
        activeUsers,
        inactiveUsers,
        inactiveRate
      });
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Users" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Users"
            icon={UsersIcon}
            value={userStats.totalUsers.toLocaleString()}
            color="#3CB347"
          />
          <StatCard
            name="Active Users"
            icon={UserCheck}
            value={userStats.activeUsers.toLocaleString()}
            color="#3CB347"
          />
          <StatCard
            name="Inactive Users"
            icon={UserX}
            value={userStats.inactiveUsers.toLocaleString()}
            color="#333333"
          />
          <StatCard
            name="Inactive Rate"
            icon={UserPlus}
            value={userStats.inactiveRate}
            color="#333333"
          />
        </motion.div>

        <Users onStatusChange={fetchUserStats} />
      </main>
    </div>
  );
};

export default UsersPage;