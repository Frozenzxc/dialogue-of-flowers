import type { Pagination } from '~/types/strapi/Pagination';

export type StrapiArrayResponse<T> = {
    data: T[] | null;
    meta?: {
        pagination?: Pagination;
    };
};
