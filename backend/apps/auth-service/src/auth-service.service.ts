import { Injectable, Inject, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../libs/prisma/src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDetails, RegisterDetails } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {
    console.log('AuthService created, prisma:', !!prisma, 'jwtService:', !!jwtService);
  }
  async register(registerBody: RegisterDetails) {
    const { name, email, password } = registerBody;
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role:user.role,
      createdAt:user.createdAt,
    }
  }

  async login(loginBody: LoginDetails) {
    const { email, password } = loginBody;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const jwtToken = this.jwtService.sign({ id: user.id,email,role:user.role });
    return {
      jwtToken,
      id: user.id,
      name: user.name,
      email: user.email,
      role:user.role,
    }
   
  }
}
