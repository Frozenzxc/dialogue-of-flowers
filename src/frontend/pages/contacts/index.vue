<script setup lang="ts">
import { RouteName } from '~/types/common/Enums/RouteName';

definePageMeta({
    title: 'Диалог цветов',
    name: RouteName.Contacts,
});
</script>

<template>
    <ContactsBlock class="min-h-[calc(100vh-284px)]" />
</template>
