//-----------  Environment  -----------//

const environment = {
  development : { isProduction: false },
  production  : { isProduction: true }
}[ process.env.NODE_ENV || 'development' ]

//-----------  Configuration  -----------//

module.exports = Object.assign({
  host       : process.env.HOST || 'localhost',
  port       : process.env.PORT,
  apiBaseUrl : process.env.API_URL || 'http://webservice-api-ebs-dev-env.us-west-2.elasticbeanstalk.com',
  app: {
    title       : 'Rexsi OAuth Test App',
    description : 'Login, Logout',
    head: {
      titleTemplate: 'React Universal Saga Modular',
      meta: [
        { name: 'description', content: 'Universal & Modular React Kit ft. Redux Saga' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'React Universal Saga Modular' },
        { property: 'og:image', content: 'https://facebook.github.io/react/img/logo_og.png' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'React Universal Saga Modular' },
        { property: 'og:description', content: 'Universal & Modular React Kit ft. Redux Saga' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@xkawi' },
        { property: 'og:creator', content: '@xkawi' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  },
}, environment)
