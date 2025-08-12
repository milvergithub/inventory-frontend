// @ts-ignore
export const enum Search {
	// Numerics
	Equal = "eq",
	In = "in",
	GreaterThan = "gt",
	GreaterThanOrEqual = "gte",
	LessThan = "lt",
	LessThanOrEqual = "lte",
	NotEqual = "neq",
	NotIn = "nin",

	// Strings
	Match = "match",
	Contain = "contain",
	Start = "start",
	End = "end",

	// Shared
	IsNull = "null",
}
