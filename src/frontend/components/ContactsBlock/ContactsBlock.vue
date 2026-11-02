<script setup lang="ts">
import { RouteName } from '~/types/common/Enums/RouteName';
import type { ContactForm, ContactFormErrors } from '~/types/Contacts/ContactForm';
import type { FormResolverOptions } from '@primevue/forms';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const { createContactForm } = useContactFormApi();

const emptyForm = (): ContactForm => ({
    email: '',
    name: '',
    phone: '',
    comment: '',
    policy: false,
});

const model = ref<ContactForm>(emptyForm());
const submitting = ref(false);

const resolver = ({ values }: FormResolverOptions) => {
    const errors = {} as ContactFormErrors;

    if (!values.email) {
        errors.email = [{ message: 'Поле «Эл. почта» обязательно для заполнения' }];
    }

    if (!values.name) {
        errors.name = [{ message: 'Поле «Имя» обязательно для заполнения' }];
    }

    if (!values.policy) {
        errors.policy = [{ message: 'Необходимо согласие на обработку персональных данных' }];
    }

    return {
        errors,
    };
};

const onFormSubmit = async ({ valid }: { valid: boolean }) => {
    if (!valid || submitting.value) {
        return;
    }

    submitting.value = true;
    try {
        await createContactForm(model.value);
        toast.add({
            severity: 'success',
            summary: 'Успешно!',
            detail: 'Ваш запрос будет обработан в ближайшее время.',
            life: 6000,
        });
        model.value = emptyForm();
    } finally {
        submitting.value = false;
    }
};
</script>

<template>
    <section class="container py-6">
        <div class="flex flex-col gap-2 pb-6">
            <h1 class="text-2xl lg:text-4xl font-bold header">Контакты</h1>
            <p class="text-sm lg:text-base">
                Выставочный проект керамической флористики Елены Сафиевой, Тула.
            </p>
            <p class="text-sm lg:text-base">
                Email:
                <a
                    href="mailto:dialogtsvetov@yandex.ru"
                    class="underline hover:text-[var(--text-header-hover)]"
                    >dialogtsvetov@yandex.ru</a
                >
                ·
                <a
                    href="https://vk.com/dialogtsvetov"
                    class="underline hover:text-[var(--text-header-hover)]"
                    >ВКонтакте</a
                >
                ·
                <a
                    href="https://rutube.ru/channel/50542582/"
                    class="underline hover:text-[var(--text-header-hover)]"
                    >Rutube</a
                >
            </p>
        </div>
        <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-1/3">
                <img
                    src="~/assets/img/contact-block.webp"
                    class="contain w-full"
                    width="896"
                    height="1344"
                    alt="Напишите нам"
                />
            </div>
            <Form
                v-slot="$form"
                :resolver
                :initial-values="model"
                class="flex flex-col gap-4 md:w-2/3 lg:w-1/3"
                @submit="onFormSubmit"
            >
                <div>
                    <FloatLabel variant="on">
                        <InputText
                            v-model="model.email"
                            name="email"
                            type="email"
                            fluid
                        />
                        <label for="email">Эл. почта</label>
                    </FloatLabel>
                    <Message
                        v-if="$form.email?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                    >
                        {{ $form.email.error.message }}
                    </Message>
                </div>
                <div>
                    <FloatLabel variant="on">
                        <InputText
                            v-model="model.name"
                            name="name"
                            fluid
                        />
                        <label for="name">Имя</label>
                    </FloatLabel>
                    <Message
                        v-if="$form.name?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                    >
                        {{ $form.name.error.message }}
                    </Message>
                </div>
                <FloatLabel variant="on">
                    <InputMask
                        v-model="model.phone"
                        name="phone"
                        mask="(999) 999-9999"
                        fluid
                        class="w-full"
                    />
                    <label for="name">Телефон</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <Textarea
                        v-model="model.comment"
                        name="comment"
                        rows="5"
                        cols="30"
                        style="resize: none"
                        fluid
                    />
                    <label for="comment">Сообщение</label>
                </FloatLabel>
                <div>
                    <div class="flex gap-2 items-start">
                        <Checkbox
                            v-model="model.policy"
                            input-id="policy-accept"
                            name="policy"
                            binary
                        />
                        <label
                            for="policy-accept"
                            class="text-xs md:text-sm cursor-pointer select-none"
                        >
                            Отправляя форму, я даю согласие на обработку персональных данных и
                            принимаю
                            <NuxtLink
                                :to="{ name: RouteName.Privacy }"
                                class="underline hover:text-[var(--text-header-hover)]"
                                >политику конфиденциальности</NuxtLink
                            >
                        </label>
                    </div>
                    <Message
                        v-if="$form.policy?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                    >
                        {{ $form.policy.error.message }}
                    </Message>
                </div>
                <Button
                    type="submit"
                    label="Отправить"
                    :loading="submitting"
                />
            </Form>
        </div>
        <Toast />
    </section>
</template>
