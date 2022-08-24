// <script lang="ts" setup>
export function useUserData(data: object) {
  const newData: object = JSON.parse(JSON.stringify(data));
  return newData;
}

// import { database } from "../../assets/typescript/firebase";
// import { ref as dbref, get, child } from "firebase/database";
// export function getUserData(id: any, items: any[]) {
//   let userRef = dbref(database, `/Users/${id}`);
//   items.forEach((item: any) => {
//     get(child(userRef, item)).then((data: any) => {
//       console.log(data);
//     });
//   });
// }

// </script>
