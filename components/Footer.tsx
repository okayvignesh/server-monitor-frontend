import { useState, useEffect } from "react";
import { FaClock, FaMapMarkerAlt, FaServer, FaHistory } from "react-icons/fa";

interface ServerInfo {
  location: string;
  timezone: string;
  lastAccessed: string;
  uptime: string;
}

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const [serverInfo, setServerInfo] = useState<ServerInfo>({
    location: "US East",
    timezone: "UTC-4",
    lastAccessed: new Date().toLocaleString(),
    uptime: "3d 14h 22m",
  });

  useEffect(() => {
    fetchLocationDetails();
    fetchUptimeDetails();
  }, []);

  const fetchLocationDetails = async () => {
    setLoading(true);
    try {
      const locationUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/server/location`;
      const locationResponse = await fetch(locationUrl);

      const locationData = await locationResponse.json();
      setServerInfo({
        ...serverInfo,
        location:
          locationData.city +
          " " +
          locationData.region +
          " " +
          locationData.country,
      });
    } catch (error) {
      console.error(`Error while fetching Location details, ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchUptimeDetails = async () => {
    setLoading(true);
    try {
      const uptimeUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/server/uptime`;
      const uptimeResponse = await fetch(uptimeUrl);

      const uptimeData = await uptimeResponse.json();
      setServerInfo({
        ...serverInfo,
        uptime: uptimeData.uptime,
        timezone: uptimeData.timezone,
      });
    } catch (error) {
      console.error(`Error while fetching Location details, ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const InfoItem = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: string;
  }) => (
    <div className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300">
      <Icon className="w-4 h-4" />
      <span className="text-sm">{label}:</span>
      <span className="text-sm font-medium">
        {loading ? (
          <span className="inline-block w-16 h-4 bg-gray-700 animate-pulse rounded"></span>
        ) : (
          value
        )}
      </span>
    </div>
  );

  return (
    <footer className="w-full backdrop-blur-xl bg-black/20 border-t border-white/20 p-4">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-wrap gap-6">
          <InfoItem
            icon={FaMapMarkerAlt}
            label="Location"
            value={serverInfo.location}
          />
          <InfoItem
            icon={FaClock}
            label="Timezone"
            value={serverInfo.timezone}
          />
          {/* <InfoItem icon={FaHistory} label="Last Accessed" value={serverInfo.lastAccessed} /> */}
          <InfoItem icon={FaServer} label="Uptime" value={serverInfo.uptime} />
        </div>
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} Server Monitor
        </div>
      </div>
    </footer>
  );
};

export default Footer;
