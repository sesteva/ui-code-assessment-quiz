# Notes

## Randomizing Results

Ideally I would delegate the randomization on the backend, via adding a a parameter to a query on GraphQL or adding a flag or new route if doing REST.

I'm a big proponent of the UI team to own or be an active collaborator on a Backend for Frontend which could be fulfilled - ideally but not limited - by GraphQL .

For this exercise, I decided not to modify the expressJS API as I believed the focus would be exclusively on the UI.

## Services URLs

For practical reasons, I've hardcoded the URL of the backend.
For PROD, I would move them into ENV variables being injected at build time.
This would allow me to move build once and move the same binary across multiple environments hitting different instanced of the services.

## Avoid including lodash.shuffle

While we have included only shuffle, if we are cautous about final bundle size, then we could easily replace it by a more simple implementation.

      function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

## Avoid including he lib for decoding

One alternative is to use lodash.decode which is 10x smaller.
Only caveat is the &#039; entity which is not included in the lib.

If we wanted to overcome it we could sanitize in the backend. 
If we did have the possibility to influence that decision, we can use Stringiy with a replace fn and reg exression to remove the extra 0.