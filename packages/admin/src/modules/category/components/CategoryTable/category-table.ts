import { defineComponent, PropType } from 'vue'
import { ICategory } from '@ecommerce-platform/server/src/modules/category/types/model'

export const CategoryTable = defineComponent({
  props: {
    cols: {
      type: Array,
      required: true
    },
    rows: {
      type: Array as PropType<Array<ICategory>>,
      default: () => []
    }
  },
  emits: [
    'add',
    'edit',
    'delete'
  ],
  setup() {
    return {}
  }
})
