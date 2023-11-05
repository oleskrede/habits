package com.example.ktor

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*


fun Application.configureStatusPages() {
    install(StatusPages) {
        exception<Throwable> { call, cause ->
            println("ERROR: $cause")
            call.respond(HttpStatusCode.InternalServerError)
        }
    }
}