<script lang="ts" setup>
    import {
        computed,
        markRaw,
        ref,
        unref,
    } from 'vue'

    import { User } from '@modules/users/model/user.model'

    import { IOrder, IUser } from '@proshop/types'

    import { ROLES } from '@shared/constants/roles'

    const {
        modelValue,
        isUpdate,
    } = defineProps<{
        modelValue: boolean
        isUpdate?: boolean
        order?: IOrder
    }>()

    const emit = defineEmits<{
        (e: 'create:user', user: IUser): void
        (e: 'update:modelValue', val: boolean): void
    }>()

    const user = ref<IUser>(User.create())
    const confirmPassword = ref('')

    const rules = markRaw({
        firstName: [val => !!val || 'Обязательное поле'],
        secondName: [val => !!val || 'Обязательное поле'],
        phone: [val => val && val.length === 9 || 'Не менее 9-ти символов'],
        password: [val => val && val.length >= 8 || 'Не менее 8-ми символов'],
        confirmPassword: [val => val === unref(user).password || 'Пароли не совпадают'],
    })

    const tooltips = markRaw({
        root: 'создание, редактирование и удаление записей',
        user: 'создание и редактирование записей',
        readonly: 'только чтение',
    })

    const computedModalHeader = computed(() => isUpdate ? 'Редактирование пользователя' : 'Создание пользователя')

    const computedShowModal = computed({
        get: () => modelValue,
        set: (val) => {
            emit('update:modelValue', val)
        },
    })

    const createUser = (validate) => {
        validate()
            .then(() => {
                if (!isUpdate) {
                    emit('create:user', unref(user))
                }
            })
    }

    const toggleUserRole = (role: any) => {
        const { roles } = unref(user) as any

        if (roles.indexOf(role) > -1) {
            unref(user).roles = roles.filter(it => it !== role)
        } else {
            unref(user).roles.push(role)
        }
    }

</script>
<template>
    <v-modal
        v-model="computedShowModal"
        width="70%"
        transition="scale-in"
        overlay
    >
        <v-form v-slot="{validate}">
            <v-card
                width="100%"
                color="rgba(0,0,0,.4)"
                class="modal-card app-border-radius"
            >
                <v-card-title class="modal-card-title white--text">
                    {{ computedModalHeader }}
                </v-card-title>
                <v-card-content
                    class="grey lighten-4"
                    style="height: 70vh; max-height: 70vh; overflow: auto"
                >
                    <v-row class="white elevation-2 pa-2 my-2">
                        <v-col class="mb-4">
                            <div class="head py-2">
                                <h3>Личные данные пользователя</h3>
                            </div>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="user.firstName"
                                :rules="rules.firstName"
                                label="Имя *"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="user.secondName"
                                :rules="rules.secondName"
                                label="Фамилия *"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="user.username"
                                label="Имя пользователя"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="user.phone"
                                :rules="rules.phone"
                                label="Номер телефона *"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="user.password"
                                :rules="rules.password"
                                label="Пароль"
                            />
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="confirmPassword"
                                :rules="rules.confirmPassword"
                                label="Повторите пароль"
                            />
                        </v-col>
                    </v-row>
                    <v-row
                        class="white elevation-2 pa-2 my-2"
                    >
                        <v-col cols="6">
                            <div class="head py-2">
                                <h3>Роль пользователя в системе</h3>
                            </div>
                            <v-row class="roles d-flex justify-space-around align-center">
                                <v-col
                                    v-for="role in ROLES"
                                    :key="role"
                                    cols="4"
                                    class="d-flex justify-center align-center"
                                >
                                    <v-tooltip
                                        color="rgba(0,0,0,.7)"
                                        top
                                        offset-y="-10"
                                        min-width="250"
                                        elevation="4"
                                    >
                                        <template #activator="{ on }">
                                            <v-button
                                                class="roles__item d-flex justify-start align-center flex-column"
                                                round
                                                width="80"
                                                elevation="6"
                                                :color="user.roles.indexOf(role) > -1 ? 'primary' : 'grey'"
                                                v-on="on"
                                                @click="toggleUserRole(role)"
                                            >
                                                <div class="d-flex justify-center align-center flex-column">
                                                    <v-icon
                                                        icon="fas fa-user-tie"
                                                        class="mb-1"
                                                        size="20"
                                                    />
                                                    <h4>{{ role }}</h4>
                                                </div>
                                            </v-button>
                                        </template>
                                        <span>{{ role }} - {{ tooltips[role] }}</span>
                                    </v-tooltip>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="6">
                            <div class="head py-2 mb-2">
                                <h3>Должность пользователя</h3>
                            </div>
                            <v-text-field
                                v-model="user.position!.title"
                                label="Название должности"
                            />
                            <v-text-field
                                v-model="user.position!.department"
                                label="Отдел"
                            />
                        </v-col>
                    </v-row>
                </v-card-content>
                <v-card-actions>
                    <v-button
                        color="primary"
                        class="mr-2"
                        width="120"
                        @click="createUser(validate)"
                    >
                        сохранить
                    </v-button>
                    <v-button
                        color="warning"
                        width="120"
                        @click="$emit('update:modelValue', false)"
                    >
                        отмена
                    </v-button>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-modal>
</template>
<style lang="scss">
    .roles {
        width: 100%;
        height: calc(100% - 40px);

        &__item {
            width: 33.3%;
        }
    }

    .head {
        position: relative;

        &:before {
            content: "";
            width: 100%;
            height: 1px;
            background-color: var(--primary);
            position: absolute;
            bottom: 0;
        }
    }
</style>
