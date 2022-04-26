// import { Permissions } from '../../../common/datasAux/datas';

// export class PermissionService {
//   permissions = Permissions.permissions;

//   getPermissions() {
//     return this.permissions;
//   }

//   sumPermissions(permissions: any[]) {
//     let sum = 0;
//     permissions.forEach((perm: any) => {
//       if (perm.visible) {
//         sum += perm.value;
//       }
//     });
//     return sum;
//   }

//   getTotalSumPermissions() {
//     let sum = 0;
//     this.permissions.forEach((perm: any) => (sum += perm.value));
//     return sum;
//   }

//   loadPermissions(bits = 0) {
//     const permissions: any = {},
//       permObj: any = this.permissions;
//     permObj.forEach((perm: any) => {
//       permissions[perm.title] = (+bits & perm.value) === perm.value;
//     });
//     return permissions;
//   }
// }
