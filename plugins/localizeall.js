import { localizeall, showalllanguage} from './Staticsandmethods';

export default function localize(schema, options) {
    schema.methods.showalllanguage = showalllanguage
    schema.statics.localizeall = localizeall
    schema.statics.unsetlang= ()=> {
        schema.options.toJSON= {...schema.options.toJSON, virtuals: false}
    }
    schema.statics.setlang= function(language) {
        schema.options.toJSON= {...schema.options.toJSON, virtuals: true}
        console.log(this)
        this.setDefaultLanguage(language)
    }
};