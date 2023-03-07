import { expect } from 'chai';
import Booking from '../src/classes/Booking';

describe('User', () => {
  let users, recipeRepo, user, recipe1, recipe2, recipe3;

  beforeEach(() => {
    users = testData.users;

    recipeRepo = new RecipeRepository(testData.recipes);

    user = new User(users[0]);

    recipe1 = recipeRepo.recipes[0];
    recipe2 = recipeRepo.recipes[1];
    recipe3 = recipeRepo.recipes[2];
  });
  
  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceOf(User);
  });
  
  it('should have a name', () => {
    expect(user.name).to.equal('Saige O\'Kon');
  });
    
  it('should have an id', () => {
    expect(user.id).to.equal(1);
  });

  it('should have a place to save recipes', () => {
    expect(user.recipesToCook).to.deep.equal([]);
  });
});