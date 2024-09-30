import {toEqualWithFloatToleranceMatcher} from "./equal-with-float-tolerance";

var matchersUtil = new (jasmine as any).MatchersUtil();

describe('equalsWithFloatTolerance custom matcher', function () {
    it('should pass', function () {
        const expected = {
            hello: 10.01,
            world: {
                foo: 25.02
            }
        };
        const actual = {
            hello: 10.011,
            world: {
                foo: 25.025
            }
        };


        expect(toEqualWithFloatToleranceMatcher(matchersUtil).compare(actual, expected, 0.01).pass).toBe(true);
    });

    it('should not pass', function () {
        const expected = {
            hello: 10.01,
            world: {
                foo: 25.02
            }
        };
        const actual = {
            hello: 10.011,
            world: {
                foo: 25.03
            }
        };

        expect(toEqualWithFloatToleranceMatcher(matchersUtil).compare(actual, expected, 0.01).pass).toBe(false);
    });

    it('should handle multiple epsilons', function () {
        const expected = {
            hello: 10.01,
            world: {
                foo: 25.02
            }
        };
        const actual = {
            hello: 10.011,
            world: {
                foo: 25.025
            }
        };

        expect(toEqualWithFloatToleranceMatcher(matchersUtil).compare(actual, expected, 0.01).pass).toBe(true);
        expect(toEqualWithFloatToleranceMatcher(matchersUtil).compare(actual, expected, 0.001).pass).toBe(false);
    });

    it('should pass with an in string embedded float', function() {
        const expected = '{"type":"Point","coordinates":[934663.2710598737,6486260.2478283577],"crs":{"properties":{"name":"EPSG:2154"},"type":"name"}}';
        const actual = '{"type":"Point","coordinates":[934663.2710598734,6486260.2478283574],"crs":{"properties":{"name":"EPSG:2154"},"type":"name"}}';

        expect(toEqualWithFloatToleranceMatcher(matchersUtil).compare(actual, expected, 1e-9, true).pass).toBe(true);
    });

    it('should not pass with an in string embedded float', function() {
        const expected = '{"type":"Point","coordinates":[934663.2710598737,6486260.2478283577],"crs":{"properties":{"name":"EPSG:2154"},"type":"name"}}';
        const actual = '{"type":"Point","coordinates":[934663.2710598734,6486260.2478283574],"crs":{"properties":{"name":"EPSG:2154"},"type":"name"}}';

        expect(toEqualWithFloatToleranceMatcher(matchersUtil).compare(actual, expected, 1e-10, true).pass).toBe(false);
    })
});