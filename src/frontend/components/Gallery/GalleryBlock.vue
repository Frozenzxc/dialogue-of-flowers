<script setup lang="ts">
defineProps<{
    list: string[];
}>();
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Image
            v-for="img in list"
            :src="img"
            alt="Image"
            preview
        />
    </div>
</template>
