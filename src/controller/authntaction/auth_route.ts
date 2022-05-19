// import client from "../../database";
// import bcrypt from "bcrypt";
// import { user } from "../../Model/user.model";
// const auth = async authentication(username:string ,password:string):Promise<user|null>{
//     try{
//         const conn=await client.connect();
//         const sql='select * from users where username=$1';
//         const result = await conn.query(sql,[username]);

//         if(result.rows.length){
//             if(bcrypt.compareSync(password +process.env.BCRYPT_PASSWORD,result.rows[0].password_digest)){

//                 const userInfo=await conn.query(sql,[username]);
//                 return userInfo.rows[0];
//             }
//         }
//         conn.release();
//         return null;
//     }
//     catch(err)
//     {
//         throw new Error(`unable to login :${err}`)
//     }
// }
