import { useQuery } from '@tanstack/react-query'
import { GET_MA_TINH_TRANG_HS } from '../utils/queryKey'
import { getMaTinhTrangHoSo } from '../services/HopDong/hopdong'
export default function useMaTinhTrangHS() {
    return useQuery({
        queryKey: [GET_MA_TINH_TRANG_HS, {
            tk: "huypham",
            mk: 'e87cbf3ec7528de78fd28327c5cdfd6e',
        }],
        queryFn: async ({ queryKey }) => {
            const [, { tk, mk }] = queryKey
            return await getMaTinhTrangHoSo({ tk, mk })
        },
        staleTime: 600000
    })
}
