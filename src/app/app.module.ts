import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PageoneComponent } from './pageone/pageone.component';
import { PagetwoComponent } from './pagetwo/pagetwo.component';

@NgModule({
  declarations: [
    AppComponent,
    PageoneComponent,
    PagetwoComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'pageone', component: PageoneComponent},
      {path: 'pagetwo', component: PagetwoComponent}
    ])
  ],
  exports: [RouterModule],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
