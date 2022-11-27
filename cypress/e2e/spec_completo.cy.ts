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
    //rellenar el formulario para crear un viaje
    cy.get('.pasajerostest').type('4')
    cy.get('.tarifatest').type('3300')
    //abrir el maps e ingresar el destino
    cy.contains("Destino:").click()
    cy.wait(1500)
    cy.get('.maptest').click('center')
    cy.wait(1500)
    cy.contains("Aceptar").click()
    //rellenar patente y datos extra del viaje
    cy.get('.patentetest').type('XX-XX-21')
    cy.get('.mat_area').type('viajeTesting')
    //iniciar el viaje
    cy.contains("Preparar el viaje").click()
    //navegar al tab de pedir viaje
    cy.contains('Buscar viaje').click()
    cy.get('.card_padding').click()
    cy.contains("Reservar").click()
    cy.wait(500)
    //navegar al tab de conducir e iniciar el viaje
    cy.contains('Conducir').click()
    cy.wait(500)
    cy.contains('Empezar viaje').click()
    cy.wait(700)
    //terminar el viaje
    cy.contains('Terminar el viaje').click()
    cy.wait(700)
    //vamos a ver si el pasajero termino el viaje
    cy.contains('Buscar viaje').click()
    cy.wait(700)
    cy.get('.dialog_button').click()
    cy.wait(500)
    //volvemos a inicio 
    cy.contains('Inicio').click()    
    //verificar que se pueda cerrar sesion correctamente
    cy.contains('cerrar sesion').click()

  })

})