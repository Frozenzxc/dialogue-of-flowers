<script setup lang="ts">
import { RouteName } from '~/types/common/Enums/RouteName';

definePageMeta({
    title: 'Диалог цветов',
    name: RouteName.MainPage,
});

useSeo(RouteName.MainPage);
</script>

<template>
    <PreviewBlock />
    <AboutUsPreviewBlock />
</template>
