export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          birthday: string | null
          created_at: string | null
          email: string
          fullname: string | null
          id: string
          phonenumber: string | null
        }
        Insert: {
          birthday?: string | null
          created_at?: string | null
          email: string
          fullname?: string | null
          id: string
          phonenumber?: string | null
        }
        Update: {
          birthday?: string | null
          created_at?: string | null
          email?: string
          fullname?: string | null
          id?: string
          phonenumber?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
