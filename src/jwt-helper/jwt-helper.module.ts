import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/users/user.module';
import { JwtHelperService } from './jwt-helper.service';
@Module({
  imports: [JwtModule.register({}), UserModule],
  providers: [JwtHelperService],
  exports: [JwtHelperService],
})
export class JwtHelperModule {}
