import { useQuery } from '@tanstack/react-query'
import { GET_MA_KHACH_HANG } from '../utils/queryKey'
import { getMaKhachHang } from '../services/HopDong/hopdong'

export default function useFetchCustomer(id) {
    return useQuery({
        queryKey: [GET_MA_KHACH_HANG, {
            tk: "huypham",
            mk: 'e87cbf3ec7528de78fd28327c5cdfd6e',
            id
        }],
        queryFn: async ({ queryKey }) => {
            const [, { tk, mk, id }] = queryKey
            return await getMaKhachHang({ tk, mk, id })
        },
        staleTime: 100000
    })
}
