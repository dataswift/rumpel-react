// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: process.env.REACT_APP_PRODUCTION === 'true',
  sandbox: process.env.REACT_APP_SANDBOX === 'true',
  native: true,
  protocol: 'https:',
  appName: process.env.REACT_APP_APP_NAME,
  tokenName: process.env.REACT_APP_TOKEN_NAME,
  hattersFrontendUrl:
    process.env.REACT_APP_HATTERS_ENV === 'staging'
      ? 'https://auth.dataswift.net'
      : 'https://hatters.dataswift.io',
  hattersBackendUrl:
    process.env.REACT_APP_HATTERS_ENV === 'staging'
      ? 'https://one.dataswift.net/auth'
      : 'https://hatters.dataswift.io',
};
