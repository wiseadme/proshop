import { createVueland } from 'vueland'
// import * as asyncComponents from 'vueland/lib/components/async-components'
import * as directives from 'vueland/lib/directives'
import * as components from 'vueland/lib/components'

import colors from 'vueland/lib/services/colors'

import 'vueland/lib/styles/vueland-base.css'
import 'vueland/lib/styles/themes/vueland-theme.css'
// import { VApp, VList, VListItem } from 'vueland/lib/components'

// const components = {
//     ...asyncComponents,
//     VList,
//     VListItem,
//     VApp,
// }

export const vueland = createVueland({
    components,
    directives
})

vueland.setIcons('fa')

vueland.setTheme({
    base: colors.white.base,
    primary: '#6a6a6a',
    secondary: '#2e2d2d',
    content: colors.grey.darken3,
    error: colors.red.lighten2,
    success: 'rgb(27,188,80)',
    warning: 'rgb(243,148,78)',
    disabled: '#e6e6e6',
})
