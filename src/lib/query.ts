import { AxiosError } from "axios";

export function retryQuery(count: number, error: AxiosError) {
	const responseStatus = error.response?.status;
	if (responseStatus === 401 && count < 3) {
		return true;
	}
	return false;
}

export function isHttpSuccess(statusCode: number) {
	return statusCode >= 200 && statusCode <= 299;
}