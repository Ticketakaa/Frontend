import React, { useState } from 'react'
import styled from "@emotion/styled";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header";
import { IHeaderProps, ILayoutProps } from "../types";
import Footer from "../Footer";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
`;

const OutletContainer = styled.div`
    display: flex;
    flex: 1;
    height: fit-content;
    flexDirection: column;
    width: 100%;
`;

const LayoutView = ({menu,onSetMenu}:ILayoutProps) => {
    const navigate=useNavigate();
    const [search, setSearch] = useState("");
    const [my, setMy] = useState("");

    const headerProps:IHeaderProps={
        menu,
        onSetMenu,
        category:[
            {title:'홈',id:'home'},
            {title:'연극',id:'a4'},
            {title:'무용',id:'b3a'},
            {title:'클래식',id:'c3a'},
            {title:'국악',id:'c4'},
            {title:'대중음악',id:'c3d'},
            {title:'복합',id:'e3a'},
            {title:'서커스/마술',id:'e3b'},
            {title:'뮤지컬',id:'g3a'},
        ],
        goMyPage: () => {
            // window.localStorage.getItem('token')
            // ?navigate('/my',{state:'userInfo'})
            // :navigate('/login')
            navigate('/my',{state:'userInfo'})
        },
        onSearchChange: (e) => {
            setSearch(e.target.value);
        },
        onSearch: (e)=>{
            if (e.key === 'Enter') {
                //백엔드 검색 모듈 요청
                navigate(`/search?keyword=${search}`,{state:search})
            }
        },
        
    }
    return (
        <Container>
            <Header {...headerProps}/>
            <OutletContainer>
                <Outlet/>
            </OutletContainer>
            <Footer/>
        </Container>
    )
}

export default LayoutView