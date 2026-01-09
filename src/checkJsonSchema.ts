import { Ajv } from 'ajv'

/**
 * Validates JSON Schema string using AJV validator.
 *
 * @param raw - JSON Schema string to validate
 * @returns `undefined` if schema is valid, error message string if invalid
 *
 * @remarks
 * This function:
 * - Parses the JSON string to verify it's valid JSON
 * - Validates the schema structure using AJV (Another JSON Schema Validator)
 * - Checks for valid JSON Schema keywords and structure
 * - Returns `undefined` for valid schemas (including empty input)
 * - Returns error message for invalid JSON or invalid schema structure
 *
 * @example
 * ```typescript
 * const result1 = CheckJsonSchema('{"type": "object", "properties": {}}')
 * // Returns: undefined (valid schema)
 *
 * const result2 = CheckJsonSchema('{"type": "object1"}')
 * // Returns: error message (invalid type)
 *
 * const result3 = CheckJsonSchema('invalid json')
 * // Returns: error message (invalid JSON)
 *
 * const result4 = CheckJsonSchema('')
 * // Returns: undefined (empty input)
 * ```
 */
export function CheckJsonSchema(raw: string): string | undefined {
	if (!raw || raw.trim() === '') {
		return undefined
	}

	try {
		const json = JSON.parse(raw)
		const ajv = new Ajv({ strict: false, allErrors: true })
		ajv.compile(json)
		return undefined
	} catch (err) {
		return `${err}`
	}
}
