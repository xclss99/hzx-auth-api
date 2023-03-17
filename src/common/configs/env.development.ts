export const development: App.Configs = {
  service: {
    port: 3000
  },
  database: {
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'dx3906admin.',
    database: 'auth',
    autoLoadEntities: true,
    synchronize: true
  }
}
