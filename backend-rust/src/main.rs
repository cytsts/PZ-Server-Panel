use axum::{
    routing::{get, post},
    Router,
    Json,
    extract::State,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use std::fs;
use std::path::PathBuf;
use tower_http::services::{ServeDir, ServeFile};
use std::net::SocketAddr;

#[derive(Debug, Serialize, Deserialize, Clone)]
struct Mod {
    #[serde(rename = "workshopId")]
    workshop_id: String,
    #[serde(rename = "modId")]
    mod_id: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct WorldSettings {
    #[serde(rename = "zombieCount")]
    zombie_count: u32,
    #[serde(rename = "lootRarity")]
    loot_rarity: u32,
    #[serde(rename = "dayLength")]
    day_length: u32,
    #[serde(rename = "waterShutoff")]
    water_shutoff: u32,
    #[serde(rename = "elecShutoff")]
    elec_shutoff: u32,
    #[serde(rename = "xpMultiplier")]
    xp_multiplier: f32,
    pvp: bool,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct ServerConfig {
    #[serde(rename = "serverName")]
    server_name: String,
    #[serde(rename = "maxPlayers")]
    max_players: u32,
    password: String,
    port: u16,
    version: String,
    mods: Vec<Mod>,
    world: WorldSettings,
    status: String,
}

impl Default for ServerConfig {
    fn default() -> Self {
        Self {
            server_name: "My PZ Server".to_string(),
            max_players: 32,
            password: "".to_string(),
            port: 16261,
            version: "latest".to_string(),
            mods: vec![
                Mod { workshop_id: "2616986064".to_string(), mod_id: "TsarLib".to_string() },
                Mod { workshop_id: "2392709985".to_string(), mod_id: "tsarslib".to_string() },
            ],
            world: WorldSettings {
                zombie_count: 4,
                loot_rarity: 3,
                day_length: 2,
                water_shutoff: 2,
                elec_shutoff: 2,
                xp_multiplier: 1.0,
                pvp: false,
            },
            status: "stopped".to_string(),
        }
    }
}

struct AppState {
    config_path: PathBuf,
}

#[tokio::main]
async fn main() {
    let config_path = PathBuf::from("server-config.json");
    
    if !config_path.exists() {
        let default_config = ServerConfig::default();
        let json = serde_json::to_string_pretty(&default_config).unwrap();
        fs::write(&config_path, json).unwrap();
    }

    let state = Arc::new(AppState { config_path });

    let serve_dir = ServeDir::new("dist")
        .not_found_service(ServeFile::new("dist/index.html"));

    let api_routes = Router::new()
        .route("/config", get(get_config).post(update_config))
        .route("/server/start", post(start_server))
        .route("/server/stop", post(stop_server))
        .route("/server/install-mods", post(install_mods));

    let app = Router::new()
        .nest("/api", api_routes)
        .fallback_service(serve_dir)
        .with_state(state);

    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    println!("Server running on http://{}", addr);
    
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn get_config(State(state): State<Arc<AppState>>) -> Json<ServerConfig> {
    let data = fs::read_to_string(&state.config_path).unwrap_or_default();
    let config: ServerConfig = serde_json::from_str(&data).unwrap_or_default();
    Json(config)
}

async fn update_config(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<ServerConfig>,
) -> Json<ServerConfig> {
    let json = serde_json::to_string_pretty(&payload).unwrap();
    fs::write(&state.config_path, json).unwrap();
    Json(payload)
}

#[derive(Serialize)]
struct StatusResponse {
    message: String,
    status: String,
}

async fn start_server(State(state): State<Arc<AppState>>) -> Json<StatusResponse> {
    let data = fs::read_to_string(&state.config_path).unwrap_or_default();
    let mut config: ServerConfig = serde_json::from_str(&data).unwrap_or_default();
    config.status = "running".to_string();
    
    let json = serde_json::to_string_pretty(&config).unwrap();
    fs::write(&state.config_path, json).unwrap();
    
    Json(StatusResponse {
        message: "Server started".to_string(),
        status: "running".to_string(),
    })
}

async fn stop_server(State(state): State<Arc<AppState>>) -> Json<StatusResponse> {
    let data = fs::read_to_string(&state.config_path).unwrap_or_default();
    let mut config: ServerConfig = serde_json::from_str(&data).unwrap_or_default();
    config.status = "stopped".to_string();
    
    let json = serde_json::to_string_pretty(&config).unwrap();
    fs::write(&state.config_path, json).unwrap();
    
    Json(StatusResponse {
        message: "Server stopped".to_string(),
        status: "stopped".to_string(),
    })
}

#[derive(Serialize)]
struct InstallModsResponse {
    message: String,
    mods: Vec<Mod>,
}

async fn install_mods(State(state): State<Arc<AppState>>) -> Json<InstallModsResponse> {
    let data = fs::read_to_string(&state.config_path).unwrap_or_default();
    let config: ServerConfig = serde_json::from_str(&data).unwrap_or_default();
    
    // Simulate delay
    tokio::time::sleep(std::time::Duration::from_secs(3)).await;
    
    Json(InstallModsResponse {
        message: "Mods instalados com sucesso".to_string(),
        mods: config.mods,
    })
}
