<script setup lang="ts">
import { RouteName } from '~/types/common/Enums/RouteName';

definePageMeta({
    title: 'Диалог цветов',
    name: RouteName.Gallery,
});
</script>

<template>
    <!-- renamed GallerySection (was Gallery): имя Gallery занято одноимённым
         компонентом PrimeVue 5, который затенял локальный -->
    <GallerySection />
</template>
