/* eslint-disable no-unused-vars */
declare global {
    namespace NodeJS{
        interface ProcessEnv {
            USE_LOCAL_DATA: 'true' | 'false'
            API_KEY: string
            AUTH_DOMAIN: string
            DATABASE_URL: string
            PROJECT_ID: string
            STORAGE_BUCKET: string
            MESSAGING_SENDER_ID: string
            APP_ID: string
            MEASUREMENT_ID: string
            NODE_ENV: 'development' | 'production'
            PORT?: string
            PWD: string
        }
    }
}

export {}