import useContactStore
    from "../store/useContactStore";


export function useContact() {

    const loading =
        useContactStore(
            (state) =>
                state.loading
        );

    const error =
        useContactStore(
            (state) =>
                state.error
        );

    const validationErrors =
        useContactStore(
            (state) =>
                state.validationErrors
        );

    const success =
        useContactStore(
            (state) =>
                state.success
        );

    const submitContact =
        useContactStore(
            (state) =>
                state.submitContact
        );

    const resetContactState =
        useContactStore(
            (state) =>
                state.resetContactState
        );


    return {
        loading,
        error,
        validationErrors,
        success,
        submitContact,
        resetContactState,
    };
}