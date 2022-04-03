
import { Adapter, ConciseDb } from './async'
import { AdapterSync, ConciseDbSync } from './sync'

interface BaseAdapterOptions {
  realtimeUpdate?: boolean
}

export {
  ConciseDb,
  ConciseDbSync,
  Adapter,
  AdapterSync,
  BaseAdapterOptions,
}
