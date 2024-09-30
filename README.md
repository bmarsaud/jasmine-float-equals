# jasmine-float-equals

`jasmine-float-equals` is a custom matcher for [Jasmine](https://jasmine.github.io/) deep comparing two objects while taking into account a tolerance for float comparison.

It can compare floats of type `number` but also floats that are embedded in a `string`, alone (ex: `'10.01'`) or within a text (ex: `'My 1st is 10.01 and my second is 25.1'`).

## Usage

Install the package :
```bash
npm install --save-dev jasmine-float-equals
```

Import the package before your tests and use the `toEqualWithFloatTolerance(expected: any, epsilon: number, handleStringEmbeddedFloats: boolean)` matcher.

* `epsilon`: the maximum difference allowed between two floats
* `handleStringEnbeddedFloats` (`false` by default): whether to also compare with a tolerance floats that are embedded in `string`

```ts
import 'jasmine-float-equals';

describe('my suit', function() {
    it('should pass with tolerance', function() {
        const expected = {
            hello: 10,
            world: {
                foo: 25
            }
        };
        const actual = {
            hello: 10.00001,
            world: {
                foo: 25.00005
            }
        };
        
        expect(actual).toEqualWithFloatTolerance(expected, 10e-6); // pass
        expect(actual).toEqualWithFloatTolerance(expected, 10e-7); // DON'T PASS
    });
    
    it('should pass with tolerance when embedded inside a string', function() {
        const expected = 'The result is 10.00001 units and 42.00001 subunits';
        const actual = 'The result is 10.00002 units and 42.00002 subunits';
        expect(actual).toEqualWithFloatTolerance(expected, 10e-6, true); // pass

        expect('10.00001').toEqualWithFloatTolerance('10.00002', 10e-6, true) // pass
    });
});
```

If you need to register the matcher at a given time, you can use the `registerEqualWithFloatToleranceMatcher` function.
```ts
import { registerEqualWithFloatToleranceMatcher } from 'jasmine-float-equals';

// at my specific time that I need it
registerEqualWithFloatToleranceMatcher();

```
This will register the matcher in a `beforeAll` block.

If you need to, you can also manually register the matcher to Jasmine using :
```ts
import { toEqualWithFloatToleranceMatcher } from 'jasmine-float-equals';


beforeAll(function () {
    jasmine.addMatchers({
        toEqualWithFloatTolerance: toEqualWithFloatToleranceMatcher
    });
});
```

Or execute the function manually:

```ts
let floatsAreEqual: boolean = toEqualWithFloatTolerance().compare(25, 25.00001, 10e-6).pass;
```

## Credits
Crafted with ❤️ by [Bastien MARSAUD](https://bastien-marsaud.fr).