FROM python:3.10-slim

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
    ffmpeg \
    curl \
    nodejs \
    npm \
    && apt-get clean

# Instalar yt-dlp
RUN pip install yt-dlp

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY . .

# Instalar dependencias Node
RUN npm install

# Exponer puerto
EXPOSE 3000

# Comando de arranque
CMD ["npm", "start"]