import type { StrapiArrayResponse } from '~/types/strapi/strapiArrayResponse';
import type { GalleryListItem } from '~/types/Gallery/GalleryListItem';

export const useSouvenirsApi = () => {
    const getSouvenirs = async () => {
        const { data } = await fetchApi<StrapiArrayResponse<GalleryListItem>>(`souvenirs-list?populate=*`, {
            method: 'get',
        });

        return data || [];
    };

    return {
        getSouvenirs,
    };
};
