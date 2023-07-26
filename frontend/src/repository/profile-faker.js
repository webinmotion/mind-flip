import {faker} from '@faker-js/faker';

function createRandomUser() {
    return {
        _id: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
        city: faker.location.city(),
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        bio: faker.person.bio(),
        tier: faker.helpers.arrayElement(['PRO', 'BASIC', 'BIZ']),
    };
}

export default async () => {
    return new Promise((resolve) => {
        const handle = setTimeout(function () {
            resolve({data: createRandomUser()});
            clearTimeout(handle);
        }, 1000);
    });
}