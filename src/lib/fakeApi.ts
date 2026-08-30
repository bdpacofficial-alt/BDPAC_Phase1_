export function fakeApiCall<T>(data: T, delayMs: number = 800): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delayMs);
  });
}
