import { object, string } from 'yup';

export const ToyFormSchema = object({
    name: string().min(5, "Mínimo de 5 caracteres").required("Este campo é obrigatório"),
});

export const ResetPassWordSchema = object({
    oldPass: string().min(5, "Mínimo de 5 caracteres").max(15, "Máximo de 15 caracteres").required("Este campo é obrigatório"),
    newPass: string().min(5, "Mínimo de 5 caracteres").max(15, "Máximo de 15 caracteres").required("Este campo é obrigatório"),
})