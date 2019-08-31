import Vue from "vue";
import AWSAppSyncClient from "aws-appsync";
import VueApollo from "vue-apollo";
import AppSyncConfig from "./aws-exports";

const config = {
  url: AppSyncConfig.graphqlEndpoint,
  region: AppSyncConfig.region,
  auth: {
    type: AppSyncConfig.authType,
    apiKey: AppSyncConfig.apiKey
  }
};

const options = {
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network"
    }
  }
};

const client = new AWSAppSyncClient(config, options);

const apolloProvider = new VueApollo({
  defaultClient: client
});

Vue.use(VueApollo);

export default apolloProvider;
