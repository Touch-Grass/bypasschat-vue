export function useUserData(data: object) {
  const newData: object = JSON.parse(JSON.stringify(data));
  return newData;
}
