import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { HintComponent as BaseHintComponent } from "@personalwarden/angular/auth/components/hint.component";
import { ApiService } from "@personalwarden/common/abstractions/api.service";
import { I18nService } from "@personalwarden/common/abstractions/i18n.service";
import { LogService } from "@personalwarden/common/abstractions/log.service";
import { PlatformUtilsService } from "@personalwarden/common/abstractions/platformUtils.service";
import { LoginService } from "@personalwarden/common/auth/abstractions/login.service";

@Component({
  selector: "app-hint",
  templateUrl: "hint.component.html",
})
export class HintComponent extends BaseHintComponent {
  constructor(
    router: Router,
    platformUtilsService: PlatformUtilsService,
    i18nService: I18nService,
    apiService: ApiService,
    logService: LogService,
    private route: ActivatedRoute,
    loginService: LoginService
  ) {
    super(router, i18nService, apiService, platformUtilsService, logService, loginService);

    super.onSuccessfulSubmit = async () => {
      this.router.navigate([this.successRoute]);
    };
  }
}
