import { Injectable, NotFoundException } from '@nestjs/common';
import { Device } from './device.interface';
import { MonitoringGateway } from '../monitoring/monitoring.gateway';

@Injectable()
export class DevicesService {
  constructor(private readonly gateway: MonitoringGateway) {}

  private devices: Device[] = [
    {
      id: '1',
      name: 'Light Bulb',
      type: 'actuator',
      value: 0,
      status: 'ONLINE',
    },
    {
      id: '2',
      name: 'Temperature Sensor',
      type: 'sensor',
      value: 25,
      status: 'ONLINE',
    },
    {
      id: '3',
      name: 'Smart Fan',
      type: 'actuator',
      value: 50,
      status: 'OFFLINE',
    },
  ];

  findAll(): Device[] {
    return this.devices;
  }

  updateValue(id: string, value: number): Device {
    const device = this.devices.find((d) => d.id === id);
    if (!device) throw new NotFoundException('Device not found');

    device.value = value;

    // PUSH EVENT TO WEBSOCKETS
    this.gateway.sendUpdate(device);

    return device;
  }
}
