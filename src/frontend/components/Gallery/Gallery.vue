<script setup lang="ts">
import { RouteName } from '~/types/common/Enums/RouteName';

const mainGallery = [
    '/_nuxt/assets/img/gallery/1.webp',
    '/_nuxt/assets/img/gallery/2.webp',
    '/_nuxt/assets/img/gallery/3.webp',
    '/_nuxt/assets/img/gallery/4.webp',
    '/_nuxt/assets/img/gallery/5.webp',
    '/_nuxt/assets/img/gallery/6.webp',
];

const souvenirsGallery = [
    '/_nuxt/assets/img/souvenirs/1.webp',
    '/_nuxt/assets/img/souvenirs/2.webp',
    '/_nuxt/assets/img/souvenirs/3.webp',
    '/_nuxt/assets/img/souvenirs/4.webp',
    '/_nuxt/assets/img/souvenirs/5.webp',
    '/_nuxt/assets/img/souvenirs/6.webp',
    '/_nuxt/assets/img/souvenirs/7.webp',
    '/_nuxt/assets/img/souvenirs/8.webp',
    '/_nuxt/assets/img/souvenirs/9.webp',
];
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
