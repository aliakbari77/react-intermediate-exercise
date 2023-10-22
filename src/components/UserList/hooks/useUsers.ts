import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";
import User from "../User.interface";
import axios from "axios";

const apiClient = new ApiClient<User>("/users");

const useUsers = () =>
	useQuery<User[], Error, User[]>({
		queryKey: ["users"],
		queryFn: apiClient.getAll,
		staleTime: 10 * 1000,
	});

export default useUsers;
