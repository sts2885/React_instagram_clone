import { createSlice, current } from "@reduxjs/toolkit";

export interface InitialStateType {
    deleteChat: boolean;
    block: boolean;
    report: boolean;
    newChat: boolean;
}

const initialState: InitialStateType = {
    deleteChat: false,
    block: false,
    report: false,
    newChat: false,
};

const directSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            switch (action.payload) {
                case "deleteChat":
                    state.deleteChat = true
                    break;
                case "block":
                    state.block = true
                    break;
                case "report":
                    state.report = true
                    break;
                case "newChat":
                    state.newChat = true
                    break;
            }
        },
        closeModal: (state) => {
            // 이거 state = initialState 하면 왜 작동을 안하는지 궁금합니다....
            state.deleteChat = false;
            state.block = false;
            state.report = false;
            state.newChat = false;

        },
    },
    extraReducers: (build) => {

    },
});

export const { openModal,closeModal } = directSlice.actions;
export const directReducer = directSlice.reducer;