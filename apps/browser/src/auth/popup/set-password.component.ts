import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { SetPasswordComponent as BaseSetPasswordComponent } from "@personalwarden/angular/components/set-password.component";
import { ApiService } from "@personalwarden/common/abstractions/api.service";
import { CryptoService } from "@personalwarden/common/abstractions/crypto.service";
import { I18nService } from "@personalwarden/common/abstractions/i18n.service";
import { MessagingService } from "@personalwarden/common/abstractions/messaging.service";
import { OrganizationUserService } from "@personalwarden/common/abstractions/organization-user/organization-user.service";
import { OrganizationApiServiceAbstraction } from "@personalwarden/common/abstractions/organization/organization-api.service.abstraction";
import { PasswordGenerationService } from "@personalwarden/common/abstractions/passwordGeneration.service";
import { PlatformUtilsService } from "@personalwarden/common/abstractions/platformUtils.service";
import { PolicyApiServiceAbstraction } from "@personalwarden/common/abstractions/policy/policy-api.service.abstraction";
import { PolicyService } from "@personalwarden/common/abstractions/policy/policy.service.abstraction";
import { StateService } from "@personalwarden/common/abstractions/state.service";
import { SyncService } from "@personalwarden/common/vault/abstractions/sync/sync.service.abstraction";

@Component({
  selector: "app-set-password",
  templateUrl: "set-password.component.html",
})
export class SetPasswordComponent extends BaseSetPasswordComponent {
  constructor(
    apiService: ApiService,
    i18nService: I18nService,
    cryptoService: CryptoService,
    messagingService: MessagingService,
    stateService: StateService,
    passwordGenerationService: PasswordGenerationService,
    platformUtilsService: PlatformUtilsService,
    policyApiService: PolicyApiServiceAbstraction,
    policyService: PolicyService,
    router: Router,
    syncService: SyncService,
    route: ActivatedRoute,
    organizationApiService: OrganizationApiServiceAbstraction,
    organizationUserService: OrganizationUserService
  ) {
    super(
      i18nService,
      cryptoService,
      messagingService,
      passwordGenerationService,
      platformUtilsService,
      policyApiService,
      policyService,
      router,
      apiService,
      syncService,
      route,
      stateService,
      organizationApiService,
      organizationUserService
    );
  }
}
