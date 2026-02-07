import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private jwtService: JwtService
    ) { }

    @Post('create-user')
    async createUser(@Body() body: CreateUserDto) {

        try {
            const { email, password } = body;
            const SaltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, SaltRounds);
            const user = await this.authService.createUser({ email, password: hashedPassword });
            return { message: 'user created successfully', id: user.id, email: user.email };
        } catch (error) {

            if (error.code === 'P2002') {
                return { message: 'Email already exists' };
            }
            return { message: 'Internal server error' };
        }

    }


    @Post('sign-in')
    async signIn(@Body() body: CreateUserDto) {
        const { email, password } = body;
        const user = await this.authService.signIn({ email, password });
        if (!user) {
            return { message: 'Invalid email or password', status: 401 };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { message: 'Invalid email or password', status: 401 };
        }

        return { message: 'Sign-in successful', id: user.id, email: user.email, access_token: await this.jwtService.signAsync({ email: user.email }), status:200 };
    }

}
