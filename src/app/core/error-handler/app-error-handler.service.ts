import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../notifications/notification.service';
import {GeneralService} from '../../services/generalService';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private notificationsService: NotificationService,
              private generalService: GeneralService) {
    super()
  }

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      this.notificationsService.error('Session Expired.');
      this.generalService.logOut();
    } else {
      this.notificationsService.error(error.message)
      super.handleError(error);
    }
  }
}
