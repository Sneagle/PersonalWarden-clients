import { Component } from "@angular/core";

import { AddEditCustomFieldsComponent as BaseAddEditCustomFieldsComponent } from "@personalwarden/angular/vault/components/add-edit-custom-fields.component";
import { EventCollectionService } from "@personalwarden/common/abstractions/event/event-collection.service";
import { I18nService } from "@personalwarden/common/abstractions/i18n.service";

@Component({
  selector: "app-vault-add-edit-custom-fields",
  templateUrl: "add-edit-custom-fields.component.html",
})
export class AddEditCustomFieldsComponent extends BaseAddEditCustomFieldsComponent {
  constructor(i18nService: I18nService, eventCollectionService: EventCollectionService) {
    super(i18nService, eventCollectionService);
  }
}
