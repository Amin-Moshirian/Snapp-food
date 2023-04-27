import { string, object } from "yup"

const restaurantSchima = object().shape({
    title: string().min(2, "عنوان شهر نباید کمتر از 2 حرف باشد").required(),
    city: string().min(2, "عنوان کسب و کار نباید کمتر از 2 حرف باشد").required(),
    mobile: string().length(11, "شماره موبایل باید 11 رقم باشد و با 09 شروع شده باشد").matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/).required(),
    shopName: string().min(2, "نام فروشگاه نباید کمتر از 2 حرف باشد").required(),
    ownerFirstName: string().min(2, "نام باید حداکثر 2 حرف داشته باشید").required(),
    ownerLastName: string().min(2, "نام خانوادگی باید حداکثر 2 حرف داشته باشید").required()
});

export default restaurantSchima;
