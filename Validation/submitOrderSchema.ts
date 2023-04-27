import { string, object } from "yup"

const shippingAddressValidaton = object().shape({
    name: string().min(2, "نام وارد شده باید حداقل 2 حرف داشته باشد"),
    address: string().min(10, "آدرس وارد شده باید حداقل 10 حرف داشته باشد").required(),
    postalCode: string().length(10, "کد پستی باید دقیقا 10 رقم باشد").required(),
    city: string().min(2, "شهر باید 2 حرف داشته باشد").required(),
    phone: string()
        .length(11, "شماره همراه باید دقیقا 11 رقم باشد")
        .matches(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/, "شماره موبایل وارد شده باید با 09 شروع شود")
        .required("شماره موبایل باید وارد شود"),
});

export default shippingAddressValidaton;
