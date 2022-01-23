import { createAsyncThunk } from "@reduxjs/toolkit";
import { HomeType } from "@type";
import { homeActions } from "app/store/ducks/home/homeSlice";
import axios from "axios";

export const getHomeArticles = createAsyncThunk<
    HomeType.ArticleProps[],
    {
        token: string;
    }
>("home/getHomeArticles", async (payload, ThunkOptions) => {
    const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
    };
    try {
        const {
            data: { data },
        } = await axios.get(
            "http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080/posts/recent",
            config,
        );
        return data;
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }
});

export const getExtraArticle = createAsyncThunk<
    HomeType.ArticleProps,
    {
        token: string;
        page: number;
    }
>("home/getExtraArticle", async (payload, ThunkOptions) => {
    const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
    };
    try {
        const {
            data: {
                data: { content: data, empty },
            },
        } = await axios.get(
            `http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080/posts?page=${payload.page}`,
            config,
        ); // 단건 조회 api 추가
        console.log(empty);
        if (empty) {
            throw ThunkOptions.rejectWithValue(
                "게시물이 더 이상 존재하지 않습니다.",
            );
        }
        ThunkOptions.dispatch(homeActions.increaseExtraArticlesCount());
        return data[0];
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }
});