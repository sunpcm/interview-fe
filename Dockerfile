# ========================
# 阶段 1：构建阶段 (Build)
# ========================
FROM node:20-alpine AS build-stage

WORKDIR /app

# 启用 corepack 以支持 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 先复制 package.json 和 lock 文件并安装依赖（利用 Docker 缓存机制加速构建）
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 复制所有源代码并执行打包
COPY . .
RUN pnpm build

# ========================
# 阶段 2：生产服务阶段 (Serve)
# ========================
FROM nginx:alpine AS production-stage

# 将构建阶段产生的 dist 目录中的文件，复制到 Nginx 默认的静态文件托管目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 用自定义的 Nginx 配置文件替换默认配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露容器内部的 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]