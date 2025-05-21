<script setup lang="ts">
import { RouteName } from '~/types/common/Enums/RouteName';

definePageMeta({
    title: 'Диалог цветов',
    name: RouteName.AboutUs,
});
</script>

<template>
    <HistoryBlock />
    <DiplomasBlock />
</template>
