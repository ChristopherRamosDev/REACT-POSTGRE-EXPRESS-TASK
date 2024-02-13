export const sendError = (res, message, statusCode = 500) => {
    res.status(statusCode).json({
        success: false,
        error: {
            message
        }
    })
}
export const sendStatus = (res, statusCode = 200, message = "", data) => {
    const responseData = {};

    // Agregar el mensaje al objeto de respuesta solo si se proporciona un mensaje
    if (message !== "") {
        responseData.message = message;
    }

    // Agregar los datos al objeto de respuesta solo si se proporcionan datos
    if (data !== undefined) {
        responseData.data = data;
    }

    res.status(statusCode).json(responseData);
}