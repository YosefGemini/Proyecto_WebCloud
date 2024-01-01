export function get_token(): string | null {
    return localStorage.getItem("token");
  }
  export function set_token(token: string): void {
    localStorage.setItem("token", token);
  }
  export function remove_token(): void {
    localStorage.removeItem("token");
  }
  interface DateTime {
    day: string;
    time: string;
  }
  export function format_date(date: Date): DateTime {
    const locale = "en-GB";
    const date_ = new Date(date);
    const day = date_.toLocaleDateString(locale);
    const time = date_.toLocaleTimeString(locale);
    return { day, time };
  }