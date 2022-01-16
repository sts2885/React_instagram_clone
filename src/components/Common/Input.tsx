import styled, { css } from "styled-components";
import React, { useEffect, useState, useCallback } from "react";

export default function Input(props: Login.InputProps) {
    const { innerText, inputName, setUserData } = props;

    const [textType, setTextType] = useState("text");
    const [animation, setAnimation] = useState(false);
    const [userAnswer, setAnswer] = useState("");
    const [isShowPassword, setShowPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("");

    useEffect(() => {
        const typeCheck = inputName === "password" ? "password" : "text";
        setTextType(typeCheck);
        setPasswordMessage(message.show);
    }, []);

    const handleText = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            const updated = { [name]: value };
            const visible = value.length ? true : false;
            setUserData(updated);
            setAnswer(value);
            setAnimation(visible);
            setShowPassword(inputName === "password" && visible);
        },
        [setUserData],
    );

    const handlePasswordBtn = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            if (textType === "password") {
                setPasswordMessage(message.hide);
                return setTextType("text");
            }
            setPasswordMessage(message.show);
            setTextType("password");
        },
        [textType],
    );

    return (
        <Wrapper>
            <InputContent>
                <Label animation={animation}>
                    <Span>{innerText}</Span>
                    <WritingForm
                        onChange={handleText}
                        type={textType}
                        value={userAnswer}
                        name={inputName}
                    />
                </Label>
                <State>
                    {isShowPassword && (
                        <ShowPassword type="button" onClick={handlePasswordBtn}>
                            {passwordMessage}
                        </ShowPassword>
                    )}
                </State>
            </InputContent>
        </Wrapper>
    );
}

// props
const message = {
    show: "비밀번호 표시",
    hide: "숨기기",
};

// style
const Wrapper = styled.div`
    margin: 0 40px 6px;
`;

const InputContent = styled.div`
    display: flex;
    font-size: 14px;
    position: relative;
    width: 100%;
    border: 1px solid ${(props) => props.theme.color.bd_gray};
    background-color: ${(props) => props.theme.color.bg_gray};
    border-radius: 3px;
    align-items: center;
`;

const Label = styled.label<{ animation: Boolean }>`
    height: 36px;
    flex: 1 0 0;
    padding: 0;
    margin: 0;
    min-width: 0;
    position: relative;
    cursor: text;

    ${(props) =>
        props.animation &&
        css`
            & > span {
                transform: scale(0.83333) translateY(-10px);
            }
            & > input {
                padding: 14px 0 2px 8px;
            }
        `}
`;

const Span = styled.span`
    color: #8e8e8e;
    font-size: 12px;
    height: 36px;
    left: 8px;
    line-height: 36px;
    position: absolute;
    right: 0;
    transform-origin: left;
    user-select: none;
    transition: transform ease-out 0.1s;
`;

const WritingForm = styled.input`
    border: 0;
    flex: 1 0 auto;
    margin: 0;
    outline: 0;
    padding: 9px 0 7px 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    height: 100%;
    font-size: 12px;
`;

const State = styled.div`
    height: 100%;
    padding-right: 8px;
`;

const ShowPassword = styled.button`
    user-select: none;
`;
