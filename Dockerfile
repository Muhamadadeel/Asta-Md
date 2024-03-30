FROM quay.io/sampandey001/secktor
RUN git clone https://github.com/Astropeda/Asta-Md /root/Asta
WORKDIR /root/Asta
RUN yarn install
EXPOSE 8000
CMD ["npm","start" ] 