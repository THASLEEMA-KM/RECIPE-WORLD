import commonAPI from "./commonAPI"
import SERVER_URL from "./server_url"

// adding recipe
export const addRecipeAPI = async (recipies) =>
    {
        return await commonAPI("POST",`${SERVER_URL}/allRecipies`,recipies)
    }
// get all recipe called by view componenet
export const getAllRecipeAPI = async () =>
    {
        return await commonAPI("GET",`${SERVER_URL}/allRecipies`,"")
    }    


// remove all recipe called by foodcard componenet
export const removeRecipeAPI = async (recipeId) =>
    {
        return await commonAPI("DELETE",`${SERVER_URL}/allRecipies/${recipeId}`,{})
    }

// add favourites called by foodcard component
export const addFavouriteAPI = async (favouriteDeatils) =>
    {
        return await commonAPI("POST",`${SERVER_URL}/favourites`,favouriteDeatils)
    }
// get all fav recipe called by favourite componenet
export const getAllFavouritesAPI = async () =>
    {
        return await commonAPI("GET",`${SERVER_URL}/favourites`,"")
    }  
// delete favourite calledby favourite component
export const removeFavouriteAPI = async (favId) =>
    {
        return await commonAPI("DELETE",`${SERVER_URL}/favourites/${favId}`,{})
    }
    

    // get a foodcard called by foodcard component
export const getSingleRecipeAPI = async (recipeId) =>
    {
        return await commonAPI("GET",`${SERVER_URL}/allRecipies/${recipeId}`,"")
    }
    
    // updating recipe called by foodcard Component
// export const updateRecipeAPI = async (recipeId,recipeDeatils) =>
//     {
//         return await commonAPI("PUT",`${SERVER_URL}/allRecipies/${recipeId}`,recipeDeatils)
//     }


    export const updateRecipeAPI = async (recipeId,recipeDeatils) =>
        {
            return await commonAPI("PUT",`${SERVER_URL}/allRecipies/${recipeId}`,recipeDeatils)
        }
    