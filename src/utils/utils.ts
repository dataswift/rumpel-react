export const buildRequestURL = (url: string, params?: {[key: string]: string}) => {
  if (!params) return url;

  const esc = encodeURIComponent;
  const query = Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');

  if (!query) return url;

  return url + ((url.indexOf('?') !== -1) ? '&' + query : '?' + query);
};

export const getMobileOperatingSystem = () => {
  const userAgent = navigator.userAgent || navigator.vendor;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'windows Phone';
  }

  if (/Windows/.test(userAgent)) {
    return 'windows';
  }

  if (/android/i.test(userAgent)) {
    return 'android';
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'ios';
  }

  if (/Mac/.test(userAgent)) {
    return 'macintosh';
  }

  return 'unknown';
};

export const getParameterByName = (variable: string): string | null => {
  const query = window.location.search.substring(1);
  const vars = query.split('&');

  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return null;
};
