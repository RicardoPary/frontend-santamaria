import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material';

import { LoaderBarComponent } from './loader-bar.component';
import { LoaderBarService } from './loader-bar.service';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  declarations: [LoaderBarComponent],
  exports: [LoaderBarComponent],
  providers: [LoaderBarService]
})
export class LoaderBarModule {
}
