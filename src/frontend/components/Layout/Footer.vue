<script setup lang="ts">
import { RouteName } from '~/types/common/Enums/RouteName';
import type { MenuItem } from '~/types/Layout/MenuItem';

const currentYear = new Date().getFullYear();

const items: MenuItem[] = [
    {
        label: 'Галерея',
        route: RouteName.Gallery,
    },
    {
        label: 'Анонсы',
        route: RouteName.Announcements,
    },
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
    <footer class="border-t pb-4">
        <div class="container">
            <div class="flex flex-col md:flex-row gap-4 md:gap-10 py-6 md:py-10">
                <div class="flex flex-col gap-4">
                    <NuxtLink
                        :to="{ name: RouteName.MainPage }"
                        rel="home"
                        class="flex gap-2 mr-8 items-center"
                        aria-label="На главную Диалог цветов"
                    >
                        <img
                            src="~/assets/svg/logo.svg"
                            alt="Логотип Диалог цветов"
                            width="48"
                            height="48"
                        />
                        <div class="flex flex-col">
                            <span class="text-xl font-bold text-[var(--text-header-hover)]">ДИАЛОГ ЦВЕТОВ</span>
                            <span class="text-base text-[var(--text-header-hover)]"
                                >Выставочный проект Елены Сафиевой</span
                            >
                        </div>
                    </NuxtLink>
                    <ul class="flex gap-2">
                        <li>
                            <a
                                href="https://vk.com/dialogtsvetov"
                                target="_blank"
                                rel="noopener nofollow"
                                title="Наша группа в VK"
                            >
                                <span class="sr-only">Наша группа в VK</span>
                                <nuxt-icon
                                    name="vk-logo"
                                    filled
                                    class="text-2xl"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:dialogtsvetov@yandex.ru"
                                target="_blank"
                                rel="noopener nofollow"
                                title="Отправить email dialogtsvetov@yandex.ru"
                            >
                                <span class="sr-only">Написать нам на email</span>
                                <nuxt-icon
                                    name="ya-mail-logo"
                                    filled
                                    class="text-2xl"
                                />
                            </a>
                        </li>
                    </ul>
                </div>
                <ul class="flex flex-col gap-2 border-y-2 border-[var(--text-header-hover)] md:border-none py-2 md:p-0">
                    <li v-for="item of items">
                        <NuxtLink
                            :to="{ name: item.route }"
                            class="text-sm hover:text-[var(--text-header-hover)]"
                        >
                            {{ item.label }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <p class="text-center text-xs md:text-sm">
                © 2017 - {{ currentYear }} официальный сайт выставочного проекта тульской керамической флористики Елены
                Сафиевой «ДИАЛОГ ЦВЕТОВ»
            </p>
        </div>
    </footer>
</template>
