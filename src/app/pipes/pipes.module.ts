/*
*	pipes.module.ts
*	Created by: Leon Watson
*	PipesModule declares and exports pipes used in the application.
*/

import { NgModule } from '@angular/core';

import { SearchPipe } from '../pipes/search.pipe';

@NgModule({
	declarations:[
		SearchPipe	
	],
	imports:[
		
	],

	exports:[
		SearchPipe
	]
})

export class PipesModule{

}
