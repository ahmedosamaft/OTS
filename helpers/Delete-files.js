export default async function DELETEALL(files){
    try{
        files.forEach(filePath => {
            unlinkSync(filePath);
           })
    } catch(err){
      console.log(err)
    }
   
}