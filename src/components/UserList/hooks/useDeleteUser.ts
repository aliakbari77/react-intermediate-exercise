import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";
import User from "../User.interface";

const apiClient = new ApiClient("/users");

interface DeleteUserContext {
	previousData: User[];
}

const useDeleteUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (user: User) => apiClient.delete(user.id),

		onMutate: (deletedUser: User) => {
			const previousUsers = queryClient.getQueryData<User[]>(["users"]) || [];

			queryClient.setQueryData<User[]>(["users"], (users = []) =>
				users.filter((user) => user.id !== deletedUser.id)
			);

			return { previousUsers };
		},

		onSuccess: (savedUser: User, deletedUser: User) => {
			queryClient.setQueryData<User[]>(["users"], (users) =>
				users?.map((user) => (user === deletedUser ? savedUser : user))
			);
		},

		onError: (error: Error, deletedUser: User, context: DeleteUserContext) => {
			if (!context) return;

			queryClient.setQueryData(["users"], context.previousData);
		},
	});
};

export default useDeleteUser;
