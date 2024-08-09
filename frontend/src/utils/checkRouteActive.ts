const checkRouteActive = (
  path: string,
  currentPath: string = '',
  id: number = 0
) => {
  if (currentPath === '') {
    currentPath = window.location.pathname;
  }
  if (path === '/') {
    return path === currentPath;
  }

  if (id) {
    return currentPath.includes(`/${id}/`) && currentPath.includes(path);
  } else {
    return currentPath.includes(path);
  }
};

export default checkRouteActive;
