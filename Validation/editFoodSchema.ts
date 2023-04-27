import { string, object, number, boolean } from "yup"

const editFoodSchema = object().shape({
    name: string().min(2, "نام غذا باید حداقل 2 حرف باشد"),
    description: string().min(10, "توضیحات غذا باید حداقل 10 حرف باشد"),
    rating: number().min(1, "امیتاز نباید کمتر از 1 باشد").max(5, "امتیاز نباید بیشتر از 5 باشد"),
    price: number().min(0, "مقدار قیمت نمیتواند کمتر از 0 باشد"),
    isActive: boolean(),
});

export default editFoodSchema;