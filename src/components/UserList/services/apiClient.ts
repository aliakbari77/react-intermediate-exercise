import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com",
});

class ApiClient<T> {
	endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	getAll = () => {
		return axiosInstance.get<T[]>(this.endpoint).then((res) => res.data);
	};

	post = (data: T) => {
		return axiosInstance.post(this.endpoint, data);
	};

	delete = (id: number) => {
		return axiosInstance
			.delete(this.endpoint, {
				params: {
					id: id,
				},
			})
			.then((res) => res.data)
			.catch((err) => err.message);
	};
}

export default ApiClient;
