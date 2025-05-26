import type { ContactForm } from '~/types/Contacts/ContactForm';

export const useContactFormApi = () => {
    const createContactForm = async (data: ContactForm) => {
        await fetchApi('contact-forms', {
            method: 'post',
            body: { data },
        });
    };

    return {
        createContactForm,
    };
};
