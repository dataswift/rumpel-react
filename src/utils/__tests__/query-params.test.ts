import * as queryString from 'query-string';

describe.only('query parameters', () => {
  type Query = {
    token?: string;
    application_id?: string;
    redirect_uri?: string;
    fallback?: string;
    dependencies?: string;
  };

  it('should return the correct value from one parameter', () => {
    // @ts-ignore
    global.window = Object.create(window);
    const search = '?application_id=testapp';
    Object.defineProperty(window, 'location', {
      value: {
        search: search,
      },
      writable: true,
    });

    const { application_id } = queryString.parse(window.location.search) as Query;

    expect(application_id).toEqual('testapp');
  });

  it('should return the correct value from more than one parameter', () => {
    // @ts-ignore
    global.window = Object.create(window);
    const search = '?application_id=testapp&redirect_uri=https://docs.dataswift.io';
    Object.defineProperty(window, 'location', {
      value: {
        search: search,
      },
      writable: true,
    });

    const { application_id, redirect_uri } = queryString.parse(window.location.search) as Query;

    expect(application_id).toEqual('testapp');
    expect(redirect_uri).toEqual('https://docs.dataswift.io');
  });

  it('should return the correct value when one parameter is missing value', () => {
    // @ts-ignore
    global.window = Object.create(window);
    const search = '?application_id=&redirect_uri=https://docs.dataswift.io';
    Object.defineProperty(window, 'location', {
      value: {
        search: search,
      },
      writable: true,
    });

    const { application_id, redirect_uri } = queryString.parse(window.location.search) as Query;

    expect(application_id).toEqual('');
    expect(redirect_uri).toEqual('https://docs.dataswift.io');
  });

  it('should return the correct value when one parameter is missing', () => {
    // @ts-ignore
    global.window = Object.create(window);
    const search = '?redirect_uri=https://docs.dataswift.io';
    Object.defineProperty(window, 'location', {
      value: {
        search: search,
      },
      writable: true,
    });

    const { application_id, redirect_uri } = queryString.parse(window.location.search) as Query;

    expect(application_id).toEqual(undefined);
    expect(redirect_uri).toEqual('https://docs.dataswift.io');
  });

  it('should return the correct value when one parameter contain commas', () => {
    // @ts-ignore
    global.window = Object.create(window);
    const search = '?application_id=testapp&dependencies=facebook,twitter&redirect_uri=https://docs.dataswift.io';
    Object.defineProperty(window, 'location', {
      value: {
        search: search,
      },
      writable: true,
    });

    const { application_id, redirect_uri, dependencies } = queryString.parse(window.location.search) as Query;

    expect(application_id).toEqual('testapp');
    expect(redirect_uri).toEqual('https://docs.dataswift.io');
    expect(dependencies).toEqual('facebook,twitter');
  });

  it('should return the correct value when one parameter has nested query parameter', () => {
    // @ts-ignore
    global.window = Object.create(window);
    const search =
      '?application_id=testapp&fallback=https://fallback.com&redirect_uri=https://docs.dataswift.io%3Fredirect=https://nested-redirect.com';
    Object.defineProperty(window, 'location', {
      value: {
        search: search,
      },
      writable: true,
    });

    const { application_id, fallback, redirect_uri } = queryString.parse(window.location.search) as Query;

    expect(application_id).toEqual('testapp');
    expect(fallback).toEqual('https://fallback.com');
    expect(redirect_uri).toEqual('https://docs.dataswift.io?redirect=https://nested-redirect.com');
  });

  it('should return the correct value when parameter have hashes', () => {
    // @ts-ignore
    global.window = Object.create(window);
    const search =
      '?application_id=testapp&fallback=https://testing.hubat.net/#/feed&redirect_uri=https://docs.dataswift.io%3Fredirect=https://testing.hubat.net/#/feed';
    Object.defineProperty(window, 'location', {
      value: {
        search: search,
      },
      writable: true,
    });

    const { application_id, fallback, redirect_uri } = queryString.parse(window.location.search) as Query;

    expect(application_id).toEqual('testapp');
    expect(fallback).toEqual('https://testing.hubat.net/#/feed');
    expect(redirect_uri).toEqual('https://docs.dataswift.io?redirect=https://testing.hubat.net/#/feed');
  });

  it('should return the correct value when url hashes are encoded', () => {
    // @ts-ignore
    global.window = Object.create(window);
    const search =
      '?application_id=testapp&fallback=https://testing.hubat.net/%23/feed&redirect_uri=https://docs.dataswift.io%3Fredirect=https://testing.hubat.net/%23/feed';
    Object.defineProperty(window, 'location', {
      value: {
        search: search,
      },
      writable: true,
    });

    const { application_id, fallback, redirect_uri } = queryString.parse(window.location.search) as Query;

    expect(application_id).toEqual('testapp');
    expect(fallback).toEqual('https://testing.hubat.net/#/feed');
    expect(redirect_uri).toEqual('https://docs.dataswift.io?redirect=https://testing.hubat.net/#/feed');
  });
});
