<script setup lang="ts">
useHead({
    titleTemplate: (chunk?: string) =>
        chunk && chunk !== 'Диалог цветов' ? `${chunk} | Диалог цветов` : 'Диалог цветов',
});
</script>
<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
