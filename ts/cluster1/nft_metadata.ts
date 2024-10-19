import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "JEFF THE DEV"
        const metadata = {
            name: "JEFF THE DEV",
            symbol: "JEV",
            description: "JEFF THE DEV SOLANA DEV ON THE BLOCKCHAIN",
            image: "https://devnet.irys.xyz/HCcGZnU6A9aXYoZWJUoxYHGeTpty8FSfW7M6GpdqpjsC",
            attributes: [
                {trait_type: 'Eyes', value: 'Closed'},
                {trait_type: 'Head', value: 'Beanie'},
                {trait_type: 'Clothe', value: 'Hoodie'},
                {trait_type: 'Background', value: 'Home'},
                {trait_type: 'Mouth', value: 'Closed'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: "https://devnet.irys.xyz/HCcGZnU6A9aXYoZWJUoxYHGeTpty8FSfW7M6GpdqpjsC"
                    },
                ]
            },
            creators: [
              {
                address: keypair.publicKey,
                share: 100,
              },
        
        ],
        };

        const myUri = await umi.uploader.uploadJson(metadata);


        console.log("Your metadata URI: ", myUri.replace("arweave.net", "devnet.irys.xyz"));
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
