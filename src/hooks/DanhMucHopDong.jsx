import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { GET_DANH_MUC_HOP_DONG } from '../utils/queryKey'
import { getDanhMucHopDong } from '../services/HopDong/hopdong'

export default function useDanhMucHopDong(current) {
    return useQuery({
        queryKey: [GET_DANH_MUC_HOP_DONG, {
            tk: "huypham",
            mk: 'e87cbf3ec7528de78fd28327c5cdfd6e',
            pageid: current
        }],
        queryFn: async ({ queryKey }) => {
            const [, { tk, mk, pageid }] = queryKey
            return await getDanhMucHopDong({ tk, mk, pageid })
        },
        staleTime: 60000
    })
}
