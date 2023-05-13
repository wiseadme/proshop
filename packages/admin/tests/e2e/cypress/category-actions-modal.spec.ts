import { mount } from '@cypress/vue'

import { CategoryActionsModal } from '../../../src/modules/category/components/CategoryActionsModal'

describe('CategoryActionsModal', () => {
    it('should mount component', () => {
        mount(CategoryActionsModal)

        cy.get('v-modal').should('be.visible')
    })
})
