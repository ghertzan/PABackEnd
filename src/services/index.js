import petDao from "../dao/PetDao.js";
import userDao from "../dao/UserDao.js";
import apdoptionDao from "../dao/AdoptionDao.js";

import PetRepository from "../repository/PetRepository.js";
import UserRepository from "../repository/UserRepository.js";
import AdoptionRepository from "../repository/AdoptionRepository.js";

export const petService = new PetRepository(petDao);
export const userService = new UserRepository(userDao);
export const adoptionService = new AdoptionRepository(apdoptionDao);
