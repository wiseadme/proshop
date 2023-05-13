<script lang="ts" setup>
    import { QuillEditor } from '@vueup/vue-quill'
    const {content} = defineProps<{content: string}>()

    const emit = defineEmits(['update:content' ])

    const computedContent = $computed({
        get(){
            return content
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

</script>
<template>
    <quill-editor
        v-model:content="computedContent"
        :toolbar="toolbar"
        content-type="html"
        theme="snow"
    />
</template>
<style lang="scss">
  @import "@vueup/vue-quill/dist/vue-quill.snow.css";

  .ql-editor {
    min-height: 200px;
  }
</style>
