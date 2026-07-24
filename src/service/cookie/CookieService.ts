import Cookies from 'js-cookie';

const CookieService = {
  getToken(name: string): string | undefined {
    return Cookies.get(name);
  },
  
  set(name: string, value: string, domain?: string, expires?: number): void {
    Cookies.set(name, value, {
      domain: domain || undefined,
      expires: expires || undefined,
      path: '/'
    });
  },

  remove(name: string, domain?: string): void {
    Cookies.remove(name, {
      domain: domain || undefined,
      path: '/'
    });
  }
};

export default CookieService;
