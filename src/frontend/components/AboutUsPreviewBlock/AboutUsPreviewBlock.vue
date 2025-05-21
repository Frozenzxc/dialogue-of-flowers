<script setup lang="ts">
import { RouteName } from '~/types/common/Enums/RouteName.js';
</script>

<template>
    <section class="container py-8 lg:py-16 flex flex-col gap-6">
        <h2 class="text-2xl lg:text-4xl text-center header">
            «ДИАЛОГ ЦВЕТОВ» - уникальная выставка современного декоративно-прикладного искусства Елены Сафиевой
        </h2>
        <div class="flex flex-col lg:flex-row gap-8">
            <div class="flex-1">
                <img
                    src="~/assets/img/about-us-preview.webp"
                    class="w-full h-full contain"
                    width="600"
                    height="400"
                />
            </div>
            <div class="flex flex-col gap-4 flex-1 lg:py-4">
                <p class="text-sm lg:text-lg">
                    Приоритетным направлением для нашего проекта является выставочная деятельность.
                </p>
                <p class="text-sm lg:text-lg">
                    Так же мы изготавливаем разнообразные украшения, цветочные композиции на заказ, и проводим обучающие
                    мастер-классы по лепке цветов из холодного фарфора.
                </p>
                <p class="text-sm lg:text-lg">Мы стараемся всесторонне приобщать людей к красоте.</p>

                <Button
                    label="Подробнее"
                    icon="pi pi-arrow-right"
                    icon-pos="right"
                    class="self-start lg:self-end mt-auto"
                    @click="navigateTo({ name: RouteName.AboutUs })"
                />
            </div>
        </div>
    </section>
</template>
