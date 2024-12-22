export function getTokenExpiry(accessToken) {
  const accessTokenData = JSON.parse(
    atob(accessToken.split(".")[1]),
  );
  return accessTokenData.exp;
}

export function isAccessTokenExpiring(accessToken) {
  const now = Date.now() / 1000;
  const exp = getTokenExpiry(accessToken);

  return exp - 3600 < now;
}
