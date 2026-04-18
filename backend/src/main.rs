mod counterparty;
mod ethereum;
mod handlers;
mod heuristics;
mod models;
mod pricing;
mod utils;

use axum::{Router, routing::post};
use tower_http::cors::{Any, CorsLayer};
use tracing::{Level, info};
use tracing_subscriber::fmt;

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();
    init_tracing();

    // Configure CORS
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/transaction", post(handlers::evaluate_transaction))
        .layer(cors);

    let bind_address = "0.0.0.0:3001";

    let listener = tokio::net::TcpListener::bind(bind_address)
        .await
        .expect("failed to bind HTTP listener");

    info!("API server listening on {}", bind_address);

    axum::serve(listener, app)
        .await
        .expect("HTTP server failed");
}

fn init_tracing() {
    fmt()
        .with_max_level(Level::INFO)
        .with_target(false)
        .compact()
        .init();
}
