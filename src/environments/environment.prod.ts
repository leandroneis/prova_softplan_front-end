export const environment = {
  production: true,
  apiUrl: 'https://leandroneis-pessoa-api.herokuapp.com',
  
  tokenWhitelistedDomains: [ new RegExp('leandroneis-pessoa-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
