import { string, object } from "yup"

const changeProfileSchema = object().shape({
    firstName:
        string()
            .min(2, "نام باید حداکثر 2 حرف داشته باشید"),
    lastName: string()
        .min(2, "نام خانوادگی باید حداکثر 2 حرف داشته باشید"),
    email: string().email()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "ایمیل صحیح نمیباشد")
});

export default changeProfileSchema;
