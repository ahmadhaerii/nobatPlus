import { Injectable } from '@angular/core';
import BaseItemDS from './base/baseItemDS';
import { isEmpty } from '../../utils/object';
import ProfileDM from '../dataModels/profileDM';
import { ProfileApiService } from 'src/app/api/profile-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileDS extends BaseItemDS<ProfileDM> {
  constructor(private profileApi: ProfileApiService) {
    super();
    this.onInitialization();
  }

  async onInitialization() {
    this.itemsWatch.subscribe((items) => {
      //
    });
  }

  async register(profileMobileNo: string) {
    return await this.profileApi.Register(profileMobileNo);
  }

  async confirm(profileMobileNo: string, confirmCode: number) {
    return await this.profileApi.Confirm(profileMobileNo, confirmCode);
  }

  async setInfo(
    profileMobileNo: string,
    password: string,
    nationalID: string,
    name: string,
    lastName: string,
    fatherName: string
  ) {
    return await this.profileApi.SetInfo(
      profileMobileNo,
      password,
      nationalID,
      name,
      lastName,
      fatherName
    );
  }

  async login(profileMobileNo: string, password: string) {
    return await this.profileApi.Login(profileMobileNo, password);
  }

  async forgotPassword(profileMobileNo: string) {
    return await this.profileApi.ForgotPassword(profileMobileNo);
  }

  async changePassword(
    profileMobileNo: string,
    confirmCode: number,
    password: string
  ) {
    return await this.profileApi.ChangePassword(
      profileMobileNo,
      confirmCode,
      password
    );
  }

  async doLoad(force: boolean) {
    if (force || isEmpty(this.items)) {
      this.deleteAllItems();
      return;
    } else {
      return this.items;
    }
  }
}
