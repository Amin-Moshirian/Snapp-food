import { string, object } from "yup"

const changeResProfSchema = object().shape({
    title: string().min(2, "عنوان شهر نباید کمتر از 2 حرف باشد"),
    city: string().min(2, "عنوان کسب و کار نباید کمتر از 2 حرف باشد"),
    shopName: string().min(2, "نام فروشگاه نباید کمتر از 2 حرف باشد"),
    ownerFirstName: string().min(2, "نام باید حداکثر 2 حرف داشته باشید"),
    ownerLastName: string().min(2, "نام خانوادگی باید حداکثر 2 حرف داشته باشید"),
});

export default changeResProfSchema;
