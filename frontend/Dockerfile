FROM node:20 AS build-stage
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV REACT_APP_STRIPE_KEY=pk_test_51PG1um2KnpuiMiMn2Tl3f5VVJL4yUmVPxiuwdr69W8WJfzG4FIm5GFNC64Xolwp3kAIJPqmUCtuTidcUjKql4Vx700tsHRIuvI
ENV REACT_APP_BACKEND_URL=https://toerstore.com/api
ENV REACT_APP_AUTH0_DOMAIN=dev-hluwv5rakipkhxyd.us.auth0.com
ENV REACT_APP_AUTH0_CLIENT_ID=InUoHLt4o3xSboAqEHg2pOrb1bV2c6b4
ENV HTTPS=true

RUN npm run build

FROM nginx:stable-alpine3.19-perl
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]