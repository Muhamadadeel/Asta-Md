FROM node:lts-buster
RUN git clone https://github.com/Astropeda/Asta-Md /root/Astropeda
RUN npm cache clean --force
RUN rm -rf /root/Astropeda/node_modules
WORKDIR /root/Astropeda
RUN npm install
EXPOSE 8000
CMD ["npm","start" ]