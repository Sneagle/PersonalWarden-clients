import { Component } from "@angular/core";

import { UpdateTempPasswordComponent as BaseUpdateTempPasswordComponent } from "@personalwarden/angular/auth/components/update-temp-password.component";
import { ApiService } from "@personalwarden/common/abstractions/api.service";
import { CryptoService } from "@personalwarden/common/abstractions/crypto.service";
import { I18nService } from "@personalwarden/common/abstractions/i18n.service";
import { LogService } from "@personalwarden/common/abstractions/log.service";
import { MessagingService } from "@personalwarden/common/abstractions/messaging.service";
import { PasswordGenerationService } from "@personalwarden/common/abstractions/passwordGeneration.service";
import { PlatformUtilsService } from "@personalwarden/common/abstractions/platformUtils.service";
import { PolicyService } from "@personalwarden/common/abstractions/policy/policy.service.abstraction";
import { StateService } from "@personalwarden/common/abstractions/state.service";
import { SyncService } from "@personalwarden/common/vault/abstractions/sync/sync.service.abstraction";

@Component({
  selector: "app-update-temp-password",
  templateUrl: "update-temp-password.component.html",
})
export class UpdateTempPasswordComponent extends BaseUpdateTempPasswordComponent {
  constructor(
    i18nService: I18nService,
    platformUtilsService: PlatformUtilsService,
    passwordGenerationService: PasswordGenerationService,
    policyService: PolicyService,
    cryptoService: CryptoService,
    stateService: StateService,
    messagingService: MessagingService,
    apiService: ApiService,
    syncService: SyncService,
    logService: LogService
  ) {
    super(
      i18nService,
      platformUtilsService,
      passwordGenerationService,
      policyService,
      cryptoService,
      messagingService,
      apiService,
      stateService,
      syncService,
      logService
    );
  }
}
