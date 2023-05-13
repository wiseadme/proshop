import { createVueland } from 'vueland'

import * as asyncComponents from 'vueland/lib/components/async-components'
import * as directives from 'vueland/lib/directives'
import {
    VApp,
    VList,
    VListItem
} from 'vueland/lib/components'

import colors from 'vueland/lib/services/colors'

import 'vueland/lib/styles/vueland-base.css'
import 'vueland/lib/styles/themes/vueland-theme.css'

const components = {
    ...asyncComponents,
    VList,
    VListItem,
    VApp,
}

export const vueland = createVueland({
    components,
    directives
})

vueland.setIcons('fa')

vueland.setTheme({
    base: colors.white.base,
    primary: 'rgb(29,180,180)',
    secondary: 'rgb(48,48,52)',
    content: colors.grey.darken3,
    error: colors.red.lighten2,
    success: 'rgb(7,187,59)',
    warning: 'rgb(253,143,0)',
    disabled: '#e6e6e6',
})
