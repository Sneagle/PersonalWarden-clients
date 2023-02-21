import { BehaviorSubject } from "rxjs";
import { Jsonify } from "type-fest";

import { Policy } from "@personalwarden/common/models/domain/policy";
import { PolicyService } from "@personalwarden/common/services/policy/policy.service";

import { browserSession, sessionSync } from "../decorators/session-sync-observable";

@browserSession
export class BrowserPolicyService extends PolicyService {
  @sessionSync({
    initializer: (obj: Jsonify<Policy>) => Object.assign(new Policy(), obj),
    initializeAs: "array",
  })
  protected _policies: BehaviorSubject<Policy[]>;
}
