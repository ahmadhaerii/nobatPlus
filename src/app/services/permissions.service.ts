import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  permissionsSchema: string[] = [];
  public get can() {
    const permissionsSchema = localStorage.getItem('accessRoles')?.split(',');
    return function (subject: string) {
      return permissionsSchema?.includes(subject);
    };
  }
}
