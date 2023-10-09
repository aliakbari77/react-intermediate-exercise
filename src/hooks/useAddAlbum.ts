import { useMutation, useQueryClient } from "@tanstack/react-query";
import Album from "../components/AlbumList/Album.interface";
import axios from "axios";

interface AddAlbumContext {
	previousAlbum: Album[];
}

const useAddAlbum = (onAdd: () => void) => {
	const queryClient = useQueryClient();

	return useMutation<Album, Error, Album, AddAlbumContext>({
		mutationFn: (newAlbum: Album) =>
			axios
				.post<Album>("https://jsonplaceholder.typicode.com/albums", newAlbum)
				.then((res) => res.data),

		onMutate: (newAlbum: Album) => {
			const previousData = queryClient.getQueryData(["albums"]) || [];

			queryClient.setQueryData<Album[]>(["albums"], (albums = []) => [
				newAlbum,
				...albums,
			]);

			onAdd();

			return { previousData };
		},
		onSuccess: (savedAlbum: Album, newAlbum: Album) => {
			queryClient.setQueryData<Album[]>(["albums"], (albums) =>
				albums?.map((album) => (album === newAlbum ? savedAlbum : album))
			);
		},
		onError: (error: Error, newAlbum: Album, context: AddAlbumContext) => {
			queryClient.setQueryData<Album[]>(
				["albums"],
				() => context.previousAlbum
			);
		},
	});
};

export default useAddAlbum;
