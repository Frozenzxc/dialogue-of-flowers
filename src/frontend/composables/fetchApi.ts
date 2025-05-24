import type { FetchOptions } from 'ofetch';
import { $fetch } from 'ofetch';

export const fetchApi = async <DataT = any>(url: string, options: FetchOptions = {}) => {
    const runtimeConfig = useRuntimeConfig();

    const opts: FetchOptions = (({ headers: _, ...opts }) => opts)(options);
    const baseURL = `${runtimeConfig.public.strapiApiUrl}/api/`;

    return $fetch(baseURL + url, {
        baseURL,
        credentials: 'include',
        ...opts,
    }) as Promise<DataT>;
};
