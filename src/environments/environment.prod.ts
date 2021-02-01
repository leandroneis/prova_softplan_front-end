export const environment = {
  production: true,
  apiUrl: 'https://prova-softplan-pessoa-api.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('prova-softplan-pessoa-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
