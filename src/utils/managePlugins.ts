import { ApolloServerPluginLandingPageProductionDefault } from "@apollo/server/plugin/landingPage/default";

export const managePlugins = () => {
  const plugins = []
  if(process.env.NODE_ENV === 'prd') plugins.push(ApolloServerPluginLandingPageProductionDefault())
  return plugins
}