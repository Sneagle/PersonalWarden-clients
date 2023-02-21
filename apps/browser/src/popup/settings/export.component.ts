import { Component } from "@angular/core";
import { UntypedFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { ExportComponent as BaseExportComponent } from "@personalwarden/angular/components/export.component";
import { CryptoService } from "@personalwarden/common/abstractions/crypto.service";
import { EventCollectionService } from "@personalwarden/common/abstractions/event/event-collection.service";
import { ExportService } from "@personalwarden/common/abstractions/export.service";
import { FileDownloadService } from "@personalwarden/common/abstractions/fileDownload/fileDownload.service";
import { I18nService } from "@personalwarden/common/abstractions/i18n.service";
import { LogService } from "@personalwarden/common/abstractions/log.service";
import { PlatformUtilsService } from "@personalwarden/common/abstractions/platformUtils.service";
import { PolicyService } from "@personalwarden/common/abstractions/policy/policy.service.abstraction";
import { UserVerificationService } from "@personalwarden/common/abstractions/userVerification/userVerification.service.abstraction";

@Component({
  selector: "app-export",
  templateUrl: "export.component.html",
})
export class ExportComponent extends BaseExportComponent {
  constructor(
    cryptoService: CryptoService,
    i18nService: I18nService,
    platformUtilsService: PlatformUtilsService,
    exportService: ExportService,
    eventCollectionService: EventCollectionService,
    policyService: PolicyService,
    private router: Router,
    logService: LogService,
    userVerificationService: UserVerificationService,
    formBuilder: UntypedFormBuilder,
    fileDownloadService: FileDownloadService
  ) {
    super(
      cryptoService,
      i18nService,
      platformUtilsService,
      exportService,
      eventCollectionService,
      policyService,
      window,
      logService,
      userVerificationService,
      formBuilder,
      fileDownloadService
    );
  }

  protected saved() {
    super.saved();
    this.router.navigate(["/tabs/settings"]);
  }
}
