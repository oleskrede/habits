
export const habitsApiUrl = 'http://0.0.0.0:8080/habits'

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