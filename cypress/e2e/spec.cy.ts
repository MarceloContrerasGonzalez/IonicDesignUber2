describe('empty spec', () => {
  beforeEach(() => { cy.viewport('iphone-6') })

  it('passes', () => {
    cy.visit('http://localhost:8100')
  })
})