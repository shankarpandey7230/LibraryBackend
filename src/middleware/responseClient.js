export const responseClient = ({req, res, message, statusCode = 200}) => {
    

    // response passed 
    req.success = () => {
        return res.status(statusCode).json({
            status: "success",
            message,
        });
    }
    //wrong response
    req.error = () => {
        res.status(statusCode).json({
            status: "error",
            message,
        })
    };
    if (statusCode >= 200 && statusCode < 300) {
        return req.success()
    } else {
        return req.error()
    }
}