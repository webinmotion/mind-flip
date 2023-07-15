import supertest from 'supertest';
import app from '../app';
import { request } from 'express';

describe("Registering a new player", () => {

    describe("When the player type is not valid", () => {

        test("Should return 'Invalid player type' error", () => {
            const resp = request(app).post('/').send({
                player_type: 'what the heck'
            });
            expect(resp.data).toContain('Invalid player type');
        })
    });

    describe.skip("When the email provided is already in use", () => {

        test()
    });

    describe.skip("When an email address is missing", () => {

        test()
    });

    describe.skip("When the screen name provided is already in use", () => {

        test()
    });

    describe.skip("When a screen name is missing for NON-guest player", () => {

        test()
    });

    describe.skip("When database persistence fails", () => {

        test()
    });

    describe.skip("When data is successfully persisted", () => {

        test()
    });
});