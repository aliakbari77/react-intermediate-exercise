import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Album from "../components/AlbumList/Album.interface";

const useAlbums = () =>
	useQuery<Album[], Error>({
		queryKey: ["albums"],
		queryFn: () =>
			axios
				.get<Album[]>("https://jsonplaceholder.typicode.com/albums")
				.then((res) => res.data)
				.catch((err) => err.message),
	});

export default useAlbums;
