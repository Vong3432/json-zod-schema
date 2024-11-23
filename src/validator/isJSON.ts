const isJson = (jsonString: string): boolean => {
	try {
		const o = JSON.parse(jsonString);
		if (o && typeof o === "object") {
			return true;
		}
	} catch {
		return false;
	}
	return false;
};

export { isJson };
