import { SendgridConfig } from "./sendgrid-config-schema";
import { SettingsManager } from "@saleor/app-sdk/settings-manager";

export class SendgridPrivateMetadataManager {
  private metadataKey = "sendgrid-config";

  constructor(private metadataManager: SettingsManager, private saleorApiUrl: string) {}

  getConfig(): Promise<SendgridConfig | undefined> {
    return this.metadataManager.get(this.metadataKey, this.saleorApiUrl).then((data) => {
      if (!data) {
        return data;
      }

      try {
        return JSON.parse(data);
      } catch (e) {
        throw new Error("Invalid metadata value, cant be parsed");
      }
    });
  }

  setConfig(config: SendgridConfig): Promise<void> {
    return this.metadataManager.set({
      key: this.metadataKey,
      value: JSON.stringify(config),
      domain: this.saleorApiUrl,
    });
  }
}
