import BrowserWalletStrategy from "@arweave-wallet-kit/browser-wallet-strategy";
import { callWindowApi } from "@arweave-wallet-kit/core/wallet";
import { Strategy } from "@arweave-wallet-kit/core/strategy";
import type { DataItem } from "arconnect";
export default class WanderStrategy
  extends BrowserWalletStrategy
  implements Strategy
{
  public id = "wander";
  public name = "Wander";
  public description =
    "Non-custodial Arweave & AO wallet for your favorite browser";
  public theme = "235, 224, 255";
  public logo = "ZafBy2bAp4kj-dFUVJm-EsupwgGhcDJPTpufsa7AYsI";
  public url = "https://www.wander.app";

  constructor() {
    super();
  }

  public async isAvailable() {
    const injectedAvailable = await super.isAvailable();

    if (!injectedAvailable || !window.arweaveWallet) {
      return false;
    }

    return (
      window.arweaveWallet.walletName === "Wander" ||
      window.arweaveWallet.walletName === "ArConnect"
    );
  }

  public async addToken(id: string): Promise<void> {
    return await callWindowApi("addToken", [id]);
  }

  public async batchSignDataItem(
    dataItems: DataItem[],
  ): Promise<ArrayBufferLike[]> {
    return await callWindowApi("batchSignDataItem", [dataItems]);
  }
}
