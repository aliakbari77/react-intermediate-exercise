import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Post from "../components/PostList/Post.interface";

interface PostQuery {
	pageSize: number;
}

const usePosts = (query: PostQuery) =>
	useInfiniteQuery<Post[], Error>({
		queryKey: ["posts", query],
		queryFn: ({ pageParam }) =>
			axios
				.get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
					params: {
						_start: (pageParam - 1) * query.pageSize,
						_limit: query.pageSize,
					},
				})
				.then((res) => res.data)
				.catch((err) => err.message),
		keepPreviousData: true,
		staleTime: 1 * 60 * 1000,
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length > 1 ? allPages.length + 1 : undefined;
		},
	});

export default usePosts;
