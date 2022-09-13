import { postActions } from "app/store/ducks/post/postSlice";
import { useAppDispatch } from "app/store/Hooks";
import OnlyArticlePage from "components/Common/Article/OnlyArticlePage";
import { authorizedCustomAxios } from "customAxios";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
interface ArticleProps {
    data: PostType.ArticleProps;
}

const Paragraph = () => {
    const [isFetching, setIsFetching] = useState(true);
    const dispatch = useAppDispatch();
    const { postId: postIdStr } = useParams<{ postId: string }>();
    const postId = useMemo(() => +postIdStr, [postIdStr]);
    useEffect(() => {
        const getArticle = async () => {
            try {
                const {
                    data: { data },
                    status,
                } = await authorizedCustomAxios.get<ArticleProps>(
                    `/posts/${postId}`,
                );
                // if (status !== 200) throw "Hello";
                dispatch(postActions.getArticle(data));
            } catch (error) {
                console.log(error);
            } finally {
                setIsFetching(false);
            }
        };
        getArticle();
    }, [postId, dispatch]);
    return <div>{isFetching || <OnlyArticlePage />}</div>;
};

export default Paragraph;