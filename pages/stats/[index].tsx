import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { FaServer, FaMemory, FaHdd, FaDocker } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chart from "@/components/Chart";

interface SystemStats {
  cpu: number;
  memory: number;
  storage: number;
  containers: number;
  cpuInfo: {
    model: string;
    cores: number;
    speed: string;
  };
  memoryInfo: {
    total: string;
    used: string;
    free: string;
  };
  osInfo: {
    platform: string;
    version: string;
    arch: string;
  };
}

const StatDetail = () => {
  const router = useRouter();
  const { index } = router.query;
  const [stats, setStats] = useState<SystemStats | null>(null);

  useEffect(() => {
    // TODO: Implement actual API call to fetch detailed stats
    const mockStats = {
      cpu: 45,
      memory: 68,
      storage: 72,
      containers: 3,
      cpuInfo: {
        model: "Intel Xeon E5-2680 v4",
        cores: 14,
        speed: "2.4 GHz",
      },
      memoryInfo: {
        total: "32 GB",
        used: "21.76 GB",
        free: "10.24 GB",
      },
      osInfo: {
        platform: "Linux",
        version: "Ubuntu 22.04 LTS",
        arch: "x86_64",
      },
    };
    setStats(mockStats);
  }, []);

  const getStatTitle = () => {
    switch (index) {
      case "cpu":
        return "CPU Usage";
      case "memory":
        return "Memory Usage";
      case "storage":
        return "Storage Usage";
      case "containers":
        return "Container Status";
      default:
        return "System Stats";
    }
  };

  const getStatIcon = () => {
    switch (index) {
      case "cpu":
        return FaServer;
      case "memory":
        return FaMemory;
      case "storage":
        return FaHdd;
      case "containers":
        return FaDocker;
      default:
        return FaServer;
    }
  };

  if (!stats) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-1/4 mb-8"></div>
              <div className="h-64 bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-silver mb-8 animate-slideDown">
            {getStatTitle()}
          </h1>

          <div className="backdrop-blur-xl bg-black/40 p-8 rounded-2xl shadow-2xl border border-white/10">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-4 rounded-xl bg-blue-900/20 backdrop-blur-sm">
                {React.createElement(getStatIcon(), {
                  className: "w-8 h-8 text-blue-400",
                })}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Detailed Statistics
                </h2>
                <p className="text-gray-400">Real-time monitoring data</p>
              </div>
            </div>

            <Chart 
              data={{
                labels: ['1h ago', '45m ago', '30m ago', '15m ago', 'Now'],
                datasets: [{
                  label: getStatTitle(),
                  data: [65, 59, 80, 81, stats[index as keyof SystemStats] as number],
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  fill: true
                }]
              }}
              title={getStatTitle()}
              currentValue={stats[index as keyof SystemStats] as number}
              unit="%"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-black/30 rounded-xl border border-white/5">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Current Status
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Usage</span>
                    <span className="text-white font-semibold">
                      {typeof stats[index as keyof SystemStats] === "number"
                        ? `${stats[index as keyof SystemStats]}%`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2">
                    <div
                      style={{ width: `${stats[index as keyof SystemStats]}%` }}
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-black/30 rounded-xl border border-white/5">
                <h3 className="text-xl font-semibold text-white mb-4">
                  System Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Platform</span>
                    <span className="text-white">{stats.osInfo.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Version</span>
                    <span className="text-white">{stats.osInfo.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Architecture</span>
                    <span className="text-white">{stats.osInfo.arch}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StatDetail;
