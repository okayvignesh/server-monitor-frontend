import { ContainerState, SystemStats } from "@/types/stats";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaServer,
  FaMemory,
  FaHdd,
  FaFolder,
  FaDocker,
  FaLinux,
  FaWindows,
  FaApple,
  FaClock,
} from "react-icons/fa";
import { StatCard } from "./StatCard";
import SystemInfo from "./SystemInfo";

const MainMenu = () => {
  const [loading, setLoading] = useState(false);
  const [hostActive, setHostActive] = useState(false);
  const [stats, setStats] = useState<SystemStats>({
    cpu: 0,
    containers: 0,
    cpuInfo: {
      brand: "------",
      cores: 0,
      speed: "-----",
    },
    memoryInfo: {
      total: "------",
      used: "-----",
      free: "------",
    },
    osInfo: {
      platform: "----",
      distro: "-----",
      architecture: "-----",
    },
    storageInfo: [
      {
        fs: "----",
        type: "----",
        size: 0,
        used: 0,
        use: 0,
      },
    ],
    containersInfo: [
      {
        name: "---",
        tag: "---",
        uptime: 0,
        status: "---",
      },
    ],
  });

  const [containers, setContainers] = useState<ContainerState>({
    running: [
      { id: "1", name: "nginx-web", uptime: "2d 5h" },
      { id: "2", name: "postgres-db", uptime: "1d 12h" },
      { id: "3", name: "redis-cache", uptime: "3d 8h" },
    ],
    stopped: [
      { id: "4", name: "backup-service" },
      { id: "5", name: "monitoring-agent" },
    ],
  });

  const pingServer = async () => {
    try {
      setLoading(true);
      const host = window.location.hostname;
      const pingUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ping/pingHost?host=${host}`;
      const pingResponse = await fetch(pingUrl);

      if (!pingResponse.ok) {
        throw new Error("Failed to ping the host system");
      }

      const pingData = await pingResponse.json();

      if (pingData) setHostActive(true);
    } catch (error) {
      console.error("Error pinging the host system:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSystemInfo = async () => {
    try {
      setLoading(true);
      const [
        osResponse,
        cpuResponse,
        cpuUsageResponse,
        memoryResponse,
        storageResponse,
        containersResponse
      ] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/server/info`),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cpu/info`),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cpu/usage`),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/memory/usage`),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/storage/info`),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/docker/containers`),
      ]);

      if (!osResponse.ok || !cpuResponse.ok || !memoryResponse.ok) {
        throw new Error("Failed to fetch system information");
      }

      const [osInfo, cpuInfo, cpuUsageInfo, memoryInfo, storageInfo, containersInfo] =
        await Promise.all([
          osResponse.json(),
          cpuResponse.json(),
          cpuUsageResponse.json(),
          memoryResponse.json(),
          storageResponse.json(),
          containersResponse.json()
        ]);

      setStats((prevStats) => ({
        ...prevStats,
        osInfo,
        cpuInfo,
        memoryInfo: {
          total: `${Math.floor(
            memoryInfo.usage.total / (1024 * 1024 * 1024)
          )} GB`,
          used: `${Math.floor(
            memoryInfo.usage.used / (1024 * 1024 * 1024)
          )} GB`,
          free: `${Math.floor(
            (memoryInfo.usage.total - memoryInfo.usage.used) /
              (1024 * 1024 * 1024)
          )} GB`,
        },
        storageInfo,
        containersInfo
      }));
    } catch (error) {
      console.error("Error fetching system information:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    pingServer();
  }, []);

  useEffect(() => {
    if (hostActive) {
      fetchSystemInfo();
    }
  }, [hostActive]);

  const getOSIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "linux":
        return FaLinux;
      case "windows":
        return FaWindows;
      case "darwin":
        return FaApple;
      default:
        return FaServer;
    }
  };

  return (
    <div className="bg-gradient-to-br from-black to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-silver mb-8 animate-slideDown">
          Server Monitor
        </h1>

        <SystemInfo
          loading={loading}
          stats={stats}
          getOSIcon={getOSIcon}
          pingServer={pingServer}
        />

        {/* Rest of the existing components */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* <StatCard
            loading={loading}
            icon={FaServer}
            titleKey="cpu"
            title="CPU Usage"
            value={stats.cpu}
            color="bg-blue-900/50"
          />
          <StatCard
            loading={loading}
            icon={FaMemory}
            titleKey="memory"
            title="Memory Usage"
            // value={stats.memoryInfo}
            value={0}
            color="bg-purple-900/50"
          />
          <StatCard
            loading={loading}
            icon={FaHdd}
            titleKey="storage"
            title="Storage Usage"
            value={0}
            color="bg-green-900/50"
          />
          <StatCard
            loading={loading}
            icon={FaDocker}
            titleKey="containers"
            title="Active Containers"
            value={stats.containers * 20}
            color="bg-indigo-900/50"
          /> */}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="backdrop-blur-md bg-black/30 p-6 rounded-xl shadow-lg border border-white/20 hover:border-white/40 transition-all duration-300 animate-slideInLeft">
            <h2 className="text-xl font-semibold text-silver mb-4">
              File System
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-silver">
                  Storage Overview
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {loading ? (
                    <>
                      <div className="p-3 bg-blue-900/20 rounded-lg animate-pulse">
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-white/20 rounded" />
                          <div className="space-y-2">
                            <div className="h-4 w-24 bg-white/20 rounded" />
                            <div className="h-3 w-16 bg-white/20 rounded" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-green-900/20 rounded-lg animate-pulse">
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-white/20 rounded" />
                          <div className="space-y-2">
                            <div className="h-4 w-24 bg-white/20 rounded" />
                            <div className="h-3 w-16 bg-white/20 rounded" />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-3 bg-blue-900/20 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FaHdd className="w-5 h-5 text-blue-400" />
                          <div>
                            <p className="text-silver">Total Storage</p>
                            <p className="text-gray-400 text-sm">
                              {(
                                stats.storageInfo[0].size /
                                (1024 * 1024 * 1024)
                              ).toFixed(2)}{" "}
                              GB
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-green-900/20 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FaHdd className="w-5 h-5 text-green-400" />
                          <div>
                            <p className="text-silver">Free Space</p>
                            <p className="text-gray-400 text-sm">
                              {(
                                (stats.storageInfo[0].size -
                                  stats.storageInfo[0].used) /
                                (1024 * 1024 * 1024)
                              ).toFixed(2)}{" "}
                              GB
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-silver">
                  Mount Points
                </h3>
                <div className="space-y-2">
                  {loading ? (
                    <div className="space-y-2">
                      <div className="p-3 bg-purple-900/20 rounded-lg animate-pulse">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-5 h-5 bg-white/20 rounded" />
                            <div className="space-y-2">
                              <div className="h-4 w-32 bg-white/20 rounded" />
                              <div className="h-3 w-24 bg-white/20 rounded" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-4 w-16 bg-white/20 rounded" />
                            <div className="h-3 w-24 bg-white/20 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    stats.storageInfo.map((disk, index) => (
                      <div
                        key={index}
                        className="relative flex items-center justify-between p-3 bg-purple-900/20 rounded-lg overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-purple-500/10" style={{ width: `${disk.use}%` }} />
                        <div className="relative flex items-center space-x-3">
                          <FaHdd className="w-5 h-5 text-purple-400" />
                          <div>
                            <span className="text-silver">{disk.fs}</span>
                            <p className="text-gray-400 text-sm">{disk.type}</p>
                          </div>
                        </div>
                        <div className="relative text-right">
                          <p className="text-silver">
                            {disk.use.toFixed(1)}% Used
                          </p>
                          <p className="text-gray-400 text-sm">
                            {(disk.used / (1024 * 1024 * 1024)).toFixed(2)} GB /{" "}
                            {(disk.size / (1024 * 1024 * 1024)).toFixed(2)} GB
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-md bg-black/30 p-6 rounded-xl shadow-lg border border-white/20 hover:border-white/40 transition-all duration-300 animate-slideInRight">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-silver flex items-center gap-2">
                <FaDocker className="w-5 h-5 text-blue-400" />
                Docker Containers
              </h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">
                  {loading ? (
                    <div className="h-4 w-16 bg-white/20 rounded animate-pulse" />
                  ) : (
                    `${stats.containersInfo.filter(c => c.status === "running").length} Running`
                  )}
                </span>
                <span className="px-3 py-1 bg-red-900/30 text-red-400 rounded-full text-sm">
                  {loading ? (
                    <div className="h-4 w-16 bg-white/20 rounded animate-pulse" />
                  ) : (
                    `${stats.containersInfo.filter(c => c.status === "exited").length} Stopped`
                  )}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-silver mb-3 flex items-center gap-2">
                  Running Containers
                </h3>
                <div className="space-y-2">
                  {loading ? (
                    <div className="space-y-2">
                      <div className="p-3 bg-green-900/20 rounded-lg animate-pulse">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-5 h-5 bg-white/20 rounded" />
                            <div className="space-y-2">
                              <div className="h-4 w-32 bg-white/20 rounded" />
                              <div className="h-3 w-24 bg-white/20 rounded" />
                            </div>
                          </div>
                          <div className="h-4 w-24 bg-white/20 rounded" />
                        </div>
                      </div>
                    </div>
                  ) : stats.containersInfo.filter((container) => container.status === "running").length === 0 ? (
                    <div className="p-3 bg-green-900/20 rounded-lg">
                      <p className="text-gray-400 text-center">No running containers available</p>
                    </div>
                  ) : (
                    stats.containersInfo
                      .filter((container) => container.status === "running")
                      .map((container) => (
                        <div
                          key={container.name}
                          className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg hover:bg-green-900/30 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <FaDocker className="w-5 h-5 text-green-400" />
                            <div>
                              <span className="text-silver font-medium">{container.name}</span>
                              <p className="text-gray-400 text-sm">{container.tag}</p>
                            </div>
                          </div>
                          <span className="text-gray-400 text-sm bg-green-900/30 px-2 py-1 rounded flex items-center gap-1">
                            <FaClock className="w-3 h-3" />
                            Uptime: {Math.floor(container.uptime / (60 * 60))}h {Math.floor((container.uptime % (60 * 60)) / 60)}m
                          </span>
                        </div>
                      ))
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-silver mb-3 flex items-center gap-2">
                  Stopped Containers
                </h3>
                <div className="space-y-2">
                  {loading ? (
                    <div className="space-y-2">
                      <div className="p-3 bg-red-900/20 rounded-lg animate-pulse">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-5 h-5 bg-white/20 rounded" />
                            <div className="space-y-2">
                              <div className="h-4 w-32 bg-white/20 rounded" />
                              <div className="h-3 w-24 bg-white/20 rounded" />
                            </div>
                          </div>
                          <div className="h-4 w-16 bg-white/20 rounded" />
                        </div>
                      </div>
                    </div>
                  ) : stats.containersInfo.filter((container) => container.status === "exited").length === 0 ? (
                    <div className="p-3 bg-red-900/20 rounded-lg">
                      <p className="text-gray-400 text-center">No stopped containers available</p>
                    </div>
                  ) : (
                    stats.containersInfo
                      .filter((container) => container.status === "exited")
                      .map((container) => (
                        <div
                          key={container.name}
                          className="flex items-center justify-between p-3 bg-red-900/20 rounded-lg hover:bg-red-900/30 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <FaDocker className="w-5 h-5 text-red-400" />
                            <div>
                              <span className="text-silver font-medium">{container.name}</span>
                              <p className="text-gray-400 text-sm">{container.tag}</p>
                            </div>
                          </div>
                          <span className="text-gray-400 text-sm bg-red-900/30 px-2 py-1 rounded">
                            Stopped
                          </span>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
