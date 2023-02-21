import { Location } from "@angular/common";
import { Component } from "@angular/core";

import { PasswordGeneratorHistoryComponent as BasePasswordGeneratorHistoryComponent } from "@personalwarden/angular/components/password-generator-history.component";
import { I18nService } from "@personalwarden/common/abstractions/i18n.service";
import { PasswordGenerationService } from "@personalwarden/common/abstractions/passwordGeneration.service";
import { PlatformUtilsService } from "@personalwarden/common/abstractions/platformUtils.service";

@Component({
  selector: "app-password-generator-history",
  templateUrl: "password-generator-history.component.html",
})
export class PasswordGeneratorHistoryComponent extends BasePasswordGeneratorHistoryComponent {
  constructor(
    passwordGenerationService: PasswordGenerationService,
    platformUtilsService: PlatformUtilsService,
    i18nService: I18nService,
    private location: Location
  ) {
    super(passwordGenerationService, platformUtilsService, i18nService, window);
  }

  close() {
    this.location.back();
  }
}
