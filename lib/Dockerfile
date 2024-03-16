FROM quay.io/sampandey001/secktor
RUN git clone https://github.com/Astropeda/whatsapp-bot /root/Astropeda
WORKDIR /root/Astropeda/
RUN npm install npm@latest
RUN yarn install
EXPOSE 8000
CMD ["npm", "start"]
 
