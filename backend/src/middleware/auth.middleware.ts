import { Injectable, NestMiddleware } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request, Response, NextFunction } from 'express'
import { PrismaService } from 'src/prisma/prisma.service'

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,

    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization']


        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' })
        }

        const token = authHeader.split(' ')[1]


        try {
            const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            const user = await this.prisma.user.findUnique({
                where: { email: decoded.email },
            });

            if (!user) {
                return res.status(401).json({ message: 'Invalid Credentials' })
            }


            console.log(decoded)
            req.user = user
            next()
        } catch (error) {
            return res.status(401).json({ message: 'Token invalid or expired' })
        }



    }
}
