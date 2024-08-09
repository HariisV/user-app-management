export { default as routes } from './routes';

// export const SERVER_URL = 'https://prod.com';
// export const SERVER_URL = 'https://6626-114-122-6-155.ngrok-free.app';

export const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
export const SERVER_URL_API = SERVER_URL + '/api';
export const FRONTEND_URL = '/';

export { adminRoutes } from './route-list';
