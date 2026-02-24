import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { DevicesService } from './devices.service';

@Controller('devices')
export class DevicesController {
  constructor(private readonly deviceService: DevicesService) {}

  @Get()
  getAll() {
    return this.deviceService.findAll();
  }

  @Patch(':id/value')
  update(@Param('id') id: string, @Body('value') value: number) {
    return this.deviceService.updateValue(id, value);
  }
}
