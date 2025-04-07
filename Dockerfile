FROM node:18

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y ffmpeg curl python3 python3-pip
RUN pip install yt-dlp

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]