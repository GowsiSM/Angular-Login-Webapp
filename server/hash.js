import bcrypt from "bcrypt";

const hashPassword = async (password) => {
     const hashed = await bcrypt.hash(password, 10);
     console.log(`Hashed Password for "${password}":`, hashed);
};

hashPassword("Admin123");
hashPassword("admin123");
