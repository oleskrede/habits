
// export const HABITS_API_URL = 'http://127.0.0.1:8080/habits'
export const HABITS_API_URL = 'https://dsk-habits.fly.dev/habits'

export function randomId(length: number = 12): string {
    let id = '';
    const charPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const poolSize = charPool.length;
    let counter = 0;
    while (counter < length) {
      id += charPool.charAt(Math.floor(Math.random() * poolSize));
      counter += 1;
    }
    return id;
}

export function getIdFromUrlPath(): string {
    return window.location.pathname.replace("/", "")
}