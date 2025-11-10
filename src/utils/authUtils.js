const protectedRoutes = ['/market', '/my'];
const ghestOnlyRoutes = ['/sign-in', '/sign-up', '/oauth'];

function isProtectedPath(pathname) {
  return protectedRoutes.some(
    route => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isGhestOnlyPath(pathname) {
  return ghestOnlyRoutes.some(
    route => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function getPathType(pathname) {
  if (pathname === '/') return 'ghestOnly';
  if (isProtectedPath(pathname)) return 'protected';
  if (isGhestOnlyPath(pathname)) return 'ghestOnly';
  if (pathname === '/') return 'ghestOnly';
  return 'free';
}
