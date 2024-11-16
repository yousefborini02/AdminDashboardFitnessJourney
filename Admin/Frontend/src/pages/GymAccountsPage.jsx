// import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
// import { motion } from "framer-motion";

// import Header from "../components/common/Header";
// import StatCard from "../components/common/StatCard";

// import GymAccounts from "../components/GymAccounts/GymAccounts";

// const userStats = {
//   totalUsers: 152845,
//   newUsersToday: 243,
//   activeUsers: 98520,
//   churnRate: "2.4%",
// };

// const GymAccountsPage = () => {
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

//         <GymAccounts />

        
//       </main>
//     </div>
//   );
// };
// export default GymAccountsPage;




import { useState, useEffect } from "react";
import { Building, CheckCircle, Users2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import GymAccounts from "../components/GymAccounts/GymAccounts";

const GymAccountsPage = () => {
  const [gymStats, setGymStats] = useState({
    totalGymAccounts: 0,
    activeGymAccounts: 0,
    pendingGymAccounts: 0,
    inactiveRate: "0%"
  });

  useEffect(() => {
    fetchGymStats();
  }, []);

  const fetchGymStats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/gym-accounts");
      const accounts = response.data;
      
      const totalAccounts = accounts.length;
      const activeAccounts = accounts.filter(account => account.isApproved).length;
      const pendingAccounts = totalAccounts - activeAccounts;
      const inactiveRate = totalAccounts > 0 
        ? ((pendingAccounts / totalAccounts) * 100).toFixed(1) + "%" 
        : "0%";

      setGymStats({
        totalGymAccounts: totalAccounts,
        activeGymAccounts: activeAccounts,
        pendingGymAccounts: pendingAccounts,
        inactiveRate: inactiveRate
      });
    } catch (error) {
      console.error("Error fetching gym stats:", error);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Gym Accounts" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Gym Accounts"
            icon={Building}
            value={gymStats.totalGymAccounts.toLocaleString()}
            color="#3CB347"
          />
          <StatCard
            name="Active Gyms"
            icon={CheckCircle}
            value={gymStats.activeGymAccounts.toLocaleString()}
            color="#3CB347"
          />
          <StatCard
            name="Pending Approval"
            icon={XCircle}
            value={gymStats.pendingGymAccounts.toLocaleString()}
            color="#333333"
          />
          <StatCard
            name="Inactive Rate"
            icon={Users2}
            value={gymStats.inactiveRate}
            color="#333333"
          />
        </motion.div>

        <GymAccounts onStatusChange={fetchGymStats} />
      </main>
    </div>
  );
};

export default GymAccountsPage;