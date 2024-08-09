import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: 'secret', // Replace with your secret
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [JwtModule], // Make sure JwtModule is exported
})
export class JwtConfigModule {}
