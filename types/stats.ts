export interface SystemStats {
  cpu: number;
  containers: number;
  cpuInfo: {
    brand: string;
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
    distro: string;
    architecture: string;
  };
  storageInfo: [
    {
      fs: string;
      type: string;
      size: number;
      used: number;
      use: number;
    }
  ];
  containersInfo: [
    {
      name: string;
      tag: string;
      uptime: number;
      status: string;
    }
  ];
}

export interface Container {
  id: string;
  name: string;
  uptime?: string;
}

export interface ContainerState {
  running: Container[];
  stopped: Container[];
}

export interface StatCardProps {
  icon: any;
  title: string;
  value: number;
  color: string;
  titleKey: string;
  loading: boolean;
}
