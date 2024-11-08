const updateUrlParams = (newParams, callback) => {
  const url = new URL(window.location);
  const params = new URLSearchParams(url.search);

  Object.keys(newParams).forEach((key) => {
    params.set(key, newParams[key]);
  });

  url.search = params.toString();
  window.history.pushState({}, '', url);

  const paramsObj = Object.fromEntries(params.entries());
  callback(paramsObj);
};

export default updateUrlParams;
