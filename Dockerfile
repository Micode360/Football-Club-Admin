# Stage 1: Install dependencies
FROM node:16 AS dependencies

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Stage 2: Build the app
FROM node:16 AS builder

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Stage 3: Create the final image
FROM node:16

WORKDIR /app
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["yarn", "start"]