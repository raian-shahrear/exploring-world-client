export const buildQueryParams = (params: Record<string, any>) => {
  const query = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (Array.isArray(value) && value.length > 0) {
      query.append(key, value.join(","));
    } else if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  return query.toString();
};
