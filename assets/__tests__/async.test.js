/* global describe it expect */
import Async from '@root/Async';

const fetchSomething = () =>
    new Promise(resolve => {
        setTimeout(() => resolve('future value'), 1500);
    });

const fetchSomething2 = () =>
    new Promise(resolve => {
        setTimeout(() => resolve('future value 2'), 500);
    });

const fetchError = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => reject('error'), 700);
    });

test('generator test', function*() {
    expect.assertions(2);
    
    const result = yield fetchSomething();
    expect(result).toEqual('future value');
    
    const result2 = yield fetchSomething2();
    expect(result2).toEqual('future value 2');
});

test('Async function test', (done) => {

    Async(function* (){

        const result = yield fetchSomething();
        expect(result).toEqual('future value');
        
        yield fetchError();

        const result2 = yield fetchSomething2();
        expect(result2).toEqual('future value 2');

        done();
    })().subscribe(
        () => {},
        (error) => {
            expect(error).toEqual('error');
        },
        () => {}
    );

});