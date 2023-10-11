import { validateExist, checkExist, checkExistThenGet } from './Staticsandmethods';


export default function existPlugin(schema, options) {
    schema.statics.validateExist = validateExist
    schema.statics.checkExist = checkExist
    schema.statics.checkExistThenGet = checkExistThenGet
    
};