import type { AsyncLocalStorage } from 'async_hooks'
import type { IncrementalCache } from '../../server/lib/incremental-cache'
import type { DynamicServerError } from './hooks-server-context'
import type { FetchMetrics } from '../../server/base-http'
import type { Revalidate } from '../../server/lib/revalidate'

import { createAsyncLocalStorage } from './async-local-storage'

export interface StaticGenerationStore {
  readonly isStaticGeneration: boolean
  readonly pagePath?: string
  readonly urlPathname: string
  readonly incrementalCache?: IncrementalCache
  readonly isOnDemandRevalidate?: boolean
  readonly isPrerendering?: boolean
  readonly isRevalidate?: boolean
  readonly isUnstableCacheCallback?: boolean

  forceDynamic?: boolean
  fetchCache?:
    | 'only-cache'
    | 'force-cache'
    | 'default-cache'
    | 'force-no-store'
    | 'default-no-store'
    | 'only-no-store'

  revalidate?: Revalidate
  forceStatic?: boolean
  dynamicShouldError?: boolean
  pendingRevalidates?: Record<string, Promise<any>>
  postponeWasTriggered?: boolean
  postpone?: (reason: string) => never

  dynamicUsageDescription?: string
  dynamicUsageStack?: string
  dynamicUsageErr?: DynamicServerError
  staticPrefetchBailout?: boolean

  nextFetchId?: number
  pathWasRevalidated?: boolean

  tags?: string[]

  revalidatedTags?: string[]
  fetchMetrics?: FetchMetrics

  isDraftMode?: boolean

  readonly experimental: {
    readonly ppr: boolean
  }
}

export type StaticGenerationAsyncStorage =
  AsyncLocalStorage<StaticGenerationStore>

export const staticGenerationAsyncStorage: StaticGenerationAsyncStorage =
  createAsyncLocalStorage()
