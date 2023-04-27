import { string, object, number, boolean } from "yup"

const foodSchema = object().shape({
    name: string().min(2, "نام غذا باید حداقل 2 حرف باشد").required(),
    description: string().min(10, "توضیحات غذا باید حداقل 10 حرف باشد").required(),
    rating: number().min(1, "امیتاز نباید کمتر از 1 باشد").max(5, "امتیاز نباید بیشتر از 5 باشد").required(),
    price: number().min(0, "مقدار قیمت نمیتواند کمتر از 0 باشد").required(),
    isActive: boolean().required(),
});

export default foodSchema;