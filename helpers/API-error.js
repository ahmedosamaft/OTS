class APIError extends Error {
    constructor(status,message){
        super()
        this.status=status
         this.error=[]
        Array.isArray(message) ? this.error.push(...message) : this.error.push(message)
        this.message=this.error[0]
        
     

    }
}

export default APIError