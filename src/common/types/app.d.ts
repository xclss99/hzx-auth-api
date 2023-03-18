declare namespace App {
  type DatabaseType = 'mysql' | 'mariadb'
  interface ServiceConfigs {
    port: number
  }
  interface DatabaseConfigs {
    type: DatabaseType
    host: string
    port: number
    username: string
    password: string
    database: string
    synchronize: boolean
    autoLoadEntities: boolean
  }
  interface Configs {
    service: ServiceConfigs
    database: DatabaseConfigs
  }
  interface EnvConfigs {
    [key: string]: App.Configs
  }
}
