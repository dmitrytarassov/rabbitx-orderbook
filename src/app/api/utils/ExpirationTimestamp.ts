import { DateTime } from "luxon";
import { SIGNATURE_LIFETIME } from "@/app/utils/constants"; // You'll need to install 'luxon' package for date and time manipulation

export class ExpirationTimestamp {
  private _currentTimestamp = 0;

  public get currentTimestamp(): number {
    if (this._currentTimestamp === 0) {
      this._currentTimestamp = Math.floor(DateTime.now().toMillis() / 1000);
    }
    return this._currentTimestamp;
  }

  public get expirationTimestamp(): number {
    return this.currentTimestamp + SIGNATURE_LIFETIME;
  }
}
