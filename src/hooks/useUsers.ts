import axios, { all } from "axios"
import User from "../components/UserList/User.interface"
import {useInfiniteQuery, useQuery} from '@tanstack/react-query'

interface UserQuery{
    pageSize: number
}


const useUsers = (query: UserQuery) => useInfiniteQuery<User[], Error>({
    queryKey: ["users", query],
    queryFn: ({ pageParam }) => axios.get<User[]>("https://jsonplaceholder.typicode.com/users", {
        params: {
            _start: (pageParam - 1) * query.pageSize, 
            _limit: query.pageSize
        }
    }).then(res => res.data).catch(err => err.message),
    staleTime: 1 * 60 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPage) => {
        return lastPage.length > 0 ? allPage.length + 1 : undefined
    }
})

export default useUsers