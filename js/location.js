const compileRoute = (route) => {
  const { path } = route;

  const params = [...path.matchAll(/\${(\w+)}/g)];

  const parameterNames = params.map((param) => param[1]);

  const matchablePath = routeMatchablePath(path, params);

  return { parameterNames, matchablePath, ...route };
};

const routeMatchablePath = (path, params) => {
  if (!params || !params.length) {
    return `${path}$`;
  }

  const searchForParamPlaceholdersRegex = new RegExp(
    params.map((param) => `\\${param[0]}`).join("|")
  );

  return `${path.replace(searchForParamPlaceholdersRegex, "(\\w+)")}$`;
};

const matchRoute = (compiledRoute) => {
  const { matchablePath, parameterNames } = compiledRoute;
  const { pathname } = window.location;

  if (!parameterNames.length) {
    const matches = pathname.match(matchablePath) !== null;

    return [matches, null];
  }

  const parameterValuesRegex = new RegExp(matchablePath, "g");

  const parameterValues = [...pathname.matchAll(parameterValuesRegex)];

  const parameters = parameterValues.reduce(
    (parameterMap, parameterValue, index) => {
      parameterMap[parameterNames[index]] = parameterValue[1];

      return parameterMap;
    },
    {}
  );

  const matches = parameterValues.length > 0;

  return [matches, parameters];
};

const findMatchingRoute = (compiledRoutes) => {
  for (const compiledRoute of compiledRoutes) {
    const [matches, parameters] = matchRoute(compiledRoute);

    if (matches) {
      return [compiledRoute.name, parameters];
    }
  }

  return null;
};

export const configureRouter = (routes) => (onRouteMatched, onNotFound) => {
  const compiledRoutes = routes.map(compileRoute);

  const callback = (match) => {
    if (!match) {
      onNotFound && onNotFound();

      return;
    }

    const [routeName, parameters] = match;

    onRouteMatched && onRouteMatched(routeName, parameters);
  };

  window.addEventListener("load", () => {
    const match = findMatchingRoute(compiledRoutes);
    callback(match);
  });

  window.addEventListener("popstate", () => {
    const match = findMatchingRoute(compiledRoutes);
    callback(match);
  });

  /**
   *
   * @param {string} url
   * @returns
   */
  const goTo = (url) => {
    if (!window.history) {
      return;
    }

    window.history.pushState({}, "", url);

    const match = findMatchingRoute(compiledRoutes);

    callback(match);
  };

  return goTo;
};
