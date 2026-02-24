import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesModule } from './devices/devices.module';
import { MonitoringModule } from './monitoring/monitoring.module';

@Module({
  imports: [DevicesModule, MonitoringModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
