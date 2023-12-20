import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";

import { TableStorageAdapter } from "@auth/azure-tables-adapter"
import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables"


const credential = new AzureNamedKeyCredential(
    process.env.AZURE_ACCOUNT as string,
    process.env.AZURE_ACCESS_KEY as string
);
const authClient = new TableClient(
    process.env.AZURE_TABLES_ENDPOINT as string,
    "auth",
    credential
);
export const authOptions ={
    
    adapter:TableStorageAdapter(authClient),
    
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET_ID as string,
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM
        })
    ]
} satisfies NextAuthOptions