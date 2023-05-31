
describe('UI Test for SHA Page', () => {
  beforeEach(() => {
    cy.visit('https://www.cjvillarreal.com/ChrisCodes/posts/sha/')
  })

  it('Visits a URL and inputs hash for Password', () => {
    
    // Test steps for entering text and clicking the button within the form
    cy.get('#hash-form #text-input').type('Test123')
    cy.get('#hash-form').within(() => {
      cy.get('button').click()
    })

    // Assertion: Verify the correct output is present
    cy.get('#hash-container').should('contain.text', 'MD5 Hash: 68eacb97d86f0c4621fa2b0e17cabd8')

    // Test steps for entering text and clicking the button within the form
    cy.get('#verification-form #password-input').type('Test123')
    cy.get('#verification-form').within(() => {
      cy.get('button').click()
    })

    // Assert the alert message
    cy.on('window:alert', (message) => {
      expect(message).to.equal('✅ Password is correct! Access granted.')
    })

  })

  it('Visits a URL fails to input hash and checks for password', () => {
   
    // Test steps for entering text and clicking the button within the form
    cy.get('#verification-form #password-input').type('Test123')
    cy.get('#verification-form').within(() => {
      cy.get('button').click()
    })

    // Assert the alert message
    cy.on('window:alert', (message) => {
      expect(message).to.equal('🛂 Please Generate a hash.')
    })
  })

  it('Visits a URL and inputs wrong hash for Password', () => {
    
    // Test steps for entering text and clicking the button within the form
    cy.get('#hash-form #text-input').type('Test123')
    cy.get('#hash-form').within(() => {
      cy.get('button').click()
    })

    // Test steps for entering text and clicking the button within the form
    cy.get('#verification-form #password-input').type('Wrong123')
    cy.get('#verification-form').within(() => {
      cy.get('button').click()
    })

    // Assert the alert message
    cy.on('window:alert', (message) => {
      expect(message).to.equal('❌ Incorrect password. Access denied.')
    })
  })

})
