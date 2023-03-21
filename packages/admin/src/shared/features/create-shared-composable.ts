import {EffectScope, effectScope, onScopeDispose, getCurrentScope} from 'vue'

export function createSharedComposable<Fn extends () => any>(composable: Fn): Fn {
  let subscribers = 0
  let state: ReturnType<Fn> | undefined
  let scope: EffectScope | undefined

  const dispose = () => {
    subscribers -= 1
    if (scope && subscribers <= 0) {
      scope.stop()
      state = undefined
      scope = undefined
    }
  }

  const tryOnScopeDispose = (fn) => {
    if (getCurrentScope()) {
      onScopeDispose(fn)
      return true
    }

    return false
  }

  return <Fn>((...args) => {
    subscribers += 1
    if (!state) {
      scope = effectScope(true)
      state = scope.run(() => composable(...args))
    }

    tryOnScopeDispose(dispose)

    return state
  })
}
