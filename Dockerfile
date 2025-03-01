# 1단계: Node 이미지를 사용하여 React 앱 빌드
# --platform=linux/amd64
FROM node:22 as build
WORKDIR /app

# 빌드 인자 선언
ARG REACT_APP_AWS_ACCESS_KEY
ARG REACT_APP_AWS_SECRET_KEY
ARG REACT_APP_S3_BUCKET_NAME
ARG REACT_APP_S3_REGION
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_API_LOCAL_URL

# 빌드 시 사용할 환경변수로 설정 (React 앱이 빌드 시에 사용함)
ENV REACT_APP_AWS_ACCESS_KEY=${REACT_APP_AWS_ACCESS_KEY}
ENV REACT_APP_AWS_SECRET_KEY=${REACT_APP_AWS_SECRET_KEY}
ENV REACT_APP_S3_BUCKET_NAME=${REACT_APP_S3_BUCKET_NAME}
ENV REACT_APP_S3_REGION=${REACT_APP_S3_REGION}
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
ENV REACT_APP_API_LOCAL_URL=${REACT_APP_API_LOCAL_URL}

# 의존성 설치 및 앱 빌드
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build



# --platform=linux/amd64 
# 2단계: 빌드 결과물을 Nginx를 사용해 제공
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
