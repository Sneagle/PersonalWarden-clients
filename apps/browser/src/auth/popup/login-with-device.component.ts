import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { LoginWithDeviceComponent as BaseLoginWithDeviceComponent } from "@personalwarden/angular/auth/components/login-with-device.component";
import { AnonymousHubService } from "@personalwarden/common/abstractions/anonymousHub.service";
import { ApiService } from "@personalwarden/common/abstractions/api.service";
import { AppIdService } from "@personalwarden/common/abstractions/appId.service";
import { CryptoService } from "@personalwarden/common/abstractions/crypto.service";
import { CryptoFunctionService } from "@personalwarden/common/abstractions/cryptoFunction.service";
import { EnvironmentService } from "@personalwarden/common/abstractions/environment.service";
import { I18nService } from "@personalwarden/common/abstractions/i18n.service";
import { LogService } from "@personalwarden/common/abstractions/log.service";
import { PasswordGenerationService } from "@personalwarden/common/abstractions/passwordGeneration.service";
import { PlatformUtilsService } from "@personalwarden/common/abstractions/platformUtils.service";
import { StateService } from "@personalwarden/common/abstractions/state.service";
import { ValidationService } from "@personalwarden/common/abstractions/validation.service";
import { AuthService } from "@personalwarden/common/auth/abstractions/auth.service";
import { LoginService } from "@personalwarden/common/auth/abstractions/login.service";
import { SyncService } from "@personalwarden/common/vault/abstractions/sync/sync.service.abstraction";

@Component({
  selector: "app-login-with-device",
  templateUrl: "login-with-device.component.html",
})
export class LoginWithDeviceComponent
  extends BaseLoginWithDeviceComponent
  implements OnInit, OnDestroy
{
  constructor(
    router: Router,
    cryptoService: CryptoService,
    cryptoFunctionService: CryptoFunctionService,
    appIdService: AppIdService,
    passwordGenerationService: PasswordGenerationService,
    apiService: ApiService,
    authService: AuthService,
    logService: LogService,
    environmentService: EnvironmentService,
    i18nService: I18nService,
    platformUtilsService: PlatformUtilsService,
    anonymousHubService: AnonymousHubService,
    validationService: ValidationService,
    stateService: StateService,
    loginService: LoginService,
    syncService: SyncService
  ) {
    super(
      router,
      cryptoService,
      cryptoFunctionService,
      appIdService,
      passwordGenerationService,
      apiService,
      authService,
      logService,
      environmentService,
      i18nService,
      platformUtilsService,
      anonymousHubService,
      validationService,
      stateService,
      loginService
    );
    super.onSuccessfulLogin = async () => {
      await syncService.fullSync(true);
    };
  }
}
