import * as SecureStore from 'expo-secure-store';

import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

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
const storage = new Storage(client);



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
                                                        email:email,
                                                        username:username,
                                                        avatar: avatarUrl,
                                                        accountId: newAccount.$id,
                                                    });
        return newUser;
        
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const signIn= async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session
    }
    catch (error) {
        throw new Error(error);
    }
}


// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    console.log("Current User:", currentUser.documents[0]);
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    // Fetch creator user data for each post
    const postsWithCreator = await Promise.all(
      posts.documents.map(async (post) => {
        try {
          const creator = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,  // 👈 your users collection
            post.creator                       // 👈 user ID stored in post
          );

          return {
            ...post,
            creator,  // attach full user object
          };
        } catch (error) {
          console.warn("Creator fetch failed:", error);

          // fallback: return the post anyway
          return post;
        }
      })
    );

    return postsWithCreator;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getUser = async (userId) => {
  return await databases.getDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    userId
  );
};


export const getLatestVideos = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(7)]
    );

    // Fetch creator user data for each post
    const postsWithCreator = await Promise.all(
      posts.documents.map(async (post) => {
        try {
          const creator = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,  // 👈 your users collection
            post.creator                       // 👈 user ID stored in post
          );

          return {
            ...post,
            creator,  // attach full user object
          };
        } catch (error) {
          console.warn("Creator fetch failed:", error);

          // fallback: return the post anyway
          return post;
        }
      })
    );

    return postsWithCreator;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search('title', query)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }

};

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal('creator', userId)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};