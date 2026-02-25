import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BarChart3, Zap, Recycle, Gift, User } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// -------------------- MOCK API LAYER --------------------
// Replace with real backend endpoints (Node + Firebase)
const fetchDashboardData = async () => {
  return {
    todayEnergy: 2.4,
    savings: 85,
    waste: 3.2,
    gas: 1.8,
    co2: 4.5,
    credits: 1240,
  };
};

const fetchEnergyHistory = async () => {
  return [
    { day: "Mon", kwh: 1.2 },
    { day: "Tue", kwh: 2.1 },
    { day: "Wed", kwh: 1.8 },
    { day: "Thu", kwh: 2.6 },
    { day: "Fri", kwh: 2.4 },
  ];
};

export default function EcoPulseApp() {
  const [tab, setTab] = useState("dashboard");
  const [dashboard, setDashboard] = useState(null);
  const [energyHistory, setEnergyHistory] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await fetchDashboardData();
      const history = await fetchEnergyHistory();
      setDashboard(data);
      setEnergyHistory(history);
    }
    load();
  }, []);

  const NavButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setTab(id)}
      className={`flex flex-col items-center text-xs ${
        tab === id ? "text-emerald-400" : "text-slate-400"
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        Loading EcoPulse...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="flex-1 p-4">
        {tab === "dashboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-bold mb-4 text-emerald-400">
              System Overview
            </h1>

            <Card className="bg-slate-800 rounded-2xl shadow-xl mb-4">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-extrabold">
                  ⚡ {dashboard.todayEnergy} kWh
                </div>
                <div className="text-slate-400 mt-2">Generated Today</div>
                <div className="mt-2 text-emerald-400 font-semibold">
                  ₹{dashboard.savings} Saved
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-3">
              <MetricCard label="Waste" value={`${dashboard.waste} kg`} />
              <MetricCard label="Gas" value={`${dashboard.gas} m³`} />
              <MetricCard label="CO₂" value={`${dashboard.co2} kg`} />
            </div>
          </motion.div>
        )}

        {tab === "waste" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-bold mb-4 text-emerald-400">
              Add Waste Entry
            </h1>
            <Button
              className="w-full bg-emerald-500 hover:bg-emerald-600 rounded-2xl p-4 text-lg"
              onClick={() => alert("Waste entry API call")}
            >
              + Log 1kg Organic Waste
            </Button>
          </motion.div>
        )}

        {tab === "energy" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-bold mb-4 text-emerald-400">
              Energy Analytics
            </h1>
            <Card className="bg-slate-800 rounded-2xl p-4">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={energyHistory}>
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Line type="monotone" dataKey="kwh" stroke="#10B981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        )}

        {tab === "credits" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-bold mb-4 text-emerald-400">
              Green Credits Wallet
            </h1>
            <Card className="bg-slate-800 rounded-2xl mb-4">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold">
                  {dashboard.credits} GC
                </div>
                <div className="text-slate-400">Available Balance</div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {tab === "profile" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-bold mb-4 text-emerald-400">
              Device & Account
            </h1>
            <Card className="bg-slate-800 rounded-2xl">
              <CardContent className="p-6">
                <div>Device Status: Online</div>
                <div>Subscription: Premium</div>
                <div>Firmware: v1.0.2</div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      <div className="bg-slate-800 p-3 flex justify-around rounded-t-2xl">
        <NavButton id="dashboard" icon={BarChart3} label="Home" />
        <NavButton id="waste" icon={Recycle} label="Waste" />
        <NavButton id="energy" icon={Zap} label="Energy" />
        <NavButton id="credits" icon={Gift} label="Credits" />
        <NavButton id="profile" icon={User} label="Profile" />
      </div>
    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <Card className="bg-slate-800 rounded-2xl">
      <CardContent className="p-4 text-center">
        <div className="text-lg font-bold">{value}</div>
        <div className="text-xs text-slate-400">{label}</div>
      </CardContent>
    </Card>
  );
}
