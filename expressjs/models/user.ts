import bcrypt from 'bcrypt';

export interface User {
    id: number;
    username: string;
    passwordHash: string;
}

const user: User = {
    id: 1,
    username: 'admin',
    passwordHash: bcrypt.hashSync('password123', 10)
};

export default user;
