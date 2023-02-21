import { Component } from "@angular/core";

import { ViewCustomFieldsComponent as BaseViewCustomFieldsComponent } from "@personalwarden/angular/vault/components/view-custom-fields.component";
import { EventCollectionService } from "@personalwarden/common/abstractions/event/event-collection.service";

@Component({
  selector: "app-vault-view-custom-fields",
  templateUrl: "view-custom-fields.component.html",
})
export class ViewCustomFieldsComponent extends BaseViewCustomFieldsComponent {
  constructor(eventCollectionService: EventCollectionService) {
    super(eventCollectionService);
  }
}
