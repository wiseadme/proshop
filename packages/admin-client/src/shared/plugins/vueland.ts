import { createVueland } from 'vueland'

import * as components from 'vueland/lib/components/async-components'
import * as directives from 'vueland/lib/directives'

import colors from 'vueland/lib/services/colors'

import 'vueland/lib/styles/vueland-base.css'
import 'vueland/lib/styles/themes/vueland-theme.css'

export const vueland = createVueland({
  components,
  directives
})

vueland.setTheme({
  base: '#fefefe',
  primary: colors.green.accent2,
  content: colors.grey.darken3,
  error: colors.red.accent3
})
