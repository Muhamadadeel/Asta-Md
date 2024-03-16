FROM quay.io/sampandey001/secktor
RUN git clone https://github.com/Astropeda/whatsapp-bot /root/Suhail_Md
WORKDIR /root/Suhail_Md/
RUN npm install npm@latest
RUN yarn install --network-concurrency 1
EXPOSE 8000
CMD ["npm", "start"]
 
