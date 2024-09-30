export * from './equal-with-float-tolerance';
import {registerEqualWithFloatToleranceMatcher} from "./equal-with-float-tolerance";

(function() {
    registerEqualWithFloatToleranceMatcher();
})();

declare global {
    namespace jasmine {
        interface Matchers<T> {
            toEqualWithFloatTolerance(expected: any, epsilon: number, handleStringEmbeddedFloats?: boolean): boolean;
        }
    }
}