import { string, object } from "yup"

const passwordSchima = object().shape({
    newPassword: string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "رمز عبور باید یک حرف بزرگ و یک حرف کوچک و یک عدد داشته باشد")
        .required(),
    confirmNewPassword: string().required(),
});



export default passwordSchima;