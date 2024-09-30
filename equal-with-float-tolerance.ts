export function registerEqualWithFloatToleranceMatcher() {
    beforeAll(function () {
        jasmine.addMatchers({
            toEqualWithFloatTolerance: toEqualWithFloatToleranceMatcher
        });
    });
}

export function toEqualWithFloatToleranceMatcher(matchersUtil: jasmine.MatchersUtil) {
    return {
        compare: function (actual: any, expected: any, epsilon: number) {
            let customTester = function(a: any, b: any) {
                if (typeof a === 'number' && typeof b === 'number') {
                    return Math.abs(a - b) < epsilon;
                }
            };
            (matchersUtil as any).customTesters_.push(customTester);
            var result = matchersUtil.equals(actual, expected);
            (matchersUtil as any).customTesters_.splice((matchersUtil as any).customTesters_.indexOf(customTester), 1);

            return {
                pass: result
            };
        }
    };
}