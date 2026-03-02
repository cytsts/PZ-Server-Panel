# Stage 1: Build Frontend
FROM node:20 AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Build Backend (Rust)
FROM rust:1.75 AS backend-builder
WORKDIR /app
COPY backend-rust/Cargo.toml backend-rust/Cargo.lock* ./
COPY backend-rust/src ./src
RUN cargo build --release

# Stage 3: Final Image
FROM cm2network/steamcmd:root

# Install required dependencies for Rust binary
RUN apt-get update && apt-get install -y \
    ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create directories
RUN mkdir -p /opt/pzserver /opt/pzpanel /home/steam/Zomboid
WORKDIR /opt/pzpanel

# Copy frontend build
COPY --from=frontend-builder /app/dist ./dist

# Copy backend binary
COPY --from=backend-builder /app/target/release/pz-server-panel ./pz-server-panel

# Setup entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Change owner
RUN chown -R steam:steam /opt/pzserver /opt/pzpanel /home/steam/Zomboid

USER steam
EXPOSE 16261/udp 16262/udp 3000/tcp

ENTRYPOINT ["/entrypoint.sh"]
