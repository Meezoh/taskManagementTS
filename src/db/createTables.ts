import { userTable } from '../model/userTable';

export const createTables = async () => {
    await userTable();
}