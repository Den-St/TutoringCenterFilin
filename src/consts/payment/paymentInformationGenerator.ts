import {createHash} from 'crypto';

export const getStrToSignature = (sign_string:string) => {
  const sha1 = createHash('sha1');
  sha1.update(sign_string);
  return sha1.digest('base64');
}
export const base64_encode = (json_string:any) => Buffer.from(JSON.stringify(json_string)).toString('base64'); 
export const getSignature = (private_key:string,encoded_data:string) => private_key + encoded_data + private_key;