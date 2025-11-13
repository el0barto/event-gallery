// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

const handleAuth: Handle = async ({ event, resolve }) => {
  // 🚫 Si estamos en build/prerender, no ejecutar nada de base de datos
  if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
    return resolve(event);
  }

  const sessionToken = event.cookies.get(auth.sessionCookieName);
  if (!sessionToken) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await auth.validateSessionToken(sessionToken);

  if (session) {
    auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
  } else {
    auth.deleteSessionTokenCookie(event);
  }

  event.locals.user = user;
  event.locals.session = session;
  return resolve(event);
};

export const handle: Handle = handleAuth;
