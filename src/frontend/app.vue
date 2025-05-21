<script setup lang="ts">
useHead(() => {
    const route = useRoute();
    const routeTitle = route.meta.title as string | undefined;
    return {
        titleTemplate: (chunk?: string) => chunk ?? routeTitle ?? 'Диалог цветов',
    };
});
</script>
<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
