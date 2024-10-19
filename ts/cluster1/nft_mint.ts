import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../wba-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);
const sellerFeeBasisPoints = percentAmount(0,2);

const name = "JEFF THE DEV";
const uri ="https://devnet.irys.xyz/BQWy5gwGpGXW9oS7XaDYNmjiwQKFBTRzt9SdcRA99QPd";

console.log("Your metadate URI: ", uri.replace("arweave.net", "devnet.irys.xyz"));
const symbol = "JEV";

(async () => {
    let tx = createNft( 
        umi,
        {
            mint,
            name,
            symbol,
            uri,
            sellerFeeBasisPoints,
        },
    )

    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);
    
    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

    console.log("Mint Address: ", mint.publicKey);
})();