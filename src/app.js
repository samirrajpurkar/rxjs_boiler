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

Rx.Observable.fromEvent('#username', 'keyup')
  .

Rx.Observable.fromPromise(getGitHubUser('samirrajpurkar'))
  .subscribe(
    user => {
      console.log(user)
      $('#repos').text('Number of Git Repos: ' +user.data.public_repos)
    },
    error => {console.log(error)},
    complete => {console.log('git hub user details completed')}
  )










