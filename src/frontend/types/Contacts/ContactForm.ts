export interface ContactForm {
    email: string;
    name: string;
    phone?: string;
    comment?: string;
    policy: boolean;
}

export type ContactFormErrors = {
    [key in keyof ContactForm]: [{ message: string }];
};
