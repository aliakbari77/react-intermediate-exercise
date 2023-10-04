import React from "react";
import usePosts from "../../hooks/usePosts";

const PostList = () => {
	const pageSize = 10;
	const {
		data: posts,
		isLoading,
		error,
		fetchNextPage,
		isFetchingNextPage,
	} = usePosts({ pageSize });

	if (error) return <p>{error.message}</p>;

	if (isLoading) return <p>Loading...</p>;

	return (
		<>
			<ul className="list-group">
				{posts.pages.map((postPage, index) => (
					<React.Fragment key={index}>
						{postPage.map((post) => (
							<li className="list-group-item">{post.title}</li>
						))}
					</React.Fragment>
				))}
			</ul>
			<button
				className="btn btn-primary my-3"
				onClick={() => fetchNextPage()}
				disabled={isFetchingNextPage}
			>
				{isFetchingNextPage ? "Loading..." : "Load More"}
			</button>
		</>
	);
};

export default PostList;
