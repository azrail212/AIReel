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

/* ---------------------------------------------------------
   Helper: Attach creator document to a single post
--------------------------------------------------------- */
const attachCreator = async (post) => {
  try {
    const creator = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      post.creator
    );

    return { ...post, creator };
  } catch (err) {
    console.warn("Creator fetch failed:", err);
    return post; // fallback to raw post
  }
};

/* ---------------------------------------------------------
   Helper: Attach creator to an array of posts
--------------------------------------------------------- */
const attachCreatorToPosts = async (posts) => {
  return Promise.all(posts.map((p) => attachCreator(p)));
};

/* ---------------------------------------------------------
   AUTH FUNCTIONS
--------------------------------------------------------- */

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

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

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

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

/* ---------------------------------------------------------
   POSTS / VIDEOS
--------------------------------------------------------- */

export const getAllPosts = async () => {
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId
  );
  
  return attachCreatorToPosts(posts.documents);
};


export const getUser = async (userId) => {
  return await databases.getDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    userId
  );
};


// Get latest videos
export const getLatestVideos = async () => {
  const res = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(7)]
  );

  return attachCreatorToPosts(res.documents);
};


// Search videos
export const searchPosts = async (query) => {
  const res = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId,
    [Query.search("title", query)]
  );

  return attachCreatorToPosts(res.documents);
};

// Get posts from one user
export const getUserPosts = async (userId) => {
  const res = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId,
    [Query.equal("creator", userId)]
  );

  return attachCreatorToPosts(res.documents);
};

