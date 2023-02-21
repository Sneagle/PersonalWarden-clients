import { MessagingService } from "@personalwarden/common/abstractions/messaging.service";

export default class BrowserMessagingPrivateModePopupService implements MessagingService {
  send(subscriber: string, arg: any = {}) {
    const message = Object.assign({}, { command: subscriber }, arg);
    (window as any).personalwardenBackgroundMessageListener(message);
  }
}
