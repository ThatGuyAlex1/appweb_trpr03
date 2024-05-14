describe('Récits utilisateur', () => {
    // On définit un utilisateur pour les tests. Cet utilisateur sera créé dans la base de données avant chaque test.
    const user = {
      email: 'test@test.com',
      password: 'test',
      name: 'Emmett Brown'
    }

    const student = {
        email: 'WHAT@mail.com',
        password: 'password',
        name: 'WHAT'
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

    it('je peux changer mon nom', () => {
        cy.login(user.email, user.password)
    
        cy.contains(/profile/i).click()

        cy.get('input[name=name]').type("WHAT")
        cy.get('button[id=submit-name]').click()
        cy.get('div[id=name]').contains("WHAT")
    })

    it('je peux créer un étudiant', () => {
        cy.login(user.email, user.password)
    
        cy.contains(/gestionnaire/i).click()

        cy.get('button[id=show-student-button]').click()
        cy.get('input[name=studentName]').type(student.name)
        cy.get('input[name=studentEmail]').type(student.email)
        cy.get('input[name=password]').type(student.password)
        cy.get('input[name=confirmPassword]').type(student.password)
        cy.get('button[id=submit-student]').click()
        cy.get('tr[id=studentList]').contains(student.email)
        cy.get('tr[id=studentList]').contains(student.name)
    })

    it('je peux supprimer un étudiant', () => {
        cy.login(user.email, user.password)
    
        cy.contains(/gestionnaire/i).click()
        //aidé de chatGPT
        cy.get('#studentList:first-child .btn-danger').click()

        cy.contains('#studentList', 'Bruce Lee').should('not.exist')
        cy.contains('#studentList', 'mon@courriel.com').should('not.exist')
    })
  })
  