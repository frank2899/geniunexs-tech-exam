describe('Test Job Page', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should load the job page successfully', () => {
        cy.get('#job-list-container').should('be.visible')
    })

    it('should display job cards on the job page', () => {
        cy.get('.job-card').should('be.visible')
    })

    it('should redirect to create job page when create job button is clicked', () => {
        cy.get('#create-job-btn').click()
        cy.url().should('include', '/create')
    })

    it('should redirect to view job when a job card is clicked', () => {
        cy.get('.job-card')
            .first()
            .then(($card) => {
                const jobId = $card.data('job-id')
                cy.wrap($card).click()

                cy.url().should('include', `/${jobId}`)

                cy.get('#job-preview').should('be.visible')
            })
    })
})

describe('Job Creation Page', () => {
    beforeEach(() => {
        cy.visit('/create')
    })

    it('should open the preview dialog when form is submitted with valid data', () => {
        cy.get('select[name="company"]').select('Meta')
        cy.get('input[name="title"]').type('UI/UX Engineer')
        cy.get('input[name="summary"]').type('Design and iterate intuitive digital products that delight our users.')
        cy.get('input[name="activeUntil"]').type('2025-02-08')
        cy.get('textarea[name="description"]').type('This is a sample job description in Markdown.')
        cy.get('input[name="department"]').type('Design')
        cy.get('select[name="jobType"]').select('Fulltime')
        cy.get('input[name="location"]').type('Pasay City, Philippines')
        cy.get('select[name="workLocationType"]').select('Onsite')

        cy.get('#save-btn').click()

        cy.get('#job-draft').should('be.visible')
    })

    it('should not open the preview dialog if required fields are incomplete', () => {
        cy.get('#save-btn').click()

        cy.get('[data-testid="job-preview-dialog"]').should('not.exist')
    })
})
