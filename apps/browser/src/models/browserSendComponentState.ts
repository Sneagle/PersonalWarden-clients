import { SendType } from "@personalwarden/common/enums/sendType";
import { Utils } from "@personalwarden/common/misc/utils";
import { SendView } from "@personalwarden/common/models/view/send.view";
import { DeepJsonify } from "@personalwarden/common/types/deep-jsonify";

import { BrowserComponentState } from "./browserComponentState";

export class BrowserSendComponentState extends BrowserComponentState {
  sends: SendView[];
  typeCounts: Map<SendType, number>;

  toJSON() {
    return Utils.merge(this, {
      typeCounts: Utils.mapToRecord(this.typeCounts),
    });
  }

  static fromJSON(json: DeepJsonify<BrowserSendComponentState>) {
    if (json == null) {
      return null;
    }

    return Object.assign(new BrowserSendComponentState(), json, {
      sends: json.sends?.map((s) => SendView.fromJSON(s)),
      typeCounts: Utils.recordToMap(json.typeCounts),
    });
  }
}
