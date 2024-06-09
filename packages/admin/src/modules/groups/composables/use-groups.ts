import { onMounted } from 'vue'
import { useVariantsService } from '@modules/variants/composables/use-variants-service'
import { useGroupModel } from '@modules/groups/composables/use-group-model'

export const useGroups = () => {
    const { model } = useGroupModel()
    const { variants, getVariants } = useVariantsService()


    onMounted(async () => {
        await getVariants()
    })

    return {
        model,
        variants
    }
}
