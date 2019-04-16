import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule, MatProgressBarModule} from '@angular/material';

import {LoaderBarComponent} from './loader-bar.component';
import {LoaderBarService} from './loader-bar.service';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatCardModule
  ],
  declarations: [LoaderBarComponent],
  exports: [LoaderBarComponent],
  providers: [LoaderBarService]
})
export class LoaderBarModule {
}
