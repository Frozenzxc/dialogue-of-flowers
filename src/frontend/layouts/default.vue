<script setup lang="ts">
import Header from '~/components/Layout/Header.vue';
import Footer from '~/components/Layout/Footer.vue';
</script>

<template>
    <div>
        <Header />
        <slot />
        <Footer />
    </div>
</template>
