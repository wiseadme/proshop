import {
    DefineComponent,
    defineAsyncComponent,
    defineComponent,
    h,
    onBeforeMount
} from 'vue'

export const lazyLoad = ({
    loader,
}) => {
    let component: DefineComponent

    return defineComponent({
        name: 'lazy-load',
        inheritAttrs: true,
        setup(props) {
            onBeforeMount(async () => {
                try {
                    component = defineAsyncComponent({ loader })
                } catch (err) {
                    console.log('lazy loading failed', err)
                }
            })

            return () => h(component, props)
        }
    })
}
