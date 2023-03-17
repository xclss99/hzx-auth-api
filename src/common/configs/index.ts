import { development } from './env.development'
import { production } from './env.production'
import { testing } from './env.testing'

const configs: App.EnvConfigs = {
  development,
  production,
  testing
}

export const envConfigs = configs[process.env.NODE_ENV || 'development']
