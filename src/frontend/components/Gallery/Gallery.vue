<script setup lang="ts">
import { RouteName } from '~/types/common/Enums/RouteName';
import type { GalleryListItem } from '~/types/Gallery/GalleryListItem';
import { useGalleryApi } from '~/api/gallery';
import { useSouvenirsApi } from '~/api/souvenirs';

const { getGallery } = useGalleryApi();
const { getSouvenirs } = useSouvenirsApi();

// const mainGallery = computed(() => {
//     const arr = import.meta.glob('~/assets/img/gallery/*.webp', { eager: true });
//     return Object.values(arr).map((img) => img.default);
// });

const mainGallery = ref<GalleryListItem[]>([]);
const souvenirsGallery = ref<GalleryListItem[]>([]);

const onLoad = async () => {
    mainGallery.value = await getGallery();
    souvenirsGallery.value = await getSouvenirs();
};

onLoad();

// const souvenirsGallery = computed(() => {
//     const arr = import.meta.glob('~/assets/img/souvenirs/*.webp', { eager: true });
//     return Object.values(arr).map((img) => img.default);
// });
</script>

<template>
    <section class="container py-6 flex flex-col gap-6">
        <h2 class="text-2xl lg:text-4xl font-bold header">Вдохновение в керамике</h2>
        <p class="text-sm lg:text-xl">
            Каждый наш цветок — это ручная работа, созданная с любовью и вниманием к деталям. В галерее представлены
            авторские композиции из керамики, которые украсят ваш дом или станут изысканным подарком.
        </p>
        <GalleryBlock :list="mainGallery" />
        <div class="p-6 border-y-4 border-[var(--text-header-hover)]">
            <p class="text-sm lg:text-xl">
                Хотите уникальный сувенир? Мы создаём керамические украшения, букеты и композиции на заказ. Каждое
                изделие — эксклюзив, который сохранит тепло рук мастера на долгие годы.
            </p>
            <Button
                label="Заказать"
                class="mt-4"
                @click="navigateTo({ name: RouteName.Contacts })"
            />
        </div>
        <GalleryBlock :list="souvenirsGallery" />
    </section>
</template>
