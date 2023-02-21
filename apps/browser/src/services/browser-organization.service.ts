import { BehaviorSubject } from "rxjs";

import { Organization } from "@personalwarden/common/models/domain/organization";
import { OrganizationService } from "@personalwarden/common/services/organization/organization.service";

import { browserSession, sessionSync } from "../decorators/session-sync-observable";

@browserSession
export class BrowserOrganizationService extends OrganizationService {
  @sessionSync({ initializer: Organization.fromJSON, initializeAs: "array" })
  protected _organizations: BehaviorSubject<Organization[]>;
}
