package com.example

enum class Profile {
    LOCAL, PROD
}

val profile by lazy { Profile.valueOf(read("PROFILE") ?: "LOCAL") }

fun isLocal() = profile == Profile.LOCAL

data class AppConfig(
    val profile: Profile,
    val dbUrl: String,
    val dbUser: String,
    val dbDriver: String,
    val dbPassword: String,
)

fun loadConfig(): AppConfig {
    if (isLocal()) {
        return localConfig()
    }

    return AppConfig(
        profile = profile,
        dbUrl = read("DB_URL"),
        dbUser = read("DB_USER"),
        dbDriver = read("DB_DRIVER"),
        dbPassword = read("DB_PASSWORD"),
    )
}

fun localConfig() = AppConfig(
    profile = Profile.LOCAL,
    dbUrl = "jdbc:h2:mem:test;DB_CLOSE_DELAY=-1",
    dbUser = "root",
    dbDriver = "org.h2.Driver",
    dbPassword = "",
)

private fun readOrNull(key: String): String? = System.getenv(key)

private fun read(key: String): String = readOrNull(key) ?: error("No config found for <$key>")

