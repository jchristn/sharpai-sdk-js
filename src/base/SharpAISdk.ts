import { SdkConfiguration } from './SdkConfiguration';
import { SdkConfig } from '../types';
import SdkBase from './SdkBase';
import OpenAISdk from './OpenAISdk';
import OllamaSdk from './OllamaSdk';
/**
 * SharpAI SDK class.
 * Extends the SdkBase class.
 * @module  SharpAISdk
 * @extends SdkBase
 */
export default class SharpAISdk extends SdkBase {
  public config: SdkConfiguration;
  public OpenAI: OpenAISdk;
  public Ollama: OllamaSdk;
  /**
   * Instantiate the SDK.
   * @param {SdkConfig} sdkConfig - The SDK configuration.
   */

  constructor(sdkConfig: SdkConfig) {
    const config = new SdkConfiguration(sdkConfig);
    super(config);
    this.config = config;
    this.OpenAI = new OpenAISdk(config);
    this.Ollama = new OllamaSdk(config);
  }

  /**
   * Validates API connectivity using a HEAD request.
   * @param {AbortController} [cancellationToken] - Optional cancellation token for cancelling the request.
   * @return {Promise<boolean>} Resolves to true if the connection is successful.
   * @throws {Error} Rejects with the error in case of failure.
   */
  /**
   * Validates API connectivity using a HEAD request.
   * @param {AbortController} [cancellationToken] - Optional cancellation token for cancelling the request.
   * @return {Promise<boolean>} Resolves to true if the connection is successful.
   * @throws {Error} Rejects with the error in case of failure.
   */
  validateConnectivity(cancellationToken?: AbortController | undefined): Promise<boolean> {
    return this.head(this.config.endpoint, cancellationToken);
  }
}
