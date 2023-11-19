package com.example

import com.example.habits.habitsApi
import com.example.ktor.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.cio.*
import io.ktor.server.engine.*
import io.ktor.server.http.content.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.resources.*
import io.ktor.server.routing.*

fun main() {
    embeddedServer(CIO, port = 8080, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    configureKtor()
    setupRoutes()
}

fun Application.configureKtor() {
    configureStatusPages()
    configureSerialization()
    configureMonitoring()
    configureHTTP()
    configureSecurity()

    install(IgnoreTrailingSlash)
    install(Resources)

    if (isLocal()) {
        localKtorConfig()
    }
}

fun Application.setupRoutes() {
    val ctx = Context()

    routing {
        habitsApi(ctx.habitsService)
        singlePageApplication {
            useResources = true
            filesPath = "habits-web-app"
            defaultPage = "index.html"
        }
    }
}

fun Application.localKtorConfig() {
    install(CORS) {
        // Allow requests from frontend when running locally
        allowHost("localhost:5173")
        allowHost("localhost:4173")
        allowHost("localhost:8080")
        allowHeader(HttpHeaders.ContentType)
    }
}