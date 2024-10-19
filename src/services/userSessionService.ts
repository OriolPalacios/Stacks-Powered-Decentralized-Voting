import { AppConfig, UserSession } from '@stacks/connect';

const appConfig = new AppConfig(['store_write']);
const userSession = new UserSession({ appConfig });

export const isLoggedIn = () => userSession.isUserSignedIn();

export const getWalletAddress = () => {
  if (isLoggedIn()) {
    return userSession.loadUserData().profile.stxAddress.testnet;
  }
  return null;
};

