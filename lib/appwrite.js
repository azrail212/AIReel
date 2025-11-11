import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1', // Your Appwrite Endpoint
  platform: 'com.azra.aireel', // Your Appwrite Platform ID
  projectId: '690caa05003680ea00db', // Your Appwrite Project ID
  databaseId: '690cac1d001938bc0bcc', // Your Appwrite Database ID
  userCollectionId: 'users', // Your Appwrite User Collection ID
  videoCollectionId: 'videos', // Your Appwrite Video Collection ID
  storageId: '690cb0c4003b8d9ff511', // Your Appwrite Storage ID
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

export const account = new Account(client);
const avatars = new Avatars(client);
const databases= new Databases(client);



export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(), 
            email, 
            password,
            username);
        
        if (!newAccount) throw Error;
        
const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`;

        await signIn(email, password);
        const newUser= await databases.createDocument(appwriteConfig.databaseId, 
                                                    appwriteConfig.userCollectionId,
                                                    ID.unique(),
                                                    {
                                                        $id: newAccount.$id,
                                                        email,
                                                        username,
                                                        avatar: avatarUrl,
                                                    });
        return newUser;
        
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session
    }
    catch (error) {
        throw new Error(error);
    }
}

