export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Company {
    phone: string;
    whatsapp: string;
    email_1: string;
    email_2?: string;
    address: string;
    maps_embed_url?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    company: Company;
    app_url: string;
};
