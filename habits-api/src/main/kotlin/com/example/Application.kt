package com.example

import com.example.habits.habitsApi
import com.example.ktor.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.cio.*
import io.ktor.server.engine.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.routing.*

fun main() {
    embeddedServer(CIO, port = 8080, module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    configureKtor()
    setupRoutes()
}

fun Application.configureKtor() {
    configureSerialization()
    configureMonitoring()
    configureHTTP()
    configureSecurity()
    configureRouting()

    install(IgnoreTrailingSlash)

    if (isLocal()) {
        localKtorConfig()
    }
}

fun Application.setupRoutes() {
    val ctx = Context()

    routing {
        habitsApi(ctx.pageRepository)
    }
}

fun Application.localKtorConfig() {
    install(CORS) {
        // Allow requests from frontend when running locally
        allowHost("localhost:5173")
        allowHeader(HttpHeaders.ContentType)
    }
}