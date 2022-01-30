#JSON Web Tokens (JWT)

A JWT is assigned when a user logs in. This equivalant to a stamp on the hand that is given when entering a nightclub. The stamp will allow you to leave and re-enter a club by showing the stamp.

If you don't have a stamp, they won't let you re-enter. In a similar way, JWT is issued to the frontend (e.g. Amazon), to allow you access to the areas that you have access to (e.g. your Amazon account).

JWT Website - https://jwt.io/introduction/

A JWT consists of three parts;

The Header,
The Payload,
The Signature
Header

Consists of two parts; the type of token (JWT), and the signing algorithim to encode it.

{
"alg": "HS256",
"typ": "JWT"
}
Payload

Contains particular data about the user, known as claims;

{
"sub": "1234567890",
"name": "John Doe",
"admin": true
}
Signature

Used to verify that the message hasn't been changed on its journey.

HMACSHA256(
base64UrlEncode(header) + "." +
base64UrlEncode(payload),
secret)
Debugging tool - https://jwt.io/#debugger-io

Secret key - a key that will seed the randomisation of things in our app's auth system. This will go in the .env (SECRET_KEY);
