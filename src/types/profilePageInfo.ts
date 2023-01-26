import { Database } from './database.types';

export type Db = Database['public']['Tables'];

export type Users = Db['profile']['Row'];

export type FullNames = Db['profile']['Row']['fullname'];
