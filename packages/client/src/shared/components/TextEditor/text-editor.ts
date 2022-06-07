import { defineComponent, computed } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'

export const textEditor = defineComponent({
  name: 'product-text-editor',
  components: { QuillEditor },
  props: {
    content: String
  },
  emits: [ 'update:content' ],
  setup(props, { emit }){
    const computedContent = computed({
      get(){
        return props.content
      },
      set(val){
        emit('update:content', val)
      }
    })

    const toolbar = [
      [ 'bold', 'italic', 'underline', 'strike' ],
      [ 'blockquote', 'code-block' ],

      [ { 'header': 1 }, { 'header': 2 } ],
      [ { 'list': 'ordered' }, { 'list': 'bullet' } ],
      [ { 'script': 'sub' }, { 'script': 'super' } ],
      [ { 'indent': '-1' }, { 'indent': '+1' } ],
      [ { 'direction': 'rtl' } ],

      [ { 'size': [ 'small', 'middle', 'large', 'huge' ] } ],
      [ { 'header': [ 1, 2, 3, 4, 5, 6, false ] } ],

      [ { 'color': [] }, { 'background': [] } ],
      // [ { 'font': [] } ],
      [ { 'align': [] } ],

      [ 'clean' ]
      // [ 'link', 'image', 'video' ]
    ]

    return {
      computedContent,
      toolbar,
    }
  }
})
