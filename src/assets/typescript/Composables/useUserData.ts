export function useUserData(data: object): object {
  const newData: object = JSON.parse(JSON.stringify(data));
  return newData;
}
