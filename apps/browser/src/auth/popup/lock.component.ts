import { Component, NgZone } from "@angular/core";
import { Router } from "@angular/router";

import { LockComponent as BaseLockComponent } from "@personalwarden/angular/auth/components/lock.component";
import { ApiService } from "@personalwarden/common/abstractions/api.service";
import { CryptoService } from "@personalwarden/common/abstractions/crypto.service";
import { EnvironmentService } from "@personalwarden/common/abstractions/environment.service";
import { I18nService } from "@personalwarden/common/abstractions/i18n.service";
import { LogService } from "@personalwarden/common/abstractions/log.service";
import { MessagingService } from "@personalwarden/common/abstractions/messaging.service";
import { PlatformUtilsService } from "@personalwarden/common/abstractions/platformUtils.service";
import { StateService } from "@personalwarden/common/abstractions/state.service";
import { VaultTimeoutService } from "@personalwarden/common/abstractions/vaultTimeout/vaultTimeout.service";
import { VaultTimeoutSettingsService } from "@personalwarden/common/abstractions/vaultTimeout/vaultTimeoutSettings.service";
import { AuthService } from "@personalwarden/common/auth/abstractions/auth.service";
import { KeyConnectorService } from "@personalwarden/common/auth/abstractions/key-connector.service";
import { AuthenticationStatus } from "@personalwarden/common/auth/enums/authentication-status";

import { BiometricErrors, BiometricErrorTypes } from "../../models/biometricErrors";

@Component({
  selector: "app-lock",
  templateUrl: "lock.component.html",
})
export class LockComponent extends BaseLockComponent {
  private isInitialLockScreen: boolean;

  biometricError: string;
  pendingBiometric = false;

  constructor(
    router: Router,
    i18nService: I18nService,
    platformUtilsService: PlatformUtilsService,
    messagingService: MessagingService,
    cryptoService: CryptoService,
    vaultTimeoutService: VaultTimeoutService,
    vaultTimeoutSettingsService: VaultTimeoutSettingsService,
    environmentService: EnvironmentService,
    stateService: StateService,
    apiService: ApiService,
    logService: LogService,
    keyConnectorService: KeyConnectorService,
    ngZone: NgZone,
    private authService: AuthService
  ) {
    super(
      router,
      i18nService,
      platformUtilsService,
      messagingService,
      cryptoService,
      vaultTimeoutService,
      vaultTimeoutSettingsService,
      environmentService,
      stateService,
      apiService,
      logService,
      keyConnectorService,
      ngZone
    );
    this.successRoute = "/tabs/current";
    this.isInitialLockScreen = (window as any).previousPopupUrl == null;
  }

  async ngOnInit() {
    await super.ngOnInit();
    const disableAutoBiometricsPrompt =
      (await this.stateService.getDisableAutoBiometricsPrompt()) ?? true;

    window.setTimeout(async () => {
      document.getElementById(this.pinLock ? "pin" : "masterPassword").focus();
      if (
        this.biometricLock &&
        !disableAutoBiometricsPrompt &&
        this.isInitialLockScreen &&
        (await this.authService.getAuthStatus()) === AuthenticationStatus.Locked
      ) {
        await this.unlockBiometric();
      }
    }, 100);
  }

  async unlockBiometric(): Promise<boolean> {
    if (!this.biometricLock) {
      return;
    }

    this.pendingBiometric = true;
    this.biometricError = null;

    let success;
    try {
      success = await super.unlockBiometric();
    } catch (e) {
      const error = BiometricErrors[e as BiometricErrorTypes];

      if (error == null) {
        this.logService.error("Unknown error: " + e);
      }

      this.biometricError = this.i18nService.t(error.description);
    }
    this.pendingBiometric = false;

    return success;
  }
}
