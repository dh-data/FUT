# 第一阶段：构建
FROM node:20-alpine AS builder

WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 第二阶段：运行
FROM node:20-alpine

WORKDIR /app

# 从构建阶段复制构建产物和环境文件
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env

# 暴露端口
EXPOSE 2000

# 启动应用
CMD ["npm", "run", "start:prod"]