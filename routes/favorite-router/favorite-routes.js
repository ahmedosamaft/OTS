

import { addToFavorites, deleteFavorate, getAllFavorite } from '../../controllers/favorites-controller/favoriets-controller';
import { Router } from 'express';
import { favoritesValidations } from '../../controllers/favorites-controller/favorites-validation';
import { verifyToken } from '../../auth/auth';

const favoriteRouter=Router()






// add product to favorite by userId and productId
favoriteRouter.post("/addToFavorites",verifyToken(["user"],{optional:false}),favoritesValidations,addToFavorites)

//get All favorites
favoriteRouter.get("/getAllFavorites",getAllFavorite)

//delete favorites

favoriteRouter.delete("/deleteFavorite",verifyToken(["user"],{optional:false}),favoritesValidations,deleteFavorate)



export default favoriteRouter