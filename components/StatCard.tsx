import { StatCardProps } from "@/types/stats";
import Link from "next/link";

export const StatCard = ({
  icon: Icon,
  titleKey,
  title,
  value,
  color,
  loading,
}: StatCardProps) => (
  <Link href={`/stats/${titleKey}`}>
    <div className="group backdrop-blur-xl bg-black/20 p-6 rounded-xl shadow-lg border border-white/20 hover:border-white/10 transition-all duration-500 animate-fadeIn cursor-pointer hover:scale-[1.02] hover:shadow-2xl">
      {loading ? (
        <div className="animate-pulse">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${color} bg-opacity-50`}>
              <div className="w-6 h-6 bg-white/20 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-24 bg-white/20 rounded" />
              <div className="h-7 w-16 bg-white/20 rounded" />
            </div>
          </div>
          <div className="mt-4 w-full bg-white/5 rounded-full h-2">
            <div className="h-2 w-1/2 bg-white/20 rounded-full" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center space-x-4">
            <div
              className={`p-3 rounded-lg ${color} bg-opacity-90 backdrop-blur-md group-hover:bg-opacity-100 transition-all duration-300`}
            >
              <Icon className="w-6 h-6 text-white/90 group-hover:text-white transition-colors duration-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-silver group-hover:text-white transition-colors duration-300">
                {title}
              </h3>
              <p className="text-2xl font-bold text-white/90 group-hover:text-white transition-colors duration-300">
                {value}%
              </p>
            </div>
          </div>
          <div className="mt-4 w-full bg-white/5 rounded-full h-2 overflow-hidden">
            <div
              style={{ width: `${value}%` }}
              className="h-2 rounded-full bg-gradient-to-r from-white/40 to-white/70 animate-progress group-hover:from-white/50 group-hover:to-white/80 transition-all duration-300"
            />
          </div>
        </>
      )}
    </div>
  </Link>
);
