import type { FetchOptions } from 'ofetch';
import { $fetch } from 'ofetch';

/**
 * Базовый URL Strapi.
 * На сервере (SSR/пререндер) — внутренний адрес из runtimeConfig.strapiInternalUrl,
 * в браузере — публичный (обычно /cms за nginx).
 */
const apiBase = () => {
    const config = useRuntimeConfig();
    return import.meta.server
        ? `${config.strapiInternalUrl}/api/`
        : `${config.public.strapiApiUrl}/api/`;
};

export const fetchApi = async <DataT = any>(url: string, options: FetchOptions = {}) => {
    const opts: FetchOptions = (({ headers: _, ...opts }) => opts)(options);
    const baseURL = apiBase();

    return $fetch(baseURL + url, {
        baseURL,
        credentials: 'include',
        ...opts,
    }) as Promise<DataT>;
};
