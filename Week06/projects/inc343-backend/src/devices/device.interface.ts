export interface Device {
  id: string;
  name: string;
  type: 'sensor' | 'actuator';
  value: number;
  status: 'ONLINE' | 'OFFLINE';
}
