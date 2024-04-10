FROM quay.io/suhailtechinfo/suhail-v2
RUN git clone https://github.com/Astropeda/Asta-Md /root/Astropeda
RUN apt-get update && apt-get install -y git
WORKDIR /root/Astropeda
RUN npm install
EXPOSE 3000
CMD ["npm","start" ] 
