describe('Récits utilisateur étudiant', () => {
    // On définit un utilisateur pour les tests. Cet utilisateur sera créé dans la base de données avant chaque test.
    const user = {
      email: 'new@test.com',
      password: 'test',
      name: 'Adélard Rochon'
    }
  
    // Exécuté avant chaque test
    beforeEach(() => {
      // On réinitialise la base de données en appelant le script backend:cypress:seed qui se trouve dans le package.json. Ce script copie le fichier db-cypress-default.json dans db-cypress.json qui est utilisé par le serveur backend. Ainsi, on a une base de données propre pour chaque test.
      cy.exec('npm run backend:cypress:seed')
    })
  
    it('je peux me connecter', () => {
      cy.visit('/login')
  
      // On utilise .get pour sélectionner dans le DOM un élément input dont l'attribut name est email-input. Ensuite, .type est utilisé pour saisir du texte dans cet élément.
      cy.get('input[name=email-input]').type(user.email)
      cy.get('input[name=password-input]').type(user.password)
      // On utilise .get pour sélectionner dans le DOM un élément bonton dont l'attribut type est submit). Ensuite, .click est utilisé pour cliquer sur cet élément.
      cy.get('button[type=submit]').click()
  
      cy.contains(/déconnecter/i)
    })
  
    it('je peux me déconnecter', () => {
      cy.login(user.email, user.password)
  
      cy.contains(/déconnecter/i).click()
  
      cy.contains(/connexion/i)
    })

    it('je peux changer mon mot de passe', () => {
        cy.login(user.email, user.password)
    
        cy.contains(/profile/i).click()

        cy.get('input[name=newPassword]').type("WHAT")
        cy.get('input[name=confirmPassword]').type("WHAT")
        cy.get('button[id=submit-password]').click()
    })

    it('je peux créer une question', () => {
        //TODO
    })

    it('je peux supprimer une question', () => {
        //TODO
    })
  })
  