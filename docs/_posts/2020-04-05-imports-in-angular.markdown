---
layout: post
title:  "Angular - Better imports with indexing"
date:   2020-04-05 11:00:00 +0530
categories: Angular tips
---
Importing modules, variables etc.. is the essential part of the modern programming languages.
Sometimes it becomes little bit overwhelming to organise them in a large application, where we have to import 
lot of modules in a single module or if want to write a better reusable code.

> [Typescript](https://www.typescriptlang.org/) provides us a way to minimize our imports.
> Since [Angular](https://angular.io/) comes with typescript support, in this document we will discuss
> how we use that typescript feature in angular application.  

### Let's begin the first steps to optimizing imports

Add our custom paths to `tsconfig.json` so that angular compiler can identify them

```json
{
    "compilerOptions": {
        "paths": {
              "@models": ["src/app/models/index"],
              "@services": ["src/app/services/index"],
              "@enums": ["src/app/enums/index"],
              "@apis": ["src/app/apis/index"],
              "@env": ["src/environments/index"]
        }
     }
}
```


For better manage our code, we will create related and same task files inside their particular folder.
>example:  
>All services lies inside the `src/app/services` folder  
> All models lies inside the `src/app/models` folder  


Now

Let's create a very simple service `http.service` which defines all basic methods for the HTTP calls like 
`GET, POST, PUT, DELETE`

```typescript

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }
   
}
```

I have created a another service for defining all of my REST APIs

```typescript

import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {IProducts} from '@models';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpService) {
  }

  fetchProducts() {
    return this.http.get<IProducts>('/products');
  }

}
``` 

#### It's time to export

To export all of our services from a single place and again import them from that single source inside 
our whole application, obliviously we need that place and it is a `index.ts`

Let's create a `index.ts` for the services

```typescript

export * from './http.service';
export * from './rest.service';
```

#### Time to import
>Notice how we import the **HttpService** service inside the *AppService*

```typescript

import {HttpService} from '@services';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpService) {
  }
}
```

Importing other modules (like - models etc in the same way)

```typescript
import {IProducts} from '@models';
```

### Finishing up

#### Pros.

- You don't need to remember the file names anymore
- Multiple imports reduced to single line
> single  line import
```typescript
import {HttpService, RestService} from '@services';
```
> general import  
```typescript
import {HttpService} from './http.service';
import {RestService} from './rest.service';
```

### Stay tuned and read more articles for more tips and tricks. 
