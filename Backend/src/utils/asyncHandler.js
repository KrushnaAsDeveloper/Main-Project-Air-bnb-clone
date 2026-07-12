// const asyncHandler = (fn)=> async (req, res, next)=>{
//     try {
//        await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             msg : error.message = "this is the error"
//         })
//     }
// }

 const asyncHandler = (fn) => async (req, res, next)=>{
    return Promise.resolve(fn(req,res,next)).catch(error =>next(error))
 }
// one more variety use in the production where we directly handle the promise 

// const asyncHandler = (fn)=> (req,res,next)=>{
//     return Promise.resolve(fu(req,res,next)).catch(error => next(error))
// }
// // copilet says this is the better for production 


export {asyncHandler}