import {Cities} from './fixtures';
import {CityModel} from './schemas';

export const runSeed = () => {
  CityModel.insertMany(Cities)
    .then(() => {
      console.log('seeded mongo succesfully');
    })
    .catch(e => {
      console.log('err while seed mongo: ', e);
    })
};

export const clearCities = () => {
  CityModel.deleteMany()
    .then(() => {
      console.log('deleted cities mongo succesfully');
    })
    .catch(e => {
      console.log('err while seed mongo: ', e);
    })
};

runSeed();
// clearCities();