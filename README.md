# NextBin

A bin made in next.js

## Running
First, clone this repo with the following command: `git clone https://github.com/chirag350/NextBin`,  
Then rename `.env.local.example` to `.env.local` using `mv .env.local.example .env.local`  
Then open `.env.local` with nano or vi, vim or your favorite editor and fill in the config. (You need to register on hcaptcha.com to get the secret key) 
Then run `npm install` to install the dependencies  
Then run `npm run build` to build  
Then run`npm start` to start  

For SSL do the following:  
`systemctl start nginx`  
`certbot certonly --nginx -d your.domain.com`  
`cd /etc/nginx/conf.d`  
`touch nextbin.conf`  
`nano nextbin.conf`  
Now paste the following:  
```nginx
server {
    listen 80;
    server_name <domain>;
    return 301 https://$server_name$request_uri;
}
server {
    listen 443 ssl http2;    
    server_name <domain>;
ssl_certificate /etc/letsencrypt/live/<domain>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<domain>/privkey.pem;
    ssl_session_cache shared:SSL:10m;
    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
location / {
      proxy_pass http://localhost:3000/;
      proxy_buffering off;
      proxy_set_header X-Real-IP $remote_addr;
  }
}
```  
Make sure to replace `<domain>` with the domain.  
Now run `systemctl restart nginx` and you should be good to go.

### Donating
LTC: `LePn1UzzuKJFybBKjRK5vEBBXQib3Mup59`  
BTC (SegWit): `bc1qj9jtafesf39njtynh3femwaj8404qts47rpclz`  
BTC (Legacy): `1FR4seP5HfxZ2dUekX2bYjpSsxNFRNHb5i`  
ETH: `0x92F05c996B639F5d62bf7746Deac926F90A2CB80`