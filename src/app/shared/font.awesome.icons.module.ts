import { NgModule } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleDown, faUnlock,
  faAngleUp,
  faBars, faBook, faCaretDown, faCaretUp, faCheck,
  faCog, faEdit, faExclamationTriangle, faFilter, faLanguage, faLightbulb, faLock, faPaintBrush,
  faPlayCircle, faPlus,
  faPowerOff,
  faRocket, faSquare, faStream, faTasks, faTimes, faTrash,
  faUser,
  faUserCircle, faWindowMaximize
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class FontAwesomeIconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faBars as IconDefinition,
      faUserCircle as IconDefinition,
      faPowerOff as IconDefinition,
      faCog as IconDefinition,
      faRocket as IconDefinition,
      faPlayCircle as IconDefinition,
      faPlus as IconDefinition,
      faEdit as IconDefinition,
      faTrash as IconDefinition,
      faTimes as IconDefinition,
      faCaretUp as IconDefinition,
      faCaretDown as IconDefinition,
      faExclamationTriangle as IconDefinition,
      faFilter as IconDefinition,
      faTasks as IconDefinition,
      faCheck as IconDefinition,
      faSquare as IconDefinition,
      faLanguage as IconDefinition,
      faPaintBrush as IconDefinition,
      faLightbulb as IconDefinition,
      faWindowMaximize as IconDefinition,
      faStream as IconDefinition,
      faBook as IconDefinition,
      faAngleUp as IconDefinition,
      faAngleDown as IconDefinition,
      faTrash as IconDefinition,
      faLock as IconDefinition,
      faUnlock as IconDefinition
    )
  }
}
