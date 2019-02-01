import { IMiddlewareFunction } from 'graphql-middleware/dist/types'
const Rollbar = require('rollbar')

type RollbarEnvOptions = 'production' | 'development'

export interface RollbarServiceConfigOptions {
  accessToken: string
  captureUncaught?: boolean
  captureUnhandledRejections?: boolean
  environment?: RollbarEnvOptions
  endpoint?: string
  verbose?: boolean
}

export interface RollbarMiddlewareConfigOptions {
  rollbarServiceConfigOptions?: RollbarServiceConfigOptions
  rollbarAccessToken?: string
  rollbarInstance?: any
}

export interface RollbarExceptionScope {}

export const rollbar = ({
  rollbarInstance,
  rollbarAccessToken,
  rollbarServiceConfigOptions,
}: RollbarMiddlewareConfigOptions): IMiddlewareFunction => {
  if (!rollbarInstance && !rollbarAccessToken && !rollbarServiceConfigOptions) {
    throw new Error(
      'Rollbar middleware could not be initialized. Did you forget to supply a rollbar instance, rollbar access token, or rollbar service config options?"',
    )
  }

  const rollbar = rollbarInstance
    ? rollbarInstance
    : rollbarAccessToken
    ? new Rollbar({ accessToken: rollbarAccessToken })
    : new Rollbar({ options: { ...rollbarServiceConfigOptions } })

  return async (resolve, parent, args, context, info) => {
    try {
      const result = await resolve(parent, args, context, info)
      if (result instanceof Error) {
        rollbar.error(result)
      }
      return result
    } catch (error) {
      rollbar.error(error, context)
    }
  }
}
