import { TPromtOptions, SPromtOptions, SPromtOptionsJson, defVal, defValJson } from './promtOptions/index.js'
import { Value } from '@sinclair/typebox/value'

/**
 * Parses and validates prompt options from a raw object.
 *
 * @param use - Schema type to use: 'core' for standard AI models, 'json' for structured JSON output
 * @param raw - Raw object containing option values to parse
 * @param useAllOptions - If true, returns all options with defaults; if false, returns only specified options (default: true)
 * @returns Validated TPromtOptions object. Invalid values are replaced with defaults. Never throws errors.
 *
 * @example
 * ```typescript
 * // Get all options with defaults
 * const options = PromtOptionsParse('core', { temperature: 0.7 })
 * // Returns: { temperature: 0.7, topP: 0.9, topK: 40, ... all other defaults }
 *
 * // Get only specified options
 * const options = PromtOptionsParse('core', { temperature: 0.7 }, false)
 * // Returns: { temperature: 0.7 }
 * ```
 */
export function PromtOptionsParse(use: 'core' | 'json', raw?: object, useAllOptions: boolean = true): TPromtOptions {
	const schema = use === 'core' ? SPromtOptions : SPromtOptionsJson
	const defaults = use === 'core' ? defVal : defValJson
	const input = raw && typeof raw === 'object' ? raw : {}

	const result: TPromtOptions = {}

	for (const key of Object.keys(defaults) as (keyof typeof defaults)[]) {
		const inputValue = (input as any)[key]
		const defaultValue = defaults[key]

		if (inputValue === undefined) {
			if (useAllOptions) {
				result[key] = defaultValue as any
			}
			continue
		}

		const propertySchema = (schema.properties as any)[key]
		if (propertySchema && Value.Check(propertySchema, inputValue)) {
			result[key] = inputValue
		} else {
			if (useAllOptions) {
				result[key] = defaultValue as any
			}
		}
	}

	if ((input as any).seed !== undefined) {
		const seedSchema = (schema.properties as any).seed
		if (seedSchema && Value.Check(seedSchema, (input as any).seed)) {
			result.seed = (input as any).seed
		}
	}

	return result
}
