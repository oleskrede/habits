package com.example.ktor

import com.example.isLocal
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.routing.*

fun Application.configureCORS() {
    install(CORS) {
        if (isLocal()) {
            // Allow requests from frontend when running locally
            allowHost("localhost:5173") // Local dev
            allowHost("localhost:4173") // Local preview
            allowHost("localhost:8080") // Local docker
        } else {
            allowHost("dsk-habits.fly.dev", schemes = listOf("https"))
        }

        allowMethod(HttpMethod.Get)
        allowMethod(HttpMethod.Post)
        allowHeader(HttpHeaders.AcceptEncoding)
        allowHeader(HttpHeaders.ContentType)
    }
}