import { createVueland } from 'vueland'

import * as asyncComponents from 'vueland/lib/components/async-components'
import * as directives from 'vueland/lib/directives'
import { VList, VListItem, VApp } from 'vueland/lib/components'

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
  base: '#ffffff',
  primary: colors.green.base,
  content: colors.grey.darken3,
  error: colors.red.lighten2,
  warning: colors.orange.base,
  disabled: '#e6e6e6'
})
