import styled from "styled-components";
import Card from "UI/Card";
import { useEffect, useState } from "react";
import ArticleHeader from "./ArticleHeader";
import ArticleImgSlider from "./ArticleImgSlider";
import ArticleMainIcons from "./ArticleMainIcons";
import ArticleMain from "./ArticleMain";
import CommentForm from "./CommentForm";

const ArticleCard = styled(Card)`
    margin-bottom: 24px;
    .article-createdAt {
        padding-left: 16px;
        margin-bottom: 16px;
        color: ${(props) => props.theme.font.gray};
        font-size: 10px;
    }
    .article-form-layout {
        padding: 6px 16px;
        display: flex;
        align-items: center;
        border-top: 1px solid #efefef;
        form {
            width: 100%;
        }
    }
`;

// 아마 여기 articleData는 상위 HomeSection 컴포넌트에서 가져와야 하지 않을까
const Article = ({ article }: ArticleProps) => {
    // data state
    const [myFollowersLiked, setMyFollowersLiked] = useState<string[]>([]);
    const [isMyFollowerLiked, setIsMyFollowerLiked] = useState(false);
    // like state
    const [isLiked, setIsliked] = useState(false);
    // red heart animation state
    const [isRedHeartAnimation, setIsRedHeartAnimation] = useState(false);
    useEffect(() => {
        // toggle likes
        // 내 팔로워 중 한 명이 좋아요 눌렀는지 확인(여기서 일단 내 팔로워가 like2라 가정)
        const getMyFollowerLiked = article.likes.filter(
            (username: string) => username === "like2"
        );
        setMyFollowersLiked(getMyFollowerLiked);
        setIsMyFollowerLiked(getMyFollowerLiked !== []);
    }, [article]);

    const toggleLikeHandler = (): void => {
        setIsRedHeartAnimation(true);
        setIsliked((prev: boolean) => !prev);
    };

    const changeToLikeHandler = (): undefined => {
        if (isLiked) return;
        setIsRedHeartAnimation(true);
        setIsliked(true);
    };

    const calculateTerm = (createdAt: number): string => {
        const gap = Date.now() - createdAt;
        if (gap >= 604800000) {
            return `${Math.floor(gap / 604800000)}주 전`;
        } else if (gap >= 86400000) {
            return `${Math.floor(gap / 86400000)}일 전`;
        } else if (gap >= 3600000) {
            return `${Math.floor(gap / 3600000)}시간 전`;
        } else if (gap >= 60000) {
            return `${Math.floor(gap / 60000)}분 전`;
        } else {
            return "방금 전";
        }
    };

    return (
        <ArticleCard as="article">
            <ArticleHeader article={article} />
            <ArticleImgSlider
                imgs={article.imgs}
                onLike={changeToLikeHandler}
            />
            <ArticleMainIcons
                isLiked={isLiked}
                onToggleLike={toggleLikeHandler}
                isAnimation={isRedHeartAnimation}
                resetAnimation={() => setIsRedHeartAnimation(false)}
            />
            <ArticleMain
                isMyFollowerLiked={isMyFollowerLiked}
                myFollowersLiked={myFollowersLiked}
                likes={article.likes}
                owner={article.owner}
                text={article.text}
                comments={article.comments}
            />
            <div className="article-createdAt">
                {calculateTerm(article.createdAt)}
            </div>
            <div className="article-form-layout">
                <CommentForm />
            </div>
        </ArticleCard>
    );
};

export default Article;
