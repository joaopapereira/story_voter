import { Component } from '@angular/core';
import { Config} from './shared/index';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
})

export class AppComponent {
  options: {}
  constructor() {
    console.log('Environment config', Config);

     this.options = {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    }
  }
}
