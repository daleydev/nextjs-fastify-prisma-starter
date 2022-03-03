import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async lookupUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async signup(email: string, password: string): Promise<User> {
    const hash = await argon.hash(password);

    const user = await this.prisma.user.create({
      data: {
        email,
        hash,
      },
    });

    return user;
  }

  async signin(email: string, password: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    const verified = await argon.verify(user.hash, password);

    return verified;
  }
}
