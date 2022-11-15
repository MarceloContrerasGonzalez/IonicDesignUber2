describe('e2e-prueba-movil', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
  })
  it('Recuperar Contraseña', () => {
    cy.visit('http://localhost:8100/')
    cy.contains('¿Olvidaste tu contraseña?').click()
    cy.url().should('include', '/recovpass')
    cy.get('.recuperar_usuario').type('marc.contreras').should('have.value', 'marc.contreras')
    cy.contains('Siguiente').click()
    cy.contains('Ok').click()
    cy.get('.ingresar_usuario').type('marc.contreras').should('have.value', 'marc.contreras')
    cy.get('.ingresar_contrasena').type('123456').should('have.value', '123456')
    cy.contains('Ingresar').click()
    cy.contains('Conducir').click()
    cy.contains('Buscar viaje').click()
    cy.contains('Inicio').click()
    cy.contains('cerrar sesion').click()
  })
  
  /* it('Iniciar sesion', () => {
    cy.visit('http://localhost:8100/')
    cy.get('.ingresar_usuario').type('marc.contreras').should('have.value', 'marc.contreras')
    cy.get('.ingresar_contrasena').type('123456').should('have.value', '123456')
    cy.contains('Ingresar').click()
  }) */
  
  /* it('Navegar entre los tabs y cerrar sesion', () => {
    cy.visit('http://localhost:8100/')
    cy.get('.ingresar_usuario').type('marc.contreras').should('have.value', 'marc.contreras')
    cy.get('.ingresar_contrasena').type('123456').should('have.value', '123456')
    cy.contains('Ingresar').click()
    cy.contains('Conducir').click()
    cy.contains('Buscar viaje').click()
    cy.contains('Inicio').click()
    cy.contains('cerrar sesion').click()
  })
   */

})