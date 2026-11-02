<script setup lang="ts">
import type { GalleryListItem } from '~/types/Gallery/GalleryListItem';

defineProps<{
    list: GalleryListItem[];
}>();

const runtimeConfig = useRuntimeConfig();
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Image
            v-for="item in list"
            :src="`${runtimeConfig.public.strapiApiUrl}${item.img?.url}`"
            :alt="item.img?.alternativeText || 'Композиция из керамических цветов ручной работы'"
            width="395"
            height="263"
            image-class="w-full h-full object-cover"
            preview
        />
    </div>
</template>
