import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "com.self.foodordering",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: '688df6c000243a2c2307',
    userCollectionId: '688df7640021ee85d755'

}

// Auth functionality

export const client = new Client();

client  
    .setEndpoint(appwriteConfig.endpoint) 
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

// .setEndpoint(appwriteConfig.endpoint) --> showing in red underline means sometimes not able to get value
// you can do is putting exclamation mark to tell typescript that we know there is a value
// i.e. .setEndpoint(appwriteConfig.endpoint!) --> so instead of adding here add in  process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async ({ email, password, name}: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        if(!newAccount) throw Error;

        await signIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name);

        // const newUser = await databases.createDocument(
        //     appwriteConfig.databaseId,
        //     appwriteConfig.userCollectionId,
        //     ID.unique(), // documentId --> Just hover over createDocument to see in details
        //     {
        //         email, name, 
        //         accountId: newAccount.$id,
        //         avatar: avatarUrl
        //     }
        // );

        // return newUser;
        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(), // documentId --> Just hover over createDocument to see in details
            {
                email, name, 
                accountId: newAccount.$id,
                avatar: avatarUrl
            }
        );

    } catch (error) {
        throw new Error(error as string);
    }
}

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        // new session for user using email and password
        const session = await account.createEmailPasswordSession(email, password);

    } catch (error) {
        throw new Error(error as string);
    }
}

// ṭo fetch currently logged in user

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
        
    } catch (error) {
        console.log(error);
        throw new Error(error as string);
    }
}