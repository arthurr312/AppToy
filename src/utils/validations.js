import {object, string} from 'yup';

export const ToyFormSchema = object({
    name: string().min(5, "Mínimo de 5 caracteres").required("Este campo é obrigatório"),
});