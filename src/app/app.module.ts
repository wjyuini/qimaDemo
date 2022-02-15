import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DevUIModule } from 'ng-devui';
import { SelectModule } from 'ng-devui/select';
import { ButtonModule } from 'ng-devui/button';
// DevUI部分组件依赖angular动画，需要引入animations模块
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CreatePageComponent } from './create-page/create-page.component';
import { UpdatePageComponent } from './update-page/update-page.component';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { TextInputModule } from 'ng-devui/text-input';

@NgModule({
  declarations: [
    AppComponent,
    CreatePageComponent,
    UpdatePageComponent,
    MainPageComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    DevUIModule,
    BrowserAnimationsModule,
    ButtonModule,
    SelectModule,
    RouterModule,
    TextInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
