import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";
import User from "../User.interface";

const apiClient = new ApiClient("/users");

interface AddUserContext {
	previousUsers: User[];
}

const useAddUser = () => {
	const queryClient = useQueryClient();

	return useMutation<User, Error, User, AddUserContext>({
		mutationFn: (user: User) => apiClient.post(user),

		onMutate: (newUser: User) => {
			const previousUsers = queryClient.getQueryData<User[]>(["users"]) || [];

			queryClient.setQueryData<User[]>(["users"], (users = []) => [
				newUser,
				...users,
			]);

			return { previousUsers };
		},

		onSuccess: (savedUser: User, newUser: User) => {
			queryClient.setQueryData<User[]>(["users"], (users) =>
				users?.map((user) => (user === newUser ? savedUser : user))
			);
		},

		onError: (error: Error, newUser: User, context: AddUserContext) => {
			if (!context) return;

			queryClient.setQueryData(["users"], context.previousUsers);
		},
	});
};

export default useAddUser;
