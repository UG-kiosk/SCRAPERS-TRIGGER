export const gatewayUrl = process.env.GATEWAY_URL;

export const apiEndpoints = {
  kiosk: "/kiosk-api",
  scrapers: "/scrapers-kiosk-api",
};

export const getUrl = (endpoint: string): string => {
  return `${gatewayUrl}${endpoint}`;
};
