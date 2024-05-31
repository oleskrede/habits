package com.example

enum class Profile {
    LOCAL, PROD
}

val profile = Profile.valueOf(System.getenv("PROFILE") ?: "LOCAL")

fun isLocal() = profile == Profile.LOCAL

private val conf: (String, String) -> String = when (profile) {
    Profile.LOCAL -> { _, default -> default }
    Profile.PROD -> { key, _ ->
        System.getenv(key) ?: error("Missing environment value for $key")
    }
}

object Config {
    val dbUrl = conf("DB_URL", "jdbc:h2:mem:test;DB_CLOSE_DELAY=-1")
    val dbUser = conf("DB_USER", "root")
    val dbDriver = conf("DB_DRIVER", "org.h2.Driver")
    val dbPassword = conf("DB_PASSWORD", "")
}


