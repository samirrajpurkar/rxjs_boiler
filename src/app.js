import $ from 'jquery'
import Rx from 'rxjs/Rx'

/* Observables from Events */
const btn = $('#btn')
const input = $('#input')
const output = $('#output')


const btn$ = Rx.Observable.fromEvent(btn, 'click')

btn$.subscribe(
  function(event) {
    console.log(event)
  },
  function(error) {
    console.log('Error')
  },
  function() {
    console.log('Completed')
  })

const input$ = Rx.Observable.fromEvent(input, 'keyup')

input$.subscribe(
  function(event) {
    console.log(event.target.value)
    output.text(event.target.value)
  },
  function(error) {
    console.log('Error')
  },
  function() {
    console.log('Completed')
  })

const mousemove$ = Rx.Observable.fromEvent(document, 'mousemove')

mousemove$.subscribe(
  function(event) {
    output.text('X: ' +event.clientX + ' ,' +'Y: ' +event.clientY) 
  },
  function(error) {
    console.log('Error')
  },
  function() {
    console.log('Completed')
  })


/* Observables from Arrays */

const numbers = [33,44,55,66,77]
const numbers$ = Rx.Observable.from(numbers)

numbers$.subscribe(
  v => {console.log(v)},
  error => {console.log(error)},
  complete => {console.log('completed')}
)

const posts = [
  {title: 'Post One', body: 'This is post one body...'},
  {title: 'Post Two', body: 'This is post two body...'},
  {title: 'Post Three', body: 'This is post three body...'}
]
const posts$ = Rx.Observable.from(posts)
posts$.subscribe(
  post => {
    $('#posts').append('<li><h3>'+post.title+'</h3></li>'+'<p>'+post.body+'</p>')
    console.log(post)
  },
  error => {console.log(error)},
  complete => {console.log('complete!')}
)

const set = new Set(['Hello', 44, {title: 'My Title'}])
const set$ = Rx.Observable.from(set)
set$.subscribe(
  setElement => {console.log(setElement)},
  error => {console.log(error)},
  complete => {console.log('completed!')}
)

const map = new Map([[1,'s'],[2,'a'],[3,'c']])
const map$ = Rx.Observable.from(map)
map$.subscribe(
  mapElement => {console.log(mapElement)},
  error => {console.log(error)},
  complete => {console.log('Map subscribition completed!')}
)

/* Observables from source */
const source$ = new Rx.Observable(
  observer => {
    console.log('Creating source$ Observable...')

    observer.next('Iteration 1')
    observer.next('Iteration 2')
    
    observer.error(new Error('Error!!!'))
    
    setTimeout(() => {
      observer.next('Yet another value....!')
      observer.complete()
    }, 3000)

  }
)
source$
  .catch(error => { return Rx.Observable.of(error)})
  .subscribe(
  o => {console.log(o)}, 
  error => {console.log(error)}, 
  complete => {console.log('Source$ subscribition completed...')}
)


/* Observables from Promises */
const myPromise = new Promise((resolve, reject) => {
  console.log('Creating Promise which will resolve in one second')
  setTimeout(() => {
    resolve('Hello from My Promise after one second...')
  }, 1000)
})
const myPromise$ = Rx.Observable.fromPromise(myPromise)
myPromise$.subscribe(
  p => {console.log(p)},
  error => {console.log(error)},
  complete => {console.log('My Promise completed!')}
)

function getGitHubUser(username) {
  return $.ajax({
    url:'https://api.github.com/users/'+username, 
    dataType:'jsonp'}).promise();
}

Rx.Observable.fromEvent($('#username'), 'keyup')
  .subscribe(
    username => {
      Rx.Observable.fromPromise(getGitHubUser(username.target.value))
        .subscribe(
          user => {
            console.log(user)
            $('#usernames').append('<li>Git Hub User Names: ' +user.data.name + '</li>')
          },
          error => {console.log(error)},
          complete => {console.log('git hub user details completed')}
        )
    }
)

/* Observables from Interval, Timer and Range */
const interval$ = Rx.Observable.interval(100).take(10)
interval$.subscribe(
  t => {console.log(t)},
  error => {console.log(error)},
  complete => {console.log('interval observable completed!')}
)

const timer$ = Rx.Observable.timer(1000, 100).take(5)
timer$.subscribe(
  t => {console.log(t)},
  error => {console.log(error)},
  complete => {console.log('timer observable completed!')}
)

const range$ = Rx.Observable.range(25,30)
range$.subscribe(
  r => {console.log(r)},
  error => {console.log(error)},
  complete => {console.log('range observable completed!')}
)

Rx.Observable.interval(100)
 .take(4)
 .map(e => {return (e * e)})
 .subscribe(
    d => {console.log(d)},
    error => {console.log(error)},
    complete => {console.log('doubling the counter using map completed')}
)

Rx.Observable.from(['Tim', 'Jim', 'Tom'])
  .map((name) => {
    return name.toUpperCase()
  })
  .subscribe(
    name => {console.log(name)},
    error => {console.log(error)},
    complete => {console.log('toUpperCase completed')}
  )

Rx.Observable.from([{name: 'Will', age: 20}, {name: 'Rahul', age: 30}, {name: 'Sal', age: 50}])
  .pluck('age')
  .subscribe(
      o => {console.log(o)},
      error => {console.log(error)},
      complete => {console.log('pluck completed')}
    )

/* Observables from Merge and concat */
Rx.Observable.of('Hello')
  .merge(Rx.Observable.of('World!'))
  .subscribe(
    o => {console.log(o)},
    error => {console.log(error)},
    complete => {console.log('merge completed')}
    )

const m1$ = Rx.Observable.interval(1000)
  .map(function(m) {
    return 'Merge1 :'+m
  })
  
const m2$ = Rx.Observable.interval(500)
  .map(m => 'Merge2 :'+m)

 Rx.Observable.merge(m1$, m2$)
  .take(10)
  .subscribe(
    m => {console.log(m)},
    error => {console.log(error)},
    complete => {console.log('merge timer completed')}
    )

Rx.Observable.range(0,5)
  .concat(Rx.Observable.range(6,10))
  .subscribe(
    c => {console.log(c)},
    error => {console.log(error)},
    complete => {console.log('concat completed')}
    )

/* Observables from MergeMap, SwitchMap and concatMap*/
Rx.Observable.of('Hello from MergeMap')
  .mergeMap(observer => {
    return Rx.Observable.of(observer +'..I am happy to be merged map...')
  })
  .subscribe (
    o => {console.log(o)},
    error => {console.log(error)},
    complete => {console.log('mergeMap completed')}

    )






