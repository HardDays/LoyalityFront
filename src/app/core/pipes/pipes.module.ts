
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneShowRuPipe } from './phone-show-ru.pipe';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ PhoneShowRuPipe ],
  exports:      [ PhoneShowRuPipe ]
})
export class PipesModule {}
