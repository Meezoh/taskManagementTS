import { userTable } from '../model/userTable';
import { verifyUserTable } from '../model/verifyUserTable';

export const createTables = async () => {
    await userTable();
    await verifyUserTable();
}