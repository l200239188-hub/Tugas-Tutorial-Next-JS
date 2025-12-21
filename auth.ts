import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';

// =============================================
// TEST MODE: Hardcoded users (no database needed)
// For production with database, use bcryptjs (Edge compatible)
// =============================================
const testUsers = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'User',
        email: 'user@nextmail.com',
        password: '123456',
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Ihsan',
        email: 'ihsanbe05@gmail.com',
        password: 'Ponorog0?',
    },
];

type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

async function getUser(email: string): Promise<User | undefined> {
    return testUsers.find((user) => user.email === email);
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;

                    // Plain text comparison for test mode
                    if (password === user.password) {
                        return user;
                    }
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});
