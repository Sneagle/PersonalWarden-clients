import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";

import { CollectionsComponent as BaseCollectionsComponent } from "@personalwarden/angular/components/collections.component";
import { CollectionService } from "@personalwarden/common/abstractions/collection.service";
import { I18nService } from "@personalwarden/common/abstractions/i18n.service";
import { LogService } from "@personalwarden/common/abstractions/log.service";
import { PlatformUtilsService } from "@personalwarden/common/abstractions/platformUtils.service";
import { CipherService } from "@personalwarden/common/vault/abstractions/cipher.service";

@Component({
  selector: "app-vault-collections",
  templateUrl: "collections.component.html",
})
// eslint-disable-next-line rxjs-angular/prefer-takeuntil
export class CollectionsComponent extends BaseCollectionsComponent {
  constructor(
    collectionService: CollectionService,
    platformUtilsService: PlatformUtilsService,
    i18nService: I18nService,
    cipherService: CipherService,
    private route: ActivatedRoute,
    private location: Location,
    logService: LogService
  ) {
    super(collectionService, platformUtilsService, i18nService, cipherService, logService);
  }

  async ngOnInit() {
    // eslint-disable-next-line rxjs-angular/prefer-takeuntil
    this.onSavedCollections.subscribe(() => {
      this.back();
    });
    // eslint-disable-next-line rxjs-angular/prefer-takeuntil, rxjs/no-async-subscribe
    this.route.queryParams.pipe(first()).subscribe(async (params) => {
      this.cipherId = params.cipherId;
      await this.load();
    });
  }

  back() {
    this.location.back();
  }
}
