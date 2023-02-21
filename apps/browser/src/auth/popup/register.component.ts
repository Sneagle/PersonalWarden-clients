import { Component } from "@angular/core";
import { UntypedFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { RegisterComponent as BaseRegisterComponent } from "@personalwarden/angular/components/register.component";
import { ApiService } from "@personalwarden/common/abstractions/api.service";
import { AuditService } from "@personalwarden/common/abstractions/audit.service";
import { CryptoService } from "@personalwarden/common/abstractions/crypto.service";
import { EnvironmentService } from "@personalwarden/common/abstractions/environment.service";
import { FormValidationErrorsService } from "@personalwarden/common/abstractions/formValidationErrors.service";
import { I18nService } from "@personalwarden/common/abstractions/i18n.service";
import { LogService } from "@personalwarden/common/abstractions/log.service";
import { PasswordGenerationService } from "@personalwarden/common/abstractions/passwordGeneration.service";
import { PlatformUtilsService } from "@personalwarden/common/abstractions/platformUtils.service";
import { StateService } from "@personalwarden/common/abstractions/state.service";
import { AuthService } from "@personalwarden/common/auth/abstractions/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "register.component.html",
})
export class RegisterComponent extends BaseRegisterComponent {
  color: string;
  text: string;

  constructor(
    formValidationErrorService: FormValidationErrorsService,
    formBuilder: UntypedFormBuilder,
    authService: AuthService,
    router: Router,
    i18nService: I18nService,
    cryptoService: CryptoService,
    apiService: ApiService,
    stateService: StateService,
    platformUtilsService: PlatformUtilsService,
    passwordGenerationService: PasswordGenerationService,
    environmentService: EnvironmentService,
    logService: LogService,
    auditService: AuditService
  ) {
    super(
      formValidationErrorService,
      formBuilder,
      authService,
      router,
      i18nService,
      cryptoService,
      apiService,
      stateService,
      platformUtilsService,
      passwordGenerationService,
      environmentService,
      logService,
      auditService
    );
  }
}
