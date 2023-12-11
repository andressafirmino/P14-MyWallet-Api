export function badRequestError(date) {
    return {
        type: "badRequest",
        message: `É necessário enviar uma ${date}`
    }
}