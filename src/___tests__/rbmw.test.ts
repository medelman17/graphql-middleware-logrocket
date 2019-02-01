import test from 'ava'
import { rollbar } from '../index'

test('throws an error if user fails to supply correct configuration options', t => {
  t.throws(() => rollbar({}))
  t.notThrows(() => rollbar({ rollbarAccessToken: '12345' }))
  t.notThrows(() => rollbar({ rollbarInstance: '1234' }))
})

test('returns a function if supplied correct config options', t => {
  const rb1 = rollbar({ rollbarAccessToken: '12345' })
  t.is(typeof rb1, 'function')
  const rb2 = rollbar({ rollbarInstance: '12345' })
  t.is(typeof rb2, 'function')
  const rb3 = rollbar({
    rollbarServiceConfigOptions: {
      accessToken: '12345',
    },
  })
  t.is(typeof rb3, 'function')
})
