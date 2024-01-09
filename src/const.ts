export const ROUTES = {
  HOME: '/',
  VR: '/vr',
  MARKER: '/marker',
  MODEL_VIEWER: '/model-viewer',
  PROBLEM: '/problem',
}

export const WEBSITE_URL = 'https://pw-ar.vercel.app';
export const REDIRECT_URL = 'https://pw-ar.vercel.app/problem';

interface Messages {
  TITLE: string;
  DESCRIPTION: string;
  VIEW_IN_AR_TEXT: string;
  WELCOME_DIALOG_BUTTON: string;
}

export const MESSAGES: Messages = {
  TITLE: 'Astronaut',
  DESCRIPTION: 'Astronaut',
  VIEW_IN_AR_TEXT: 'View 3D on your phone',
  WELCOME_DIALOG_BUTTON: 'Start',
}
