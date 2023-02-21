import { Component, NgZone } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { LoginComponent as BaseLoginComponent } from "@personalwarden/angular/auth/components/login.component";
import { ApiService } from "@personalwarden/common/abstractions/api.service";
import { AppIdService } from "@personalwarden/common/abstractions/appId.service";
import { CryptoFunctionService } from "@personalwarden/common/abstractions/cryptoFunction.service";
import { EnvironmentService } from "@personalwarden/common/abstractions/environment.service";
import { FormValidationErrorsService } from "@personalwarden/common/abstractions/formValidationErrors.service";
import { I18nService } from "@personalwarden/common/abstractions/i18n.service";
import { LogService } from "@personalwarden/common/abstractions/log.service";
import { PasswordGenerationService } from "@personalwarden/common/abstractions/passwordGeneration.service";
import { PlatformUtilsService } from "@personalwarden/common/abstractions/platformUtils.service";
import { StateService } from "@personalwarden/common/abstractions/state.service";
import { AuthService } from "@personalwarden/common/auth/abstractions/auth.service";
import { LoginService } from "@personalwarden/common/auth/abstractions/login.service";
import { Utils } from "@personalwarden/common/misc/utils";
import { SyncService } from "@personalwarden/common/vault/abstractions/sync/sync.service.abstraction";

import { flagEnabled } from "../../flags";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
})
export class LoginComponent extends BaseLoginComponent {
  showPasswordless = false;
  constructor(
    apiService: ApiService,
    appIdService: AppIdService,
    authService: AuthService,
    router: Router,
    protected platformUtilsService: PlatformUtilsService,
    protected i18nService: I18nService,
    protected stateService: StateService,
    protected environmentService: EnvironmentService,
    protected passwordGenerationService: PasswordGenerationService,
    protected cryptoFunctionService: CryptoFunctionService,
    syncService: SyncService,
    logService: LogService,
    ngZone: NgZone,
    formBuilder: FormBuilder,
    formValidationErrorService: FormValidationErrorsService,
    route: ActivatedRoute,
    loginService: LoginService
  ) {
    super(
      apiService,
      appIdService,
      authService,
      router,
      platformUtilsService,
      i18nService,
      stateService,
      environmentService,
      passwordGenerationService,
      cryptoFunctionService,
      logService,
      ngZone,
      formBuilder,
      formValidationErrorService,
      route,
      loginService
    );
    super.onSuccessfulLogin = async () => {
      await syncService.fullSync(true);
    };
    super.successRoute = "/tabs/vault";
    this.showPasswordless = flagEnabled("showPasswordless");

    if (this.showPasswordless) {
      this.formGroup.controls.email.setValue(this.loginService.getEmail());
      this.formGroup.controls.rememberEmail.setValue(this.loginService.getRememberEmail());
      this.validateEmail();
    }
  }

  settings() {
    this.router.navigate(["environment"]);
  }

  async launchSsoBrowser() {
    await this.loginService.saveEmailSettings();
    // Generate necessary sso params
    const passwordOptions: any = {
      type: "password",
      length: 64,
      uppercase: true,
      lowercase: true,
      numbers: true,
      special: false,
    };

    const state =
      (await this.passwordGenerationService.generatePassword(passwordOptions)) +
      ":clientId=browser";
    const codeVerifier = await this.passwordGenerationService.generatePassword(passwordOptions);
    const codeVerifierHash = await this.cryptoFunctionService.hash(codeVerifier, "sha256");
    const codeChallenge = Utils.fromBufferToUrlB64(codeVerifierHash);

    await this.stateService.setSsoCodeVerifier(codeVerifier);
    await this.stateService.setSsoState(state);

    let url = this.environmentService.getWebVaultUrl();
    if (url == null) {
      url = "https://vault.personalwarden.com";
    }

    const redirectUri = url + "/sso-connector.html";

    // Launch browser
    this.platformUtilsService.launchUri(
      url +
        "/#/sso?clientId=browser" +
        "&redirectUri=" +
        encodeURIComponent(redirectUri) +
        "&state=" +
        state +
        "&codeChallenge=" +
        codeChallenge +
        "&email=" +
        encodeURIComponent(this.formGroup.controls.email.value)
    );
  }
}
