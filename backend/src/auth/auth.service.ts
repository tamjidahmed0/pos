import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';




@Injectable()
export class AuthService {

    constructor(
        private readonly prismaService: PrismaService,
     
    ) { }

    async createUser({ email, password }: CreateUserDto) {
        return await this.prismaService.user.create({
            data: {
                email,
                password
            }
        })

    }

    async signIn({ email, password }: CreateUserDto) {
        return await this.prismaService.user.findUnique({
            where: {
                email
            }
        })
    }


}
