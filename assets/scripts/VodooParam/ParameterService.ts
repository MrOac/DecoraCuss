export interface IParameterSDK {
  onParamUpdated(callback: (parameters: Record<string, any>) => void): () => void;
}

export class VoodooParameterSDK implements IParameterSDK {
  private sdk: any;
  constructor(sdk: any) {
    this.sdk = sdk;
  }
  onParamUpdated(callback: (parameters: Record<string, any>) => void): () => void {
    return this.sdk.onParamUpdated(callback);
  }
}

export class TheOneParameterSDK implements IParameterSDK {
  private sdk: any;
  constructor(sdk: any) {
    this.sdk = sdk;
  }
  onParamUpdated(callback: (parameters: Record<string, any>) => void): () => void {
    return this.sdk.onParamUpdated(callback);
  }
}
