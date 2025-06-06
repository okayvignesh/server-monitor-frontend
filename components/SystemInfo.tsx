import React from "react";
import { FaServer, FaMemory, FaHdd } from "react-icons/fa";
import { SystemStats } from "@/types/stats";

interface SystemInfoProps {
  loading: boolean;
  stats: SystemStats;
  getOSIcon: (platform: string) => React.ComponentType<{ className?: string }>;
  pingServer: any;
}

function SystemInfo({
  loading,
  stats,
  getOSIcon,
  pingServer,
}: SystemInfoProps) {
  return (
    <div className="my-12 backdrop-blur-xl bg-black/40 p-8 rounded-2xl shadow-2xl border border-white/10 hover:border-white/30 transition-all duration-500">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
        <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
        System Information
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-6 bg-black/30 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-indigo-500/20 backdrop-blur-sm">
                  {loading ? (
                    <div className="w-7 h-7 bg-white/20 rounded animate-pulse" />
                  ) : (
                    <FaServer className="w-7 h-7 text-indigo-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Server Status
                  </h3>
                  <div>
                    {loading ? (
                      <div className="h-5 w-32 bg-white/20 rounded animate-pulse" />
                    ) : (
                      <p className="text-gray-300">System is operational</p>
                    )}
                  </div>
                </div>
              </div>
              {!loading && (
                <button
                  onClick={pingServer}
                  id="pingButton"
                  className="px-5 cursor-pointer py-2.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-indigo-500/20 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span id="pingStatus" className="text-indigo-400">
                    Ping Server
                  </span>
                  <span
                    id="pingDot"
                    className="w-2 h-2 bg-indigo-400 rounded-full block"
                  ></span>
                </button>
              )}
            </div>
          </div>

          <div className="p-6 bg-black/30 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-blue-500/20 backdrop-blur-sm">
                {loading ? (
                  <div className="w-7 h-7 bg-white/20 rounded animate-pulse" />
                ) : (
                  React.createElement(getOSIcon(stats.osInfo.platform), {
                    className: "w-7 h-7 text-blue-400",
                  })
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Operating System
                </h3>
                <div className="space-y-1">
                  {loading ? (
                    <>
                      <div className="h-5 w-32 bg-white/20 rounded animate-pulse" />
                      <div className="h-4 w-24 bg-white/20 rounded animate-pulse" />
                    </>
                  ) : (
                    <>
                      <p className="text-gray-300">{stats.osInfo.distro}</p>
                      <p className="text-gray-400 text-sm">
                        Architecture: {stats.osInfo.architecture}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-black/30 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-purple-500/20 backdrop-blur-sm">
                {loading ? (
                  <div className="w-7 h-7 bg-white/20 rounded animate-pulse" />
                ) : (
                  <FaServer className="w-7 h-7 text-purple-400" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">
                  CPU Information
                </h3>
                <div className="space-y-1">
                  {loading ? (
                    <>
                      <div className="h-5 w-32 bg-white/20 rounded animate-pulse" />
                      <div className="h-4 w-24 bg-white/20 rounded animate-pulse" />
                    </>
                  ) : (
                    <>
                      <p className="text-gray-300">{stats.cpuInfo.brand}</p>
                      <p className="text-gray-400 text-sm">
                        {stats.cpuInfo.cores} Cores @ {stats.cpuInfo.speed} GHz
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-black/30 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-green-500/20 backdrop-blur-sm">
                {loading ? (
                  <div className="w-7 h-7 bg-white/20 rounded animate-pulse" />
                ) : (
                  <FaMemory className="w-7 h-7 text-green-400" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Memory Information
                </h3>
                <div className="space-y-1">
                  {loading ? (
                    <>
                      <div className="h-5 w-32 bg-white/20 rounded animate-pulse" />
                      <div className="h-4 w-24 bg-white/20 rounded animate-pulse" />
                    </>
                  ) : (
                    <>
                      <p className="text-gray-300">
                        Total: {stats.memoryInfo.total}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Used: {stats.memoryInfo.used} | Free:{" "}
                        {stats.memoryInfo.free}
                      </p>
                      <div className="w-full h-2 bg-gray-700 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-green-400 via-green-500 to-green-600"
                          style={{
                            width: `${
                              (parseInt(stats.memoryInfo.used) /
                                parseInt(stats.memoryInfo.total)) *
                              100
                            }%`,
                            boxShadow: "0 0 10px rgba(34, 197, 94, 0.3)",
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-black/30 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-yellow-500/20 backdrop-blur-sm">
                {loading ? (
                  <div className="w-7 h-7 bg-white/20 rounded animate-pulse" />
                ) : (
                  <FaHdd className="w-7 h-7 text-yellow-400" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Storage Information
                </h3>
                <div className="space-y-3">
                  {loading ? (
                    <>
                      <div className="h-5 w-32 bg-white/20 rounded animate-pulse" />
                      <div className="h-4 w-24 bg-white/20 rounded animate-pulse" />
                    </>
                  ) : (
                    stats.storageInfo?.map((disk, index) => (
                      <div key={index} className="border-t border-white/5 pt-2">
                        <p className="text-gray-300">
                          {disk.fs} ({disk.type})
                        </p>
                        <p className="text-gray-400 text-sm">
                          Total: {(disk.size / (1024 * 1024 * 1024)).toFixed(2)}{" "}
                          GB | Used:{" "}
                          {(disk.used / (1024 * 1024 * 1024)).toFixed(2)} GB (
                          {disk.use.toFixed(1)}%)
                        </p>
                        <div className="w-full h-2 bg-gray-700 rounded-full mt-2 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
                            style={{
                              width: `${disk.use}%`,
                              boxShadow: "0 0 10px rgba(234, 179, 8, 0.3)",
                            }}
                          />
                        </div>
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
}

export default SystemInfo;
