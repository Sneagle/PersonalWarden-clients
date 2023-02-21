import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { SsoComponent as BaseSsoComponent } from "@personalwarden/angular/auth/components/sso.component";
import { ApiService } from "@personalwarden/common/abstractions/api.service";
import { CryptoFunctionService } from "@personalwarden/common/abstractions/cryptoFunction.service";
import { EnvironmentService } from "@personalwarden/common/abstractions/environment.service";
import { I18nService } from "@personalwarden/common/abstractions/i18n.service";
import { LogService } from "@personalwarden/common/abstractions/log.service";
import { PasswordGenerationService } from "@personalwarden/common/abstractions/passwordGeneration.service";
import { PlatformUtilsService } from "@personalwarden/common/abstractions/platformUtils.service";
import { StateService } from "@personalwarden/common/abstractions/state.service";
import { VaultTimeoutService } from "@personalwarden/common/abstractions/vaultTimeout/vaultTimeout.service";
import { AuthService } from "@personalwarden/common/auth/abstractions/auth.service";
import { AuthenticationStatus } from "@personalwarden/common/auth/enums/authentication-status";
import { SyncService } from "@personalwarden/common/vault/abstractions/sync/sync.service.abstraction";

import { BrowserApi } from "../../browser/browserApi";

@Component({
  selector: "app-sso",
  templateUrl: "sso.component.html",
})
export class SsoComponent extends BaseSsoComponent {
  constructor(
    authService: AuthService,
    router: Router,
    i18nService: I18nService,
    route: ActivatedRoute,
    stateService: StateService,
    platformUtilsService: PlatformUtilsService,
    apiService: ApiService,
    cryptoFunctionService: CryptoFunctionService,
    passwordGenerationService: PasswordGenerationService,
    syncService: SyncService,
    environmentService: EnvironmentService,
    logService: LogService,
    private vaultTimeoutService: VaultTimeoutService
  ) {
    super(
      authService,
      router,
      i18nService,
      route,
      stateService,
      platformUtilsService,
      apiService,
      cryptoFunctionService,
      environmentService,
      passwordGenerationService,
      logService
    );

    const url = this.environmentService.getWebVaultUrl();

    this.redirectUri = url + "/sso-connector.html";
    this.clientId = "browser";

    super.onSuccessfulLogin = async () => {
      await syncService.fullSync(true);

      // If the vault is unlocked then this will clear keys from memory, which we don't want to do
      if ((await this.authService.getAuthStatus()) !== AuthenticationStatus.Unlocked) {
        BrowserApi.reloadOpenWindows();
      }

      const thisWindow = window.open("", "_self");
      thisWindow.close();
    };
  }
}
