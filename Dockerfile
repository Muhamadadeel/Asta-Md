FROM quay.io/suhailtechinfo/suhail-v2
RUN git clone https://github.com/Astropeda/Asta-Md /root/Astropeda
WORKDIR /root/Astropeda
RUN npm install
EXPOSE 8000
CMD ["npm","start" ] 