import React from "react";
import useAlbums from "../../hooks/useAlbum";

const AlbumList = () => {
	const { data: albums, error, isLoading } = useAlbums();

	if (error) return <p className="alert alert-danger">{error.message}</p>;

	if (isLoading) return <p>Loading...</p>;

	return (
		<>
			<ul className="list-group">
				{albums?.map((album) => (
					<li className="list-group-item">{album.title}</li>
				))}
			</ul>
		</>
	);
};

export default AlbumList;
