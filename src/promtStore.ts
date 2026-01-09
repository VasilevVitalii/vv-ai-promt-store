import { TPromt, TPromtOptions } from './index.js'

/**
 * Serializes prompt objects into a text string with structured sections.
 *
 * @param promt - Array of TPromt objects to serialize
 * @returns Formatted text string with $$begin/$$end markers and sections
 *
 * @remarks
 * Output format structure:
 * - Each prompt is wrapped in `$$begin` / `$$end`
 * - Sections are ordered: $$options, $$system, $$user, $$jsonresponse, $$segment=*
 * - Options are serialized in key=value format
 * - Arrays and objects are serialized as JSON
 * - JSON response schema is stored as formatted JSON Schema
 *
 * @example
 * ```typescript
 * const prompts: TPromt[] = [{
 *   system: 'You are helpful',
 *   user: 'Hello!',
 *   options: { temperature: 0.7 },
 *   jsonresponse: '{"type": "object"}'
 * }]
 *
 * const text = PromtStore(prompts)
 * // Returns:
 * // $$begin
 * // $$options
 * // temperature=0.7
 * // $$system
 * // You are helpful
 * // $$user
 * // Hello!
 * // $$jsonresponse
 * // {"type": "object"}
 * // $$end
 * ```
 */
export function PromtStore(promt: TPromt[]): string {
	return serialize(promt)
}

function serialize(promts: TPromt[]): string {
	const result: string[] = []

	for (const promt of promts) {
		result.push('$$begin')

		if (promt.options) {
			result.push('$$options')
			for (const [key, value] of Object.entries(promt.options)) {
				result.push(serializeOptionValue(key as keyof TPromtOptions, value))
			}
		}

		if (promt.system) {
			result.push('$$system')
			result.push(promt.system)
		}

		result.push('$$user')
		result.push(promt.user)

		if (promt.jsonresponse) {
			result.push('$$jsonresponse')
			result.push(promt.jsonresponse)
		}

		if (promt.segment) {
			for (const [key, value] of Object.entries(promt.segment)) {
				result.push(`$$segment=${key}`)
				result.push(value)
			}
		}

		result.push('$$end')
	}

	return result.join('\n')
}

function serializeOptionValue(key: keyof TPromtOptions, value: any): string {
	if (value === undefined) {
		return `${key}=`
	}

	if (Array.isArray(value)) {
		return `${key}=${JSON.stringify(value)}`
	}

	if (typeof value === 'object' && value !== null) {
		return `${key}=${JSON.stringify(value)}`
	}

	return `${key}=${value}`
}
