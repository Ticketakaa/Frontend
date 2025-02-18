import { useParams } from "react-router-dom";
import NoData from "../../components/Common/NoData";
import CategoryView from "./Views/CategoryView"
import { useEffect, useState } from "react";
import PerformanceAPI from "../../api/performance";
import useGetPerformanceByCategory from "../../hooks/query/performance/useGetPerformanceByCategory";

const Category:any = () => {

    let category:{[key : string] : string }={
        'a4':'연극',
        'b3c':'무용',
        'c3a':'서양음악(클래식)',
        'c4':'한국음악(국악)',
        'c3d':'대중음악',
        'e3a':'복합',
        'e3b':'서커스/마술',
        'g3a':'뮤지컬'
    }
    
    const params = useParams();
    const genre = category[params.cat||''];
    // console.log(category[params.cat||''])
    const [page, setPage] = useState(0);
    const [perfprmanceData, setPerformanceData] = useState([]);
    const [error, setError] = useState({});
    const [isLast, setIsLast] = useState(false);
    //const page = useRef(0);
    const { isLoading } = useGetPerformanceByCategory(genre,page);
    
    useEffect(()=>{
        PerformanceAPI.getPerformanceByCategory(genre,page).then(res=>{
            // console.log(res.data)
            if(res.data.code===202){
                setError(res.data)
            }else{
                setPerformanceData(perfprmanceData.concat(res.data.data.content))
                setIsLast(res.data.data.last)
            }
            
        }).catch((error)=>{
            // console.log(data)
            // console.log(error)
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page,genre])

    
    return (
        isLoading?
        <></>
        // :typeof data === "string"
        // ?<NoData data={data}/>
        // :<CategoryView genre={genre} data={data} setPage={setPage}/>
        :JSON.stringify(error) === '{}'?
        <CategoryView setPage={setPage} data={perfprmanceData} isLast={isLast}/>
        :
        <NoData data={error}/>
    )
    
}

export default Category