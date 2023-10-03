import axios from "axios"
import User from "../components/UserList/User.interface"
import {useQuery} from '@tanstack/react-query'

interface UserQuery{
    page: number;
    pageSize: number
}


const useUsers = (query: UserQuery) => useQuery<User[], Error>({
    queryKey: ["users", query],
    queryFn: () => axios.get<User[]>("https://jsonplaceholder.typicode.com/users", {params:{_start: (query.page - 1) * query.pageSize, _limit: query.pageSize}}).then(res => res.data).catch(err => err.message)
})

export default useUsers