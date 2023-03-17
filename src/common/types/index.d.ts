declare namespace App {
  type DatabaseType = 'mysql' | 'mariadb'
  interface ServiceConfigs {
    port: 3000
  }
  interface DatabaseConfigs {
    type: DatabaseType
    host: string
    port: number
    username: string
    password: string
    database: string
    autoLoadEntities: boolean
    synchronize: boolean
  }
  interface Configs {
    service: ServiceConfigs
    database: DatabaseConfigs
  }
  interface EnvConfigs {
    [key: string]: App.Configs
  }
}
