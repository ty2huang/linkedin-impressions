FROM python:3.12-slim
WORKDIR /squirrels

COPY . .

RUN apt-get update && apt-get install -y git

RUN pip install --no-cache-dir -r requirements.lock

EXPOSE 4465
CMD ["squirrels", "run", "--host", "0.0.0.0", "--port", "4465"]