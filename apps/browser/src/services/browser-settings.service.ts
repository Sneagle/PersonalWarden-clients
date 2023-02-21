import { BehaviorSubject } from "rxjs";

import { AccountSettingsSettings } from "@personalwarden/common/models/domain/account";
import { SettingsService } from "@personalwarden/common/services/settings.service";

import { sessionSync } from "../decorators/session-sync-observable";

export class BrowserSettingsService extends SettingsService {
  @sessionSync({ initializer: (obj: string[][]) => obj })
  protected _settings: BehaviorSubject<AccountSettingsSettings>;
}
