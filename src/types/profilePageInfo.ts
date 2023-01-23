import { Database } from './database.types';

export type Db = Database['public']['Tables'];

export type Users = Db['users']['Row'];

export type FullNames = Db['users']['Row']['fullname'];