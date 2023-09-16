describe('Products', () => {
    beforeEach(() => {
        const setup = () => {
            cy.visit('http://localhost:8081/')
            cy
                .get('[data-field="login"]')
                .find('input')
                .focus()
                .type('wiseadme')
            cy
                .get('[data-field="password"]')
                .find('input')
                .focus()
                .type('aaaaaa')

            cy
                .get('[data-btn="submit"]')
                .trigger('click')

            cy.wait(2000)
        }

        cy.session('login', setup)
    })

    it('should create product', () => {
        cy.visit('http://localhost:8081/products')
        cy
            .get('[data-test="create-modal"]')
            .trigger('click')

    })
})
