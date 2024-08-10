<script lang="ts" setup>
    import { inject } from 'vue'

    import { useCategoryModel } from '@modules/categories/composables/use-category-model'
    import {
        useCategoryConditions
    } from '@modules/categories/composables/view/use-category-conditions'

    import { useButtonsPanel } from '@shared/composables/use-buttons-panel'

    import { FormCard } from '@shared/components/FormCard'
    import { VSvg } from '@shared/components/VSvg'

    import { CategoryConditions } from '@modules/categories/enums/category-conditions'
    import { SvgPaths } from '@shared/enums/svg-paths'

    const { model } = useCategoryModel()
    const { onUpdateCondition } = useCategoryConditions()

    useButtonsPanel({
        title: 'Управление состоянием',
        onOk: () => onUpdateCondition(),
        onDismiss: () => {
        }
    })
</script>
<template>
    <v-row class="app-border-radius">
        <v-col
            offset-xl="2"
            offset-lg="2"
            xl="8"
            lg="8"
            md="12"
            sm="12"
        >
            <form-card>
                <template #icon>
                    <v-svg :path="SvgPaths.CAMERA"/>
                </template>
                <template #body>
                    <div class="d-flex flex-column">
                        <v-checkbox
                            v-model="model.conditions.isMain"
                            :label="CategoryConditions.IS_MAIN"
                        />
                        <v-checkbox
                            v-model="model.conditions.isSub"
                            :label="CategoryConditions.IS_SUB"
                        />
                        <v-checkbox
                            v-model="model.conditions.isVisible"
                            :label="CategoryConditions.IS_VISIBLE"
                        />
                        <v-checkbox
                            v-model="model.conditions.isCatalog"
                            :label="CategoryConditions.IS_CATALOG"
                            @change="onUpdateCondition"
                        />
                        <v-checkbox
                            v-model="model.conditions.isInNav"
                            :label="CategoryConditions.IS_IN_NAV"
                        />
                        <v-checkbox
                            v-model="model.conditions.isSpecial"
                            :label="CategoryConditions.IS_SPECIAL"
                        />
                        <v-checkbox
                            v-model="model.conditions.isTop"
                            :label="CategoryConditions.IS_TOP"
                        />
                    </div>
                </template>
            </form-card>
        </v-col>
    </v-row>
</template>
