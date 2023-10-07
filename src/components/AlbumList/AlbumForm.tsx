import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef } from "react";
import Album from "./Album.interface";

interface AddAlbumContext {
	previousAlbum: Album[];
}

const AlbumForm = () => {
	const ref = useRef<HTMLInputElement>(null);

	const queryClient = useQueryClient();

	const addAlbum = useMutation<Album, Error, Album, AddAlbumContext>({
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

			return { previousData };
		},
		onSuccess: (savedAlbum: Album, newAlbum: Album) => {
			queryClient.setQueryData<Album[]>(["albums"], (albums = []) =>
				albums.map((album) => (album === newAlbum ? savedAlbum : album))
			);
		},
		onError: (error: Error, newAlbum: Album, context: AddAlbumContext) => {
			queryClient.setQueryData<Album[]>(
				["albums"],
				() => context.previousAlbum
			);
		},
	});

	return (
		<>
			{addAlbum.error && <p className="alert alert-danger">{addAlbum.error.message}</p>}
			<form
				className=""
				onSubmit={(event) => {
					event.preventDefault();

					if (ref.current && ref.current.value)
						addAlbum.mutate({
							id: 0,
							title: ref.current?.value,
							userId: 1,
						});

					if (ref.current?.value) ref.current.value = "";
				}}
			>
				<div className="input-group mb-3">
					<input type="text" className="form-control me-2" ref={ref} />
					<div className="input-group-append">
						<button className="btn btn-primary ms-2" type="submit">
							Add
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default AlbumForm;
