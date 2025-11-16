import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../notifications/notification.service';
import { GeneralService } from '../../services/general.service';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(
    private notificationsService: NotificationService,
    private generalService: GeneralService
  ) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      if (
        error.status === 401 ||
        (error.url.includes('auth/refresh-token') && error.status === 403)
      ) {
        this.notificationsService.error('Your session has Expired.');
        this.generalService.logOut();
      }
      this.notificationsService.error(error.statusText);
      super.handleError(error);
      return;
    }
    this.notificationsService.error(error.message);
    super.handleError(error);
  }
}
