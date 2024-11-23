import { AuthOptions, ISODateString } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from "next-auth/jwt";
import { LOGIN_URL } from "@/lib/apiEndPoint";
import axios from "axios";

// interface JWT {
//     user?: Customuser;
//   }
  

export type customSession = {
    user?:Customuser;

    expires:ISODateString
}
export type Customuser = {
    id?:string | null;
    name?:string;
    email?:string;
    token?:string;
}   

export const authOptions:AuthOptions = {

    pages:{
        signIn:'/login'
    },
    callbacks:{
        async session({session,token,user}:{session:customSession,token:JWT,user:Customuser}) {
          console.log("Session token is : ",user , session, token);  
          session.user = token.user as Customuser
            return session
   
        },
        async jwt({token, user}:{token:JWT, user:Customuser | null}) {
          console.log("JWT TOKEN IS : ",token,user);
            if(user){
                 token.user = user
           
            }
            return token
        }
    },
   providers: [
      CredentialsProvider ({
        name: "Credentials",
   
        credentials: {
          email: {  },
          password: {  }
        },
        async authorize(credentials, req) {
          const {data } = await axios.post(LOGIN_URL, credentials)
          const user = data?.data
    
          if (user) {
        
            return user
          } else {
        
            return null
    
          }
        }
      })
    ]
  }