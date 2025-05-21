<script setup lang="ts">
const model = defineModel<boolean>();

const onToggle = () => {
    model.value = !model.value;
};
</script>

<template>
    <button
        class="icon"
        :class="{ open: model }"
        @click="onToggle"
    >
        <span></span>
        <span></span>
        <span></span>
    </button>
</template>

<style scoped>
.icon {
    width: 30px;
    height: 26px;
    padding: 5px 0;
    position: relative;
    cursor: pointer;
    box-sizing: content-box;

    @apply block md:hidden;
}

.icon span {
    background-color: var(--text-header-hover);
    position: absolute;
    border-radius: 2px;
    transition: 0.3s cubic-bezier(0.8, 0.5, 0.2, 1.4);
    width: 100%;
    height: 4px;
    transition-duration: 500ms;
}

.icon span:nth-child(1) {
    top: 5px;
    left: 0;
}

.icon span:nth-child(2) {
    top: 16px;
    left: 0;
    opacity: 1;
}

.icon span:nth-child(3) {
    bottom: 5px;
    left: 0;
}

.icon.open span:nth-child(1) {
    transform: rotate(45deg);
    top: 18px;
}

.icon.open span:nth-child(2) {
    opacity: 0;
}

.icon.open span:nth-child(3) {
    transform: rotate(-45deg);
    top: 18px;
}
</style>
