export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            demo_bookings: {
                Row: {
                    id: string
                    created_at: string
                    full_name: string
                    email: string
                    company_name: string
                    job_title: string
                    use_case: string
                    status: string
                }
                Insert: {
                    id?: string
                    created_at?: string
                    full_name: string
                    email: string
                    company_name: string
                    job_title: string
                    use_case: string
                    status?: string
                }
                Update: {
                    id?: string
                    created_at?: string
                    full_name?: string
                    email?: string
                    company_name?: string
                    job_title?: string
                    use_case?: string
                    status?: string
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
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
