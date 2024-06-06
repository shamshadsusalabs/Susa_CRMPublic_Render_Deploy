/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {registerLicense} from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';
registerLicense("Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVJ2WmFZfVpgdV9DZFZRRmY/P1ZhSXxXdkBiWH5ddXBUT2RcU0Q=");

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
