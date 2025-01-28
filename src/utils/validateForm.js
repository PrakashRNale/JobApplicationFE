export const isValidForm = (formFields, formValues) =>{
    let errorMessage = '';
    for(let field of formFields){
        if(field.isRequired && formValues[field.fieldName] == ''){
            errorMessage = field.errorMessage
            break ;
        }
    }

    return errorMessage;
}