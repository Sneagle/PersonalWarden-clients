import { Injectable } from "@angular/core";

import { LockGuard as BaseLockGuardService } from "@personalwarden/angular/auth/guards/lock.guard";

@Injectable()
export class LockGuardService extends BaseLockGuardService {
  protected homepage = "tabs/current";
}
