import { Static, Type } from '@sinclair/typebox'
import { PromptValue, defVal, defValJson } from './value.js'

export { defVal, defValJson }

export const SPromptOptions = Type.Object({
	temperature: Type.Optional(Type.Number({ ...PromptValue.temperature, default: defVal.temperature })),
	topP: Type.Optional(Type.Number({ ...PromptValue.topP, default: defVal.topP })),
	topK: Type.Optional(Type.Integer({ ...PromptValue.topK, default: defVal.topK })),
	minP: Type.Optional(Type.Number({ ...PromptValue.minP, default: defVal.minP })),
	maxTokens: Type.Optional(Type.Integer({ ...PromptValue.maxTokens, default: defVal.maxTokens })),
	repeatPenalty: Type.Optional(Type.Number({ ...PromptValue.repeatPenalty, default: defVal.repeatPenalty })),
	repeatPenaltyNum: Type.Optional(Type.Integer({ ...PromptValue.repeatPenaltyNum, default: defVal.repeatPenaltyNum })),
	presencePenalty: Type.Optional(Type.Number({ ...PromptValue.presencePenalty, default: defVal.presencePenalty })),
	frequencyPenalty: Type.Optional(Type.Number({ ...PromptValue.frequencyPenalty, default: defVal.frequencyPenalty })),
	mirostat: Type.Optional(Type.Integer({ ...PromptValue.mirostat, default: defVal.mirostat })),
	mirostatTau: Type.Optional(Type.Number({ ...PromptValue.mirostatTau, default: defVal.mirostatTau })),
	mirostatEta: Type.Optional(Type.Number({ ...PromptValue.mirostatEta, default: defVal.mirostatEta })),
	penalizeNewline: Type.Optional(Type.Boolean({ ...PromptValue.penalizeNewline, default: defVal.penalizeNewline })),
	stopSequences: Type.Optional(
		Type.Array(Type.String(), {
			...PromptValue.stopSequences,
			default: defVal.stopSequences,
		}),
	),
	trimWhitespace: Type.Optional(Type.Boolean({ ...PromptValue.trimWhitespace, default: defVal.trimWhitespace })),
	seed: Type.Optional(Type.Integer({ ...PromptValue.seed })),
	tokenBias: Type.Optional(Type.Record(Type.String(), Type.Number(), { ...PromptValue.tokenBias, default: defVal.tokenBias })),
	evaluationPriority: Type.Optional(Type.Integer({ ...PromptValue.evaluationPriority, default: defVal.evaluationPriority })),
	contextShiftSize: Type.Optional(Type.Integer({ ...PromptValue.contextShiftSize, default: defVal.contextShiftSize })),
	disableContextShift: Type.Optional(Type.Boolean({ ...PromptValue.disableContextShift, default: defVal.disableContextShift })),
})

export const SPromptOptionsJson = Type.Object({
	temperature: Type.Optional(Type.Number({ ...PromptValue.temperature, default: defValJson.temperature })),
	topP: Type.Optional(Type.Number({ ...PromptValue.topP, default: defValJson.topP })),
	topK: Type.Optional(Type.Integer({ ...PromptValue.topK, default: defValJson.topK })),
	minP: Type.Optional(Type.Number({ ...PromptValue.minP, default: defValJson.minP })),
	maxTokens: Type.Optional(Type.Integer({ ...PromptValue.maxTokens, default: defValJson.maxTokens })),
	repeatPenalty: Type.Optional(Type.Number({ ...PromptValue.repeatPenalty, default: defValJson.repeatPenalty })),
	repeatPenaltyNum: Type.Optional(Type.Integer({ ...PromptValue.repeatPenaltyNum, default: defValJson.repeatPenaltyNum })),
	presencePenalty: Type.Optional(Type.Number({ ...PromptValue.presencePenalty, default: defValJson.presencePenalty })),
	frequencyPenalty: Type.Optional(Type.Number({ ...PromptValue.frequencyPenalty, default: defValJson.frequencyPenalty })),
	mirostat: Type.Optional(Type.Integer({ ...PromptValue.mirostat, default: defValJson.mirostat })),
	mirostatTau: Type.Optional(Type.Number({ ...PromptValue.mirostatTau, default: defValJson.mirostatTau })),
	mirostatEta: Type.Optional(Type.Number({ ...PromptValue.mirostatEta, default: defValJson.mirostatEta })),
	penalizeNewline: Type.Optional(Type.Boolean({ ...PromptValue.penalizeNewline, default: defValJson.penalizeNewline })),
	stopSequences: Type.Optional(
		Type.Array(Type.String(), {
			...PromptValue.stopSequences,
			default: defValJson.stopSequences,
		}),
	),
	trimWhitespace: Type.Optional(Type.Boolean({ ...PromptValue.trimWhitespace, default: defValJson.trimWhitespace })),
	seed: Type.Optional(Type.Integer({ ...PromptValue.seed })),
	tokenBias: Type.Optional(Type.Record(Type.String(), Type.Number(), { ...PromptValue.tokenBias, default: defValJson.tokenBias })),
	evaluationPriority: Type.Optional(Type.Integer({ ...PromptValue.evaluationPriority, default: defValJson.evaluationPriority })),
	contextShiftSize: Type.Optional(Type.Integer({ ...PromptValue.contextShiftSize, default: defValJson.contextShiftSize })),
	disableContextShift: Type.Optional(Type.Boolean({ ...PromptValue.disableContextShift, default: defValJson.disableContextShift })),
})

export type TPromptOptions = Static<typeof SPromptOptions>

export type TPromptOptionsOpenAi = {
	temperature?: number
	top_p?: number
	max_tokens?: number
	frequency_penalty?: number
	presence_penalty?: number
	seed?: number
	stop?: string[]
	logit_bias?: Record<string, number>
	response_format?: any
}

export type TPromptOptionsOllama = {
	temperature?: number
	top_p?: number
	top_k?: number
	min_p?: number
	num_predict?: number
	repeat_penalty?: number
	repeat_last_n?: number
	mirostat?: number
	mirostat_tau?: number
	mirostat_eta?: number
	tfs_z?: number
	seed?: number
	stop?: string[]
	penalize_newline?: boolean
}

export type TPromptOptionsLlamaCpp = {
	temperature?: number
	topP?: number
	topK?: number
	minP?: number
	maxTokens?: number
	seed?: number
	trimWhitespaceSuffix?: boolean
	customStopTriggers?: (string | string[])[]
	tokenBias?: Record<string, number> | (() => Record<string, number>)
	evaluationPriority?: number
	contextShiftSize?: number
	disableContextShift?: boolean
	repeatPenalty?: false | {
		lastTokens?: number
		penalty?: number
		frequencyPenalty?: number
		presencePenalty?: number
		penalizeNewLine?: boolean
		punishTokensFilter?: (tokens: any[]) => any[]
	}
	grammar?: any
}