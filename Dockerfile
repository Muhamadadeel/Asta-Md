FROM node:lts-buster

RUN git clone https://github.com/Astropeda/Asta-Md /root/Astropeda

RUN npm cache clean --force
RUN rm -rf /root/Astropeda/node_modules

WORKDIR /root/Astropeda

RUN npm install


RUN npm update

EXPOSE 9000

CMD ["npm", "start"]

# Let's use Node.js LTS (Long Term Support) version based on Buster 
