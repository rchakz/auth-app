// import { Buffer } from "https://deno.land/std@0.160.0/io/buffer.ts";
// import { Buffer } from "std/io/buffer.ts";

export async function sign() {
  // const key = new CryptoKey();

  //https://github.com/worker-tools/signed-cookie-store/blob/master/index.ts

  // const passphraseKey = await crypto
  //     .subtle
  //     .importKey('jwk', "keyboard_cat" as JsonWebKey, 'PBKDF2', false, ['deriveKey'])

  // const key = await crypto.subtle.deriveKey(
  //     {
  //       name: 'PBKDF2',
  //       iterations: 999,
  //       hash: 'SHA-256',
  //       salt: new TextEncoder().encode("pepino")
  //     },
  //     passphraseKey,
  //     {
  //       name: 'HMAC',
  //       hash: 'SHA-256',
  //       length: 128
  //     },
  //     false,
  //     ['sign', 'verify'],
  //   );

  //   return key
  // }

  // key.algorithm =
  // crypto
  //     .subtle
  //     .sign(
  //         "SHA256",
  //         new CryptoKey("keyboard_cat"),
  //         Buffer.from("secret")
  //     );

  // const message = new TextEncoder().encode([name, value].join("="));
  // const signature = await crypto.subtle.sign("HMAC", this.#key, messae)
  // return new Base64Encoder({ url: true }).encode(signature);
}

export function verify() {
}
