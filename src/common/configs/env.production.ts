export const production: App.Configs = {
  service: {
    port: 3000
  },
  database: {
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'pX73QEw6RQ5wAznX8lr',
    database: 'auth',
    autoLoadEntities: true,
    synchronize: false
  }
}
