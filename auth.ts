import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';

// =============================================
// Configuration: Switch between TEST and DATABASE mode
// Set USE_DATABASE = true when POSTGRES_URL is configured
// =============================================
const USE_DATABASE = false;

// =============================================
// TEST MODE: Hardcoded users (no database needed)
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

// =============================================
// Get User Function (switches based on USE_DATABASE)
// =============================================
async function getUser(email: string): Promise<User | undefined> {
    if (USE_DATABASE) {
        // DATABASE MODE: Fetch from PostgreSQL
        const postgres = await import('postgres');
        const sql = postgres.default(process.env.POSTGRES_URL!, { ssl: 'require' });
        try {
            const users = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
            return users[0];
        } catch (error) {
            console.error('Failed to fetch user:', error);
            throw new Error('Failed to fetch user.');
        }
    } else {
        // TEST MODE: Return from hardcoded users
        return testUsers.find((user) => user.email === email);
    }
}

// =============================================
// NextAuth Configuration
// =============================================
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

                    // Check password
                    let passwordsMatch: boolean;
                    if (USE_DATABASE) {
                        // DATABASE: Compare hashed password
                        passwordsMatch = await bcrypt.compare(password, user.password);
                    } else {
                        // TEST: Plain text comparison
                        passwordsMatch = password === user.password;
                    }

                    if (passwordsMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});
