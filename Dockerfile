FROM quay.io/sampandey001/secktor
RUN git clone https://github.com/SuhailTechInfo/Suhail-Md /root/Suhail
WORKDIR /root/Suhail
RUN yarn install
EXPOSE 8000
CMD ["npm","start" ] 