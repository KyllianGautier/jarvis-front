interface UserDevice {
  id: number;

  publicIp: string;
  type: string;
  verified: boolean;
  verificationDate: Date;
  creationDate: Date;
  connections: DeviceConnection[];
}
