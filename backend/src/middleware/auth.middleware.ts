import { Injectable, NestMiddleware } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request, Response, NextFunction } from 'express'

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private jwtService: JwtService) { }

    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization']
    

        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' })
        }

        const token = authHeader.split(' ')[1]
    console.log(token, 'token')

        try {
            const decoded =  this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            req.user = decoded
            next()
        } catch (error) {
            return res.status(401).json({ message: 'Token invalid or expired' })
        }



    }
}
