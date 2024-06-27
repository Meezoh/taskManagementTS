import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const myTokenKey: any = process.env.JWT_TOKEN_KEY;

export const generateJWToken = (userId: number, email: string) => {
    try {
        const user = {
            userId,
            email
        };

        const token = jwt.sign(user, myTokenKey, {
            expiresIn: '30d',
          });
        return token;
    } catch (error: any) {
        console.error('Error generating JWToken:', error.message);
        return error.message;
    }
}