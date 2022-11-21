describe('e2e-prueba-movil', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
  })
  it('Recuperar Contraseña', () => {

    //iniciar pagina
    cy.visit('http://localhost:8100/')

    //ir a recuperar contraseña
    cy.contains('¿Olvidaste tu contraseña?').click()
    
    //revisar que sea la url correcta
    cy.url().should('include', '/recovpass')
    
    //verificar mensaje de error en datos incorrectos (recuperar contraseña)
    cy.get('.recuperar_usuario').type('marc.contrera').should('have.value', 'marc.contrera')
    cy.wait(1000)
    cy.contains('Siguiente').click()
    cy.contains('Ok').click()
    
    //verificar que la recuperacion de contraseña funcione
    cy.get('.recuperar_usuario').type('s').should('have.value', 'marc.contreras')
    cy.wait(700)
    cy.contains('Siguiente').click()
    cy.contains('Ok').click()
    
    //verificar que el inicio de sesion envie un mensaje de error
    cy.get('.ingresar_usuario').type('marc.contrera').should('have.value', 'marc.contrera')
    cy.get('.ingresar_contrasena').type('123456').should('have.value', '123456')
    cy.contains('Ingresar').click()
    cy.contains('Ok').click()
    
    //verificar que se inicie sesion correctamente
    cy.get('.ingresar_usuario').type('s').should('have.value', 'marc.contreras')
    cy.get('.ingresar_contrasena').type('123456').should('have.value', '123456')
    cy.contains('Ingresar').click()
    
    //verificar que se pueda navegar entre los tabs correctamente
    cy.contains('Conducir').click()
    cy.contains('Buscar viaje').click()
    cy.contains('Inicio').click()
    
    //verificar que se pueda cerrar sesion correctamente
    cy.contains('cerrar sesion').click()
  })

})