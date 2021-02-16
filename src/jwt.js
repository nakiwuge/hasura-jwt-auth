import {JWK} from 'node-jose'
import jwt from 'jsonwebtoken'

export const generateKey = ()=>{
  const keystore = JWK.createKeyStore();
  var props = {
   alg:'RS256', use: 'sig' 
  };
  keystore.generate("RSA", 2048,props).then(function(result) {
    console.log('private key',result.toPEM(true))
    console.log('public key',result.toPEM())
 });
}
//echo "export test_key=\"`sed -E 's/$/\\\n/g' ./private-key.pem`\"" >> .env

export const generateToken =(data)=>{
  const token = jwt.sign({
    "https://hasura.io/jwt/claims": {
    "x-hasura-user-id": `${data.id}`,
    "x-hasura-allowed-roles": [
      data.role
    ],
    "x-hasura-default-role": data.role}
  }, 
  JSON.parse(process.env.REACT_APP_JWT_PRIVATE_KEY),
   {
    algorithm: 'RS256',
    expiresIn: '60m'
  })
 return token
}