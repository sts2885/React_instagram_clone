import styled, { css } from "styled-components";
import React, { useState } from "react";
import axios from "axios";
import ImageSprite from "components/Common/LoginSprite";

interface InputProps {
    isSmallInnerText: boolean;
}

const InputContainer = styled.div<InputProps>`
    margin: 0 40px 6px;

    .inputContent {
        display: flex;
        font-size: 14px;
        position: relative;
        width: 100%;
        border: 1px solid ${(props) => props.theme.color.bd_gray};
        background-color: ${(props) => props.theme.color.bg_gray};
        border-radius: 3px;
        align-items: center;
    }

    .placeholder {
        height: 36px;
        flex: 1 0 0;
        padding: 0;
        margin: 0;
        min-width: 0;
        position: relative;
        cursor: text;

        .innerText {
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
            ${(props) =>
                props.isSmallInnerText &&
                css`
                    transform: scale(0.83333) translateY(-10px);
                `}
        }

        .writingForm {
            border: 0;
            flex: 1 0 auto;
            margin: 0;
            outline: 0;
            padding: ${(props) =>
                props.isSmallInnerText ? "14px 0 2px 8px" : "9px 0 7px 8px"};
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            height: 100%;
            font-size: 12px;
        }
    }

    .inputState {
        height: 100%;
        padding-right: 8px;
        display: flex;

        .stateStyle {
            margin-left: 8px;
        }
        .showPassword {
            user-select: none;
        }
    }
`;

const ValidFlag: Login.ImageProps = {
    width: 22,
    height: 22,
    position: `-225px -333px`,
};

const InvalidFlag: Login.ImageProps = {
    width: 22,
    height: 22,
    position: `-249px -333px`,
};

export default function Input(props: Login.InputProps) {
    const { innerText, onUserDataUpdater, type, inputName, value } = props;

    const [isFocus, setFocus] = useState(false);
    const [isValidValue, setValueValid] = useState(false);
    const [isSmallInnerText, setInnerTextSize] = useState(false);
    const [inputType, setInputType] = useState(type);
    const [isShowPassword, setShowPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState<
        "비밀번호 표시" | "숨기기"
    >("비밀번호 표시");

    const textChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const userInput = { [name]: value };
        const hasValue = value.length ? true : false;
        onUserDataUpdater(userInput);
        setInnerTextSize(hasValue);
        setShowPassword(inputName === "password" && hasValue);
    };

    const passwordVisibleHandler = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
        setInputType(inputType === "password" ? "text" : "password");
        setPasswordMessage(
            inputType === "password" ? "숨기기" : "비밀번호 표시",
        );
    };

    const valueVaildHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        if (props.validator === undefined) return;
        if (event.target.value.length === 0) return;
        setFocus(false);
        const validResult = props.validator(event.target.value);

        if (validResult && inputName === "username") {
            const checkUniqueName = async () => {
                axios
                    .post(
                        `http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080/accounts/check?username=${event.target.value}`,
                    )
                    .then((response) => {
                        // if (!response.data.data) {
                        //     console.log(`이미 존재하는 사용자 이름입니다.`);
                        // }
                        setValueValid(() => response.data.data);
                    })
                    .catch((error) => {
                        throw new Error(
                            `사용자이름 중복검사 API 요청 중에 발생한 에러입니다. 세부에러정보 : ${error}`,
                        );
                    });
            };
            checkUniqueName();
        } else {
            setValueValid(() => validResult);
        }
    };

    return (
        <InputContainer isSmallInnerText={isSmallInnerText}>
            <div className="inputContent">
                <label className="placeholder">
                    <span className="innerText">{innerText}</span>
                    <input
                        className="writingForm"
                        onBlur={valueVaildHandler}
                        onChange={textChangeHandler}
                        onFocus={() => setFocus(true)}
                        type={inputType}
                        value={value}
                        name={inputName}
                    />
                </label>
                <div className="inputState">
                    {isFocus ? null : props.validator && isValidValue ? (
                        <ImageSprite {...ValidFlag} className="stateStyle" />
                    ) : props.validator && value.length ? (
                        <ImageSprite {...InvalidFlag} className="stateStyle" />
                    ) : null}
                    {isShowPassword && (
                        <button
                            className="showPassword stateStyle"
                            type="button"
                            onClick={passwordVisibleHandler}
                        >
                            {passwordMessage}
                        </button>
                    )}
                </div>
            </div>
        </InputContainer>
    );
}
