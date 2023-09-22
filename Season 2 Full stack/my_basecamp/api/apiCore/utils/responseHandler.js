exports.responseHandler = ({res, status = 200, data = null, message =''}) =>{
    return res.status(status).json({
        status ,
        data,
        message,
        
    })
}