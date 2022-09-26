import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as uuid from "uuid";

@Injectable({
  providedIn: 'root'
})
export class AESEncDecServiceService {
  secretKey!: string;
  testString!: string;

  constructor() {
    //this.secretKey = CryptoJS.lib.WordArray.random(16).toString();
    this.secretKey = uuid.v4().substring(uuid.v4().lastIndexOf("-")+1, uuid.v4().length);
  }

  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt: string): string {
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}
