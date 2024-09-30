export function registerEqualWithFloatToleranceMatcher() {
    beforeAll(function () {
        jasmine.addMatchers({
            toEqualWithFloatTolerance: toEqualWithFloatToleranceMatcher
        });
    });
}

export function toEqualWithFloatToleranceMatcher(matchersUtil: jasmine.MatchersUtil) {
    return {
        compare: function (actual: any, expected: any, epsilon: number, handleStringEmbeddedFloats: boolean = false) {
            let customTester = function(a: any, b: any) {
                if (typeof a === 'number' && typeof b === 'number') {
                    return Math.abs(a - b) < epsilon;
                }

                if (handleStringEmbeddedFloats) {
                    let floatPattern = /([0-9]+\.[0-9]+)/gm;
                    if (typeof a === 'string' && typeof b === 'string') {
                        let aMatches = a.match(floatPattern);
                        let bMatches = b.match(floatPattern);

                        if (aMatches && bMatches) {
                            if(aMatches.length !== bMatches.length) {
                                return false;
                            }

                            for (let i = 0; i < aMatches.length; i++) {
                                let aFloatMatch = parseFloat(aMatches[i]);
                                let bFloatMatch = parseFloat(bMatches[i]);

                                if (!customTester(aFloatMatch, bFloatMatch)) {
                                    return false;
                                }
                            }

                            return a.replace(floatPattern, "F") === b.replace(floatPattern, "F");
                        }
                    }
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