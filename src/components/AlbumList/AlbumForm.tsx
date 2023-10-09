import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef } from "react";
import Album from "./Album.interface";
import useAddAlbum from "../../hooks/useAddAlbum";

const AlbumForm = () => {
	const ref = useRef<HTMLInputElement>(null);

	const addAlbum = useAddAlbum(() => {
		if (ref.current) ref.current.value = ""
	})

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
