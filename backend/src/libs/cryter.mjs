import bcryptjs from "bcryptjs";

export const encryption = async (password) => {

    const salt = await bcryptjs.genSalt(5)
    return await bcryptjs.hash(password, salt)

}

export const encryptionComparison = async (password, receivedPassword) => {

    return await bcryptjs.compare(password, receivedPassword)

}