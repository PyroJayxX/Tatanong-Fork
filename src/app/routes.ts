import { Routes } from '@angular/router';
import { LandingComponent } from './layout/content/landing/landing.component';
import { ConstructComponent } from './layout/content/construct/construct.component';
import { ViewComponent } from './layout/content/view/view.component';

const routeConfig: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'Home Page',
  },
  {
    path: 'construct',
    component: ConstructComponent,
    title: 'Flascard Construct',
  },
  {
    path: 'view',
    component: ViewComponent,
    title: 'View Flashcards',
  },
];

export default routeConfig;
