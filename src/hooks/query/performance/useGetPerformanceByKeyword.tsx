import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import PerformanceAPI from "../../../api/performance";
import { IPerformanceByCategoryResponse } from "../../../types/performance";

const useGetPerformanceByKeyword = (keyword: string | undefined, page: number) => {
    return useQuery(["getPerformanceByKeyword", keyword,page], () => PerformanceAPI.getPerformanceByKeyword(keyword,page), {
        select: (data: AxiosResponse<IPerformanceByCategoryResponse>) => {
            //console.table(data.data)
            return data.data;
        },
    });
}

export default useGetPerformanceByKeyword