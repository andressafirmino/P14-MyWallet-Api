export function unauthorizedError(resource = "Item") {
    return {
        type: "unauthorized",
        message: `${resource} não autorizado!`
    }
}