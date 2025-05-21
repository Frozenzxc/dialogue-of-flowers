<script setup lang="ts">
import { RouteName } from '~/types/common/Enums/RouteName';
import type { MenuItem } from '~/types/Layout/MenuItem';

const route = useRoute();

const opened = ref<boolean>(false);

const closeMenu = () => {
    opened.value = false;
};

const items: MenuItem[] = [
    {
        label: 'Главная',
        route: RouteName.MainPage,
    },
    {
        label: 'Галерея',
        route: RouteName.Gallery,
    },
    // {
    //     label: 'Анонсы',
    //     route: RouteName.Announcements,
    // },
    {
        label: 'О нас',
        route: RouteName.AboutUs,
    },
    {
        label: 'Контакты',
        route: RouteName.Contacts,
    },
];
</script>

<template>
    <div class="fixed top-0 inset-x-0 bg-white z-10">
        <header class="container flex">
            <nav class="flex w-full py-2 md:p-0">
                <NuxtLink
                    :to="{ name: RouteName.MainPage }"
                    rel="home"
                    class="flex gap-2 mr-8 items-center"
                    aria-label="На главную Диалог цветов"
                >
                    <img
                        src="~/assets/svg/logo.svg"
                        alt="Логотип Диалог цветов"
                        width="36"
                        height="36"
                    />
                    <h1 class="text-xl md:text-2xl font-bold text-[var(--text-header-hover)] header">ДИАЛОГ ЦВЕТОВ</h1>
                </NuxtLink>
                <ul class="hidden md:flex row">
                    <li v-for="item of items.slice(1)">
                        <NuxtLink
                            :to="{ name: item.route }"
                            class="header-link"
                            :class="{ 'header-link--active': route.name === item.route }"
                        >
                            {{ item.label }}
                        </NuxtLink>
                    </li>
                </ul>
                <BurgerButton
                    v-model="opened"
                    class="ml-auto"
                />
                <Transition name="slide">
                    <div
                        v-show="opened"
                        class="md:hidden absolute top-[52px] left-0 right-0 bg-white z-10 border-y border-[var(--text-header-hover)]"
                    >
                        <ul class="flex flex-col container items-start">
                            <li v-for="item of items">
                                <NuxtLink
                                    :to="{ name: item.route }"
                                    class="header-link"
                                    :class="{ 'header-link--active': route.name === item.route }"
                                    @click="closeMenu"
                                >
                                    {{ item.label }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </Transition>
            </nav>
        </header>
    </div>
</template>

<style scoped>
.header-link {
    @apply px-6 py-2 md:py-4 cursor-pointer block font-bold text-sm hover:text-[var(--text-header-hover)] relative text-center;

    &--active {
        @apply text-[var(--text-header-hover)];

        &:after {
            @apply content-[''] w-full h-1 absolute inset-x-0 bottom-0 hidden md:block bg-[var(--text-header-hover)] z-10 rounded-full opacity-100;
        }
    }
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.2s ease-out;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
}
</style>
