<script setup lang="ts">
import type { ContactForm, ContactFormErrors } from '~/types/Contacts/ContactForm';
import type { FormResolverOptions } from '@primevue/forms';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const { createContactForm } = useContactFormApi();

const model = ref<ContactForm>({} as ContactForm);

const resolver = ({ values }: FormResolverOptions) => {
    const errors = {} as ContactFormErrors;

    if (!values.email) {
        errors.email = [{ message: 'Поле «Эл. почта» обязательно для заполнения' }];
    }

    if (!values.name) {
        errors.name = [{ message: 'Поле «Имя» обязательно для заполнения' }];
    }

    return {
        errors,
    };
};

const onFormSubmit = async ({ valid }: { valid: boolean }) => {
    if (valid) {
        await createContactForm(model.value);
        toast.add({
            severity: 'success',
            summary: 'Успешно!',
            detail: 'Ваш запрос будет обработан в ближайшее время.',
            life: 6000,
        });
        model.value = {} as ContactForm;
    }
};
</script>

<template>
    <section class="container py-6">
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
                <Button
                    type="submit"
                    label="Отправить"
                />
                <!--                <div class="flex gap-2">-->
                <!--                    <Checkbox-->
                <!--                        input-id="policy"-->
                <!--                        name="policy"-->
                <!--                        value="true"-->
                <!--                        required-->
                <!--                    />-->
                <!--                    <label for="policy">-->
                <!--                        Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь c политикой-->
                <!--                        конфиденциальности-->
                <!--                    </label>-->
                <!--                </div>-->
            </Form>
        </div>
        <Toast />
    </section>
</template>
