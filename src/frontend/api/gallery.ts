import type { StrapiArrayResponse } from '~/types/strapi/strapiArrayResponse';
import type { GalleryListItem } from '~/types/Gallery/GalleryListItem';

export const useGalleryApi = () => {
    const getGallery = async () => {
        const { data } = await fetchApi<StrapiArrayResponse<GalleryListItem>>(`gallery-list?populate=*`, {
            method: 'get',
        });

        return data || [];
    };

    return {
        getGallery,
    };
};
