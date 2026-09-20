const serialize = (value) => (value ? JSON.parse(JSON.stringify(value)) : null);

export default serialize;
